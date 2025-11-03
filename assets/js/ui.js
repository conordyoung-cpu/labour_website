// UI helpers and global navigation
export function showView(viewId) {
  const views = [
    'login-view','admin-dashboard-view','supervisor-dashboard-view',
    'kiosk-view','time-clock-screen'
  ];
  views.forEach(id => document.getElementById(id)?.classList.add('hidden'));
  document.getElementById(viewId)?.classList.remove('hidden');

  const mainNav = document.getElementById('main-nav');
  if (['admin-dashboard-view', 'supervisor-dashboard-view'].includes(viewId)) {
    mainNav?.classList.remove('hidden');
  } else {
    mainNav?.classList.add('hidden');
  }
}

export function showModal(id){ document.getElementById(id)?.classList.add('show'); }
export function hideModal(id){ document.getElementById(id)?.classList.remove('show'); }
export function showMessage(message){
  const el = document.getElementById('message-text');
  if (el) el.textContent = message;
  showModal('message-modal');
}

export function initUI(){
  // Message modal close
  document.getElementById('close-message-modal-btn')?.addEventListener('click', ()=> hideModal('message-modal'));

  // Kiosk buttons
  document.getElementById('induction-btn')?.addEventListener('click', ()=> {
    // In your full app this goes to pre-induction flow
    showMessage("Induction flow will be wired after Firebase setup.");
  });
  document.getElementById('time-clock-btn')?.addEventListener('click', ()=> showView('time-clock-screen'));

  // Login routes
  document.getElementById('kiosk-admin-login-btn')?.addEventListener('click', ()=> {
    document.getElementById('login-title').textContent = "Admin Login";
    document.getElementById('login-role').value = "Admin";
    showView('login-view');
  });
  document.getElementById('site-login-btn')?.addEventListener('click', ()=> {
    document.getElementById('login-title').textContent = "Site Supervisor Login";
    document.getElementById('login-role').value = "Site Supervisor";
    showView('login-view');
  });
  document.getElementById('back-to-kiosk-from-login-btn')?.addEventListener('click', ()=> showView('kiosk-view'));
  document.getElementById('back-to-kiosk-from-clock-btn')?.addEventListener('click', ()=> showView('kiosk-view'));

  // Admin nav
  document.querySelectorAll('.admin-nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetId = e.currentTarget.getAttribute('data-target');
      document.querySelectorAll('.admin-section').forEach(s => s.classList.add('hidden'));
      document.getElementById(targetId)?.classList.remove('hidden');
    });
  });
}

export function wireGlobalNav(){
  // placeholder; wire role-based nav here if needed
}