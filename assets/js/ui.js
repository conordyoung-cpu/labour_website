// ===============================
// UI helpers and navigation
// ===============================

// Show ONE view and hide all others
export function showView(viewId) {
  // All possible screens in the app
  const views = [
    'login-view',
    'admin-dashboard-view',
    'supervisor-dashboard-view',
    'kiosk-view',
    'time-clock-screen'
  ];

  // Hide every screen
  views.forEach(id =>
    document.getElementById(id)?.classList.add('hidden')
  );

  // Show the requested screen
  document.getElementById(viewId)?.classList.remove('hidden');

  // Show top navigation ONLY on admin dashboard
  const mainNav = document.getElementById('main-nav');
  if (viewId === 'admin-dashboard-view') {
    mainNav?.classList.remove('hidden');
  } else {
    mainNav?.classList.add('hidden');
  }
}

// Show a modal (popup)
export function showModal(id) {
  document.getElementById(id)?.classList.add('show');
}

// Hide a modal (popup)
export function hideModal(id) {
  document.getElementById(id)?.classList.remove('show');
}

// Show a message in the modal popup
export function showMessage(message) {
  const el = document.getElementById('message-text');
  if (el) el.textContent = message;
  showModal('message-modal');
}

// ===============================
// Wire up all UI buttons
// ===============================
export function initUI() {

  // Close message popup
  document
    .getElementById('close-message-modal-btn')
    ?.addEventListener('click', () => hideModal('message-modal'));

  // -------- Kiosk buttons --------

  // Induction button (not wired yet)
  document.getElementById('induction-btn')?.addEventListener('click', () => {
    showMessage("Induction flow will be wired after Firebase setup.");
  });

  // Go to time clock screen
  document
    .getElementById('time-clock-btn')
    ?.addEventListener('click', () => showView('time-clock-screen'));

  // Go to login screen (SINGLE login button)
  document
    .getElementById('login-btn')
    ?.addEventListener('click', () => showView('login-view'));

  // -------- Back buttons --------

  // Back from login to kiosk
  document
    .getElementById('back-to-kiosk-from-login-btn')
    ?.addEventListener('click', () => showView('kiosk-view'));

  // Back from time clock to kiosk
  document
    .getElementById('back-to-kiosk-from-clock-btn')
    ?.addEventListener('click', () => showView('kiosk-view'));

  // -------- Admin dashboard tabs --------

  // Switch between admin sections (Employees / Sites / Timesheets)
  document.querySelectorAll('.admin-nav-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const targetId = e.currentTarget.getAttribute('data-target');

      // Hide all admin sections
      document
        .querySelectorAll('.admin-section')
        .forEach(s => s.classList.add('hidden'));

      // Show selected section
      document.getElementById(targetId)?.classList.remove('hidden');
    });
  });
}

// Placeholder for future role-based navigation
export function wireGlobalNav() {
  // We'll use this later when roles are added
}