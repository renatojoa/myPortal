function escStr(s) {
  if (s == null) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

const adminModal = new bootstrap.Modal(document.getElementById('adminModal'));
let currentTab = 'projects';
let editingId = null;

// ── Auth ───────────────────────────────────────────────
document.getElementById('login-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  var btn = document.getElementById('login-btn');
  var err = document.getElementById('login-error');
  btn.disabled = true;
  btn.textContent = 'Signing in…';
  err.classList.add('d-none');
  var res = await db.auth.signInWithPassword({
    email: document.getElementById('login-email').value,
    password: document.getElementById('login-password').value,
  });
  if (res.error) {
    err.textContent = res.error.message;
    err.classList.remove('d-none');
    btn.disabled = false;
    btn.textContent = 'Sign In';
  }
});

document.getElementById('logout-btn').addEventListener('click', function () {
  db.auth.signOut();
});

db.auth.onAuthStateChange(function (event, session) {
  if (session) {
    document.getElementById('login-screen').classList.add('d-none');
    document.getElementById('admin-app').classList.remove('d-none');
    loadTab(currentTab);
  } else {
    document.getElementById('login-screen').classList.remove('d-none');
    document.getElementById('admin-app').classList.add('d-none');
  }
});

// ── Tab navigation ─────────────────────────────────────
document.querySelectorAll('[data-tab]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelectorAll('[data-tab]').forEach(function (l) { l.classList.remove('active'); });
    e.currentTarget.classList.add('active');
    ['projects', 'skills', 'companies'].forEach(function (t) {
      document.getElementById('tab-' + t).classList.toggle('d-none', t !== e.currentTarget.dataset.tab);
    });
    currentTab = e.currentTarget.dataset.tab;
    loadTab(currentTab);
  });
});

function loadTab(tab) {
  if (tab === 'projects') loadProjects();
  else if (tab === 'skills') loadSkills();
  else if (tab === 'companies') loadCompanies();
}

function tabEl(tab) { return document.getElementById('tab-' + tab); }

function tableShell(tab, cols) {
  var colHeaders = cols.map(function (c) { return '<th>' + c + '</th>'; }).join('');
  return '<div class="d-flex justify-content-between align-items-center mb-3">' +
    '<h5 class="fw-bold mb-0" style="color:var(--text-primary)">' +
      tab.charAt(0).toUpperCase() + tab.slice(1) +
    '</h5>' +
    '<button class="btn btn-primary btn-sm" onclick="openAdd(\'' + tab + '\')">+ Add</button>' +
    '</div>' +
    '<div class="table-responsive">' +
    '<table class="table admin-table">' +
    '<thead><tr>' + colHeaders + '<th>Actions</th></tr></thead>' +
    '<tbody id="' + tab + '-tbody"></tbody>' +
    '</table></div>';
}

