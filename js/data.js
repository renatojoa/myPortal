const SUPABASE_URL = 'https://aldhmdbbxqvwyrsummav.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_6TDKNXp0HAe8_9Way8nu-A_2wk4-jjE';

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function fetchProjects() {
  const { data, error } = await db
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: false });
  if (error) throw error;
  return data;
}

async function fetchSkills() {
  const { data, error } = await db
    .from('skills')
    .select('*')
    .order('sort_order');
  if (error) throw error;
  return data;
}

async function fetchCompanies() {
  const { data, error } = await db
    .from('companies')
    .select('*')
    .order('sort_order', { ascending: false });
  if (error) throw error;
  return data;
}

function showSkeleton(containerId, rows = 3) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = Array.from({ length: rows }, () =>
    '<div class="skeleton mb-3" style="height:80px;"></div>'
  ).join('');
}

function showError(containerId, message) {
  const el = document.getElementById(containerId);
  if (el) el.innerHTML = '<p class="text-center text-muted">' + (message || 'Could not load content.') + '</p>';
}
