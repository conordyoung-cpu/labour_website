// Main app entry: Firebase init + wiring modules
const FB = window.__fbImports;

// ---- Firebase config (placeholders or override via window.__firebase_config) ----
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const finalFirebaseConfig =
  firebaseConfig.apiKey === "YOUR_API_KEY"
    ? JSON.parse(window.__firebase_config || "{}")
    : firebaseConfig;

window.__app_id = window.__app_id || "labour-hire-app";

// ---- Init Firebase ----
let app, auth, db;
try {
  app  = FB.initializeApp(finalFirebaseConfig);
  auth = FB.getAuth(app);
  db   = FB.getFirestore(app);
} catch (e) {
  console.warn("Firebase init warning:", e);
}

// Make available to other modules
window.__services = { FB, app, auth, db };

// ---- Modules ----
import { initUI, wireGlobalNav, showMessage } from "./ui.js";
import { initAuth } from "./auth.js";
import { initEmployees } from "./employees.js";
import { initSites } from "./sites.js";
import { initTimeClock } from "./timeclock.js";

// Google Translate callback
window.googleTranslateElementInit = function () {
  // If you had special handling, move it here. Using default widget is fine.
};

// Boot sequence
initUI();
initAuth();
initEmployees();
initSites();
initTimeClock();

// Example: notify if running without Firebase config
if (!finalFirebaseConfig || !finalFirebaseConfig.apiKey) {
  showMessage("Site is running without Firebase configuration (demo mode). You can still browse the UI.");
}