// ── PROJECTS ───────────────────────────────────────────
async function loadProjects() {
  var el = tabEl('projects');
  el.innerHTML = tableShell('projects', ['', 'Title', 'Category', 'Company', 'Available', 'Current']);
  var res = await db.from('projects').select('*').order('sort_order', { ascending: false });
  if (res.error) { el.innerHTML += '<p class="text-danger">' + res.error.message + '</p>'; return; }

  var rows = res.data;
  var tbody = document.getElementById('projects-tbody');
  var draggingId = null;

  function renderRows() {
    tbody.innerHTML = rows.map(function (p) {
      return '<tr draggable="true" data-id="' + p.id + '">' +
        '<td class="drag-handle" title="Drag to reorder">⠿</td>' +
        '<td><strong>' + escStr(p.title) + '</strong></td>' +
        '<td>' + escStr(p.category) + '</td>' +
        '<td>' + escStr(p.company) + '</td>' +
        '<td>' + (p.available ? '✓' : '✗') + '</td>' +
        '<td>' + (p.currently_working ? '🟢' : '') + '</td>' +
        '<td>' +
          '<button class="btn btn-sm btn-outline-primary me-1" onclick="openEditProject(' + p.id + ')">Edit</button>' +
          '<button class="btn btn-sm btn-outline-danger" onclick="deleteRow(\'projects\',' + p.id + ')">Del</button>' +
        '</td>' +
        '</tr>';
    }).join('');
  }

  tbody.addEventListener('dragstart', function (e) {
    var tr = e.target.closest('tr[data-id]');
    if (!tr) return;
    draggingId = tr.dataset.id;
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(function () { tr.classList.add('dragging'); }, 0);
  });

  tbody.addEventListener('dragend', function () {
    tbody.querySelectorAll('tr').forEach(function (r) {
      r.classList.remove('dragging', 'drag-over');
    });
    draggingId = null;
  });

  tbody.addEventListener('dragover', function (e) {
    e.preventDefault();
    var tr = e.target.closest('tr[data-id]');
    tbody.querySelectorAll('tr').forEach(function (r) { r.classList.remove('drag-over'); });
    if (tr && tr.dataset.id !== draggingId) tr.classList.add('drag-over');
  });

  tbody.addEventListener('dragleave', function (e) {
    if (!tbody.contains(e.relatedTarget)) {
      tbody.querySelectorAll('tr').forEach(function (r) { r.classList.remove('drag-over'); });
    }
  });

  tbody.addEventListener('drop', async function (e) {
    e.preventDefault();
    tbody.querySelectorAll('tr').forEach(function (r) { r.classList.remove('drag-over', 'dragging'); });
    var targetTr = e.target.closest('tr[data-id]');
    if (!targetTr || !draggingId || targetTr.dataset.id === draggingId) return;

    var fromIdx = rows.findIndex(function (p) { return String(p.id) === draggingId; });
    var toIdx   = rows.findIndex(function (p) { return String(p.id) === targetTr.dataset.id; });
    if (fromIdx === -1 || toIdx === -1) return;

    rows.splice(toIdx, 0, rows.splice(fromIdx, 1)[0]);
    var total = rows.length;
    rows.forEach(function (p, i) { p.sort_order = (total - i) * 10; });

    renderRows();

    var errors = (await Promise.all(
      rows.map(function (p) {
        return db.from('projects').update({ sort_order: p.sort_order }).eq('id', p.id);
      })
    )).filter(function (r) { return r.error; });

    if (errors.length) alert('Error saving order: ' + errors[0].error.message);
  });

  renderRows();
}

function projectForm(p) {
  p = p || {};
  var cats = ['Mobile', 'Web', 'API', 'Backend', 'Windows'];
  var catOptions = cats.map(function (c) {
    return '<option' + (p.category === c ? ' selected' : '') + '>' + c + '</option>';
  }).join('');
  return '<div class="row g-3">' +
    '<div class="col-md-6"><label class="form-label small fw-bold">Title *</label>' +
      '<input type="text" class="form-control form-control-sm" name="title" value="' + (p.title || '') + '" required></div>' +
    '<div class="col-md-6"><label class="form-label small fw-bold">Company</label>' +
      '<input type="text" class="form-control form-control-sm" name="company" value="' + (p.company || '') + '"></div>' +
    '<div class="col-12"><label class="form-label small fw-bold">Description</label>' +
      '<textarea class="form-control form-control-sm" name="description" rows="2">' + (p.description || '') + '</textarea></div>' +
    '<div class="col-md-6"><label class="form-label small fw-bold">Category</label>' +
      '<select class="form-select form-select-sm" name="category">' + catOptions + '</select></div>' +
    '<div class="col-md-6"><label class="form-label small fw-bold">Technologies (comma-separated)</label>' +
      '<input type="text" class="form-control form-control-sm" name="technologies" value="' + ((p.technologies || []).join(', ')) + '"></div>' +
    '<div class="col-12"><label class="form-label small fw-bold">Image URL</label>' +
      '<input type="text" class="form-control form-control-sm" name="image_url" value="' + (p.image_url || '') + '"></div>' +
    '<div class="col-md-4"><label class="form-label small fw-bold">Apple Store URL</label>' +
      '<input type="text" class="form-control form-control-sm" name="apple_url" value="' + (p.apple_url || '') + '"></div>' +
    '<div class="col-md-4"><label class="form-label small fw-bold">Play Store URL</label>' +
      '<input type="text" class="form-control form-control-sm" name="android_url" value="' + (p.android_url || '') + '"></div>' +
    '<div class="col-md-4"><label class="form-label small fw-bold">Web URL</label>' +
      '<input type="text" class="form-control form-control-sm" name="web_url" value="' + (p.web_url || '') + '"></div>' +
    '<div class="col-md-4"><label class="form-label small fw-bold">Sort Order</label>' +
      '<input type="number" class="form-control form-control-sm" name="sort_order" value="' + (p.sort_order || 0) + '"></div>' +
    '<div class="col-md-8 d-flex align-items-end gap-4 pb-1">' +
      '<div class="form-check">' +
        '<input class="form-check-input" type="checkbox" name="available" id="chk-avail"' + (p.available !== false ? ' checked' : '') + '>' +
        '<label class="form-check-label small" for="chk-avail">Available</label>' +
      '</div>' +
      '<div class="form-check">' +
        '<input class="form-check-input" type="checkbox" name="currently_working" id="chk-curr"' + (p.currently_working ? ' checked' : '') + '>' +
        '<label class="form-check-label small" for="chk-curr">Currently Working</label>' +
      '</div>' +
    '</div>' +
    '</div>';
}

