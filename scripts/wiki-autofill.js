#!/usr/bin/env node
// Requires Node 18+ (built-in fetch). Run: node scripts/wiki-autofill.js
// Fetches all companies from Supabase, tries Wikipedia by name for those
// without wiki_title, and sets wiki_title to the matched canonical title.
// Companies where Wikipedia returns nothing (or disambiguation) → left null.

const SUPABASE_URL = 'https://aldhmdbbxqvwyrsummav.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_6TDKNXp0HAe8_9Way8nu-A_2wk4-jjE';

const headers = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation',
};

async function getCompanies() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/companies?select=id,name,wiki_title&order=sort_order.asc`, { headers });
  if (!res.ok) throw new Error(`Supabase fetch failed: ${res.status} ${await res.text()}`);
  return res.json();
}

async function updateCompany(id, wiki_title) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/companies?id=eq.${id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ wiki_title }),
  });
  if (!res.ok) throw new Error(`Update failed for id=${id}: ${res.status} ${await res.text()}`);
}

async function lookupWiki(name) {
  const encoded = encodeURIComponent(name);
  try {
    const r = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encoded}`);
    if (r.ok) {
      const d = await r.json();
      if (d.type !== 'disambiguation' && d.extract) return d.title;
    }
  } catch (_) {}
  try {
    const s = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(name + ' company')}&format=json&origin=*&srlimit=1&srprop=snippet`
    );
    const sd = await s.json();
    if (sd.query.search.length) {
      const r2 = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(sd.query.search[0].title)}`
      );
      if (r2.ok) {
        const d2 = await r2.json();
        if (d2.type !== 'disambiguation' && d2.extract) return d2.title;
      }
    }
  } catch (_) {}
  return null;
}

async function main() {
  const companies = await getCompanies();
  const pending = companies.filter(c => !c.wiki_title);

  console.log(`Companies total: ${companies.length} | pending (no wiki_title): ${pending.length}\n`);

  if (!pending.length) {
    console.log('All companies already have wiki_title set. Nothing to do.');
    return;
  }

  const found = [];
  const notFound = [];

  for (const c of pending) {
    process.stdout.write(`  Searching: "${c.name}" ... `);
    const title = await lookupWiki(c.name);
    if (title) {
      await updateCompany(c.id, title);
      console.log(`✓  "${title}"`);
      found.push({ id: c.id, name: c.name, wiki_title: title });
    } else {
      console.log('✗  not found — left null');
      notFound.push(c.name);
    }
    // Respect Wikipedia rate limit
    await new Promise(r => setTimeout(r, 300));
  }

  console.log(`\n--- Summary ---`);
  console.log(`Set:       ${found.length}`);
  console.log(`Left null: ${notFound.length}${notFound.length ? ' → ' + notFound.join(', ') : ''}`);
  console.log('\nReview the "Set" entries in the admin panel and clear any wrong matches.');
}

main().catch(e => { console.error(e); process.exit(1); });
