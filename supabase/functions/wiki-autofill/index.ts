import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const db = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function lookupWiki(name: string): Promise<string | null> {
  const encoded = encodeURIComponent(name);

  // Direct lookup first
  try {
    const r = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encoded}`, {
      headers: { 'User-Agent': 'renatojoa-portfolio/1.0' },
    });
    if (r.ok) {
      const d = await r.json();
      if (d.type !== 'disambiguation' && d.extract) return d.title as string;
    }
  } catch (_) { /* ignore */ }

  // Search fallback
  try {
    const s = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(name + ' company')}&format=json&origin=*&srlimit=1&srprop=snippet`
    );
    const sd = await s.json();
    if (sd.query?.search?.length) {
      const r2 = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(sd.query.search[0].title)}`,
        { headers: { 'User-Agent': 'renatojoa-portfolio/1.0' } }
      );
      if (r2.ok) {
        const d2 = await r2.json();
        if (d2.type !== 'disambiguation' && d2.extract) return d2.title as string;
      }
    }
  } catch (_) { /* ignore */ }

  return null;
}

Deno.serve(async (req) => {
  // Allow only POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'POST only' }), { status: 405 });
  }

  // Optional: pass { "dry_run": true } to preview without writing
  let dryRun = false;
  try {
    const body = await req.json();
    dryRun = !!body.dry_run;
  } catch (_) { /* no body = normal run */ }

  // Fetch companies missing wiki_title
  const { data: companies, error } = await db
    .from('companies')
    .select('id, name, wiki_title')
    .is('wiki_title', null)
    .order('sort_order', { ascending: true });

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  const found: { id: number; name: string; wiki_title: string }[] = [];
  const notFound: string[] = [];

  for (const c of companies ?? []) {
    const title = await lookupWiki(c.name);
    if (title) {
      if (!dryRun) {
        await db.from('companies').update({ wiki_title: title }).eq('id', c.id);
      }
      found.push({ id: c.id, name: c.name, wiki_title: title });
    } else {
      notFound.push(c.name);
    }
    // Respect Wikipedia rate limit
    await new Promise(r => setTimeout(r, 300));
  }

  return new Response(
    JSON.stringify({ dry_run: dryRun, found, not_found: notFound }, null, 2),
    { headers: { 'Content-Type': 'application/json' } }
  );
});
