// ===============================
// UI helpers and navigation
// ===============================

// Show ONE view and hide all others
export function showView(viewId) {
  // All possible screens in the app
  const views = [
    'login-view',
    'signup-view',            // Added
    'admin-dashboard-view',
    'worker-dashboard-view',   // Added
    'kiosk-view',
    'time-clock-screen'
  ];

  // Hide every screen
  views.forEach(id =>
    document.getElementById(id)?.classList.add('hidden')
  );

  // Show the requested screen
  const targetView = document.getElementById(viewId);
  if (targetView) {
    targetView.classList.remove('hidden');
  } else {
    console.error("View not found:", viewId);
  }

  // Handle Main Nav visibility
  // Show top navigation on Admin OR Worker dashboards
  const mainNav = document.getElementById('main-nav');
  if (viewId === 'admin-dashboard-view' || viewId === 'worker-dashboard-view') {
    mainNav?.classList.remove('hidden');
    // Show logout button specifically when logged in
    document.getElementById('logout-btn')?.classList.remove('hidden');
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

  // Induction button
  document.getElementById('induction-btn')?.addEventListener('click', () => {
    showMessage("Induction flow will be wired soon.");
  });

  // Go to time clock screen
  document
    .getElementById('time-clock-btn')
    ?.addEventListener('click', () => showView('time-clock-screen'));

  // Go to login screen
  document
    .getElementById('login-btn')
    ?.addEventListener('click', () => showView('login-view'));

  // NEW: Go to signup screen from login page
  // (Assuming you add a 'go-to-signup' button in your login HTML)
  document
    .getElementById('go-to-signup-btn')
    ?.addEventListener('click', () => showView('signup-view'));

  // -------- Back buttons --------

  document
    .getElementById('back-to-kiosk-from-login-btn')
    ?.addEventListener('click', () => showView('kiosk-view'));

  document
    .getElementById('back-to-kiosk-from-clock-btn')
    ?.addEventListener('click', () => showView('kiosk-view'));
    
  // Back from signup to login
  document
    .getElementById('back-to-login-btn')
    ?.addEventListener('click', () => showView('login-view'));

  // -------- Admin dashboard tabs --------

  document.querySelectorAll('.admin-nav-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const targetId = e.currentTarget.getAttribute('data-target');
      document.querySelectorAll('.admin-section').forEach(s => s.classList.add('hidden'));
      document.getElementById(targetId)?.classList.remove('hidden');
    });
  });

  // -------- Worker dashboard tabs (NEW) --------

  document.querySelectorAll('.worker-nav-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const targetId = e.currentTarget.getAttribute('data-target');
      
      // Hide all worker sections
      document.querySelectorAll('.worker-section').forEach(s => s.classList.add('hidden'));
      
      // Show selected section
      document.getElementById(targetId)?.classList.remove('hidden');
      
      // Optional: Add "active" styling to the clicked button
      document.querySelectorAll('.worker-nav-btn').forEach(b => b.classList.remove('border-b-4', 'border-white'));
      btn.classList.add('border-b-4', 'border-white');
    });
  });
}