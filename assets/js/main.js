
// Get shared stuff that was set up in the HTML file
// (auth, db, and all Firebase helper functions)
const services = window.__services || {};
const FB = services.FB;    // all Firebase functions (getAuth, getFirestore, etc.)
const app = services.app;  // the Firebase app
const auth = services.auth; // authentication service
const db = services.db;    // database service (Firestore)

// Bring in the setup functions from your other files
import { initUI, showMessage } from "./ui.js";
import { initAuth } from "./auth.js";
import { initEmployees } from "./employees.js";
import { initSites } from "./sites.js";
import { initTimeClock } from "./timeclock.js";

// This is the function Google Translate looks for
// Right now we don't need to do anything special here
window.googleTranslateElementInit = function () {
  // Leave empty unless you want custom behaviour
};

// Start the different parts of the app
// Each function wires up its own section of the page
initUI();         // build and prepare the main screen
initAuth();       // set up login / logout buttons and listeners
initEmployees();  // set up employee list and forms
initSites();      // set up work sites list and forms
initTimeClock();  // set up the time clock feature

// If Firebase is not set up properly, tell the user
if (!auth || !db) {
  // Very simple message so you know why things might not save
  showMessage("Firebase is not fully set up. The page may not save or load data.");
}