function openAdd(tab) {
  editingId = null;
  document.getElementById('adminModalTitle').textContent = 'Add';
  if (tab === 'projects') document.getElementById('adminModalBody').innerHTML = projectForm();
  else if (tab === 'skills') document.getElementById('adminModalBody').innerHTML = skillForm();
  else document.getElementById('adminModalBody').innerHTML = companyForm();
  document.getElementById('adminModalSave').onclick = function () { saveForm(tab); };
  adminModal.show();
}

async function openEditProject(id) {
  var res = await db.from('projects').select('*').eq('id', id).single();
  if (res.error) { alert(res.error.message); return; }
  editingId = id;
  document.getElementById('adminModalTitle').textContent = 'Edit Project';
  document.getElementById('adminModalBody').innerHTML = projectForm(res.data);
  document.getElementById('adminModalSave').onclick = function () { saveForm('projects'); };
  adminModal.show();
}

async function saveForm(tab) {
  var body = document.getElementById('adminModalBody');
  function get(name) { return body.querySelector('[name="' + name + '"]'); }
  var record, table;

  if (tab === 'projects') {
    table = 'projects';
    record = {
      title: get('title').value.trim(),
      description: get('description').value.trim() || null,
      company: get('company').value.trim() || null,
      category: get('category').value,
      technologies: get('technologies').value.split(',').map(function (s) { return s.trim(); }).filter(Boolean),
      image_url: get('image_url').value.trim() || null,
      apple_url: get('apple_url').value.trim() || null,
      android_url: get('android_url').value.trim() || null,
      web_url: get('web_url').value.trim() || null,
      sort_order: parseInt(get('sort_order').value) || 0,
      available: get('available').checked,
      currently_working: get('currently_working').checked,
    };
  } else if (tab === 'skills') {
    table = 'skills';
    record = {
      name: get('name').value.trim(),
      category: get('category_text').value.trim(),
      icon_url: get('icon_url').value.trim() || null,
      sort_order: parseInt(get('sort_order').value) || 0,
    };
  } else {
    table = 'companies';
    record = {
      name: get('name').value.trim(),
      position: get('position').value.trim() || null,
      period_start: get('period_start').value.trim() || null,
      period_end: get('period_end').value.trim() || null,
      logo_url: get('logo_url').value.trim() || null,
      description: get('description').value.trim() || null,
      sort_order: parseInt(get('sort_order').value) || 0,
      current: get('current').checked,
      hidden: get('hidden').checked,
      wiki_title: get('wiki_title').value.trim() || null,
    };
  }

  var res = editingId
    ? await db.from(table).update(record).eq('id', editingId)
    : await db.from(table).insert(record);

  if (res.error) { alert(res.error.message); return; }
  adminModal.hide();
  loadTab(tab);
}

async function deleteRow(table, id) {
  if (!confirm('Delete this record?')) return;
  var res = await db.from(table).delete().eq('id', id);
  if (res.error) { alert(res.error.message); return; }
  loadTab(currentTab);
}

// ── SKILLS ─────────────────────────────────────────────
async function loadSkills() {
  var el = tabEl('skills');
  el.innerHTML = tableShell('skills', ['Name', 'Category', 'Icon URL', 'Order']);
  var res = await db.from('skills').select('*').order('category').order('sort_order');
  if (res.error) { el.innerHTML += '<p class="text-danger">' + res.error.message + '</p>'; return; }
  document.getElementById('skills-tbody').innerHTML = res.data.map(function (s) {
    return '<tr>' +
      '<td>' +
        '<img src="' + escStr(s.icon_url) + '" style="width:24px;height:24px;object-fit:contain;margin-right:8px" onerror="this.style.display=\'none\'">' +
        escStr(s.name) +
      '</td>' +
      '<td>' + escStr(s.category) + '</td>' +
      '<td class="text-muted small">' + escStr(s.icon_url) + '</td>' +
      '<td>' + (s.sort_order || 0) + '</td>' +
      '<td>' +
        '<button class="btn btn-sm btn-outline-primary me-1" onclick="openEditSkill(' + s.id + ')">Edit</button>' +
        '<button class="btn btn-sm btn-outline-danger" onclick="deleteRow(\'skills\',' + s.id + ')">Del</button>' +
      '</td>' +
      '</tr>';
  }).join('');
}

function skillForm(s) {
  s = s || {};
  return '<div class="row g-3">' +
    '<div class="col-md-6"><label class="form-label small fw-bold">Name *</label>' +
      '<input type="text" class="form-control form-control-sm" name="name" value="' + (s.name || '') + '" required></div>' +
    '<div class="col-md-6"><label class="form-label small fw-bold">Category *</label>' +
      '<input type="text" class="form-control form-control-sm" name="category_text" value="' + (s.category || '') + '" list="skill-cats" required>' +
      '<datalist id="skill-cats">' +
        '<option value="Languages"><option value="API Testing"><option value="Test Platforms"><option value="IDEs">' +
      '</datalist></div>' +
    '<div class="col-12"><label class="form-label small fw-bold">Icon URL</label>' +
      '<input type="text" class="form-control form-control-sm" name="icon_url" value="' + (s.icon_url || '') + '"></div>' +
    '<div class="col-md-4"><label class="form-label small fw-bold">Sort Order</label>' +
      '<input type="number" class="form-control form-control-sm" name="sort_order" value="' + (s.sort_order || 0) + '"></div>' +
    '</div>';
}

async function openEditSkill(id) {
  var res = await db.from('skills').select('*').eq('id', id).single();
  if (res.error) { alert(res.error.message); return; }
  editingId = id;
  document.getElementById('adminModalTitle').textContent = 'Edit Skill';
  document.getElementById('adminModalBody').innerHTML = skillForm(res.data);
  document.getElementById('adminModalSave').onclick = function () { saveForm('skills'); };
  adminModal.show();
}

// ── COMPANIES ──────────────────────────────────────────
async function loadCompanies() {
  var el = tabEl('companies');
  el.innerHTML = tableShell('companies', ['Name', 'Position', 'Period', 'Current', 'Hidden']);
  var res = await db.from('companies').select('*').order('sort_order', { ascending: false });
  if (res.error) { el.innerHTML += '<p class="text-danger">' + res.error.message + '</p>'; return; }
  document.getElementById('companies-tbody').innerHTML = res.data.map(function (c) {
    return '<tr>' +
      '<td>' +
        '<img src="' + escStr(c.logo_url) + '" style="width:28px;height:28px;object-fit:contain;margin-right:8px" onerror="this.style.display=\'none\'">' +
        '<strong>' + escStr(c.name) + '</strong>' +
      '</td>' +
      '<td>' + escStr(c.position) + '</td>' +
      '<td class="text-muted small">' + escStr(c.period_start) + ' – ' + escStr(c.period_end) + '</td>' +
      '<td>' + (c.current ? '🟢' : '') + '</td>' +
      '<td>' + (c.hidden ? '👁' : '') + '</td>' +
      '<td>' +
        '<button class="btn btn-sm btn-outline-primary me-1" onclick="openEditCompany(' + c.id + ')">Edit</button>' +
        '<button class="btn btn-sm btn-outline-danger" onclick="deleteRow(\'companies\',' + c.id + ')">Del</button>' +
      '</td>' +
      '</tr>';
  }).join('');
}

function companyForm(c) {
  c = c || {};
  return '<div class="row g-3">' +
    '<div class="col-md-6"><label class="form-label small fw-bold">Name *</label>' +
      '<input type="text" class="form-control form-control-sm" name="name" value="' + (c.name || '') + '" required></div>' +
    '<div class="col-md-6"><label class="form-label small fw-bold">Position</label>' +
      '<input type="text" class="form-control form-control-sm" name="position" value="' + (c.position || '') + '"></div>' +
    '<div class="col-md-4"><label class="form-label small fw-bold">Period Start</label>' +
      '<input type="text" class="form-control form-control-sm" name="period_start" value="' + (c.period_start || '') + '" placeholder="Jan 2020"></div>' +
    '<div class="col-md-4"><label class="form-label small fw-bold">Period End</label>' +
      '<input type="text" class="form-control form-control-sm" name="period_end" value="' + (c.period_end || '') + '" placeholder="Dec 2022 or Present"></div>' +
    '<div class="col-md-4"><label class="form-label small fw-bold">Sort Order</label>' +
      '<input type="number" class="form-control form-control-sm" name="sort_order" value="' + (c.sort_order || 0) + '"></div>' +
    '<div class="col-12"><label class="form-label small fw-bold">Logo URL</label>' +
      '<input type="text" class="form-control form-control-sm" name="logo_url" value="' + (c.logo_url || '') + '"></div>' +
    '<div class="col-12"><label class="form-label small fw-bold">Description</label>' +
      '<textarea class="form-control form-control-sm" name="description" rows="2">' + (c.description || '') + '</textarea></div>' +
    '<div class="col-12"><label class="form-label small fw-bold">Wikipedia Title <span class="text-muted fw-normal">(exact page title, blank = skip Wikipedia)</span></label>' +
      '<input type="text" class="form-control form-control-sm" name="wiki_title" value="' + (c.wiki_title || '') + '" placeholder="e.g. Accenture, Liferay"></div>' +
    '<div class="col-12 d-flex gap-4">' +
      '<div class="form-check">' +
        '<input class="form-check-input" type="checkbox" name="current" id="chk-cur"' + (c.current ? ' checked' : '') + '>' +
        '<label class="form-check-label small" for="chk-cur">Current employer</label>' +
      '</div>' +
      '<div class="form-check">' +
        '<input class="form-check-input" type="checkbox" name="hidden" id="chk-hid"' + (c.hidden ? ' checked' : '') + '>' +
        '<label class="form-check-label small" for="chk-hid">Hidden (expand-only)</label>' +
      '</div>' +
    '</div>' +
    '</div>';
}

async function openEditCompany(id) {
  var res = await db.from('companies').select('*').eq('id', id).single();
  if (res.error) { alert(res.error.message); return; }
  editingId = id;
  document.getElementById('adminModalTitle').textContent = 'Edit Company';
  document.getElementById('adminModalBody').innerHTML = companyForm(res.data);
  document.getElementById('adminModalSave').onclick = function () { saveForm('companies'); };
  adminModal.show();
}
