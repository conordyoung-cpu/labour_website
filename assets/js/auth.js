// auth.js
// Handles login, signup, logout, and which screen to show

import { showView, showMessage } from "./ui.js";

// Get Firebase stuff that was set up in index.html
const services = window.__services || {};
const auth = services.auth;
const FB = services.FB;
const db = services.db; // not used yet, but ready for later

export function initAuth() {
  // If Firebase auth is not ready, just give up (demo mode)
  if (!auth || !FB) {
    console.warn("Auth: Firebase auth is not available. Running in demo mode.");
    return;
  }

  // This runs every time the login state changes
  // (user logs in, logs out, signs up, etc.)
  FB.onAuthStateChanged(auth, async (user) => {
    try {
      if (user && !user.isAnonymous) {
        // Later we can look up their role in Firestore.
        // For now, any real user goes to the Admin Dashboard.
        document.getElementById("nav-title").textContent = "Admin Dashboard";
        document.getElementById("logout-btn")?.classList.remove("hidden");
        showView("admin-dashboard-view");
      } else {
        // No user or only anonymous user -> show kiosk screen
        document.getElementById("logout-btn")?.classList.add("hidden");
        showView("kiosk-view");
      }
    } catch (e) {
      console.error(e);
      showMessage("Auth error: " + e.message);
    }
  });

  // ----------- LOGIN (Sign In) -----------
  document
    .getElementById("login-submit-btn")
    ?.addEventListener("click", async () => {
      if (!auth) {
        showMessage("Demo mode: no real login.");
        return;
      }

      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;

      if (!email || !password) {
        showMessage("Please enter an email and password.");
        return;
      }

      try {
        await FB.signInWithEmailAndPassword(auth, email, password);
        // onAuthStateChanged will handle the screen change
      } catch (e) {
        showMessage("Login failed: " + e.message);
      }
    });

  // ----------- SIGN UP (Create account) -----------
  document
    .getElementById("signup-submit-btn")
    ?.addEventListener("click", async () => {
      if (!auth) {
        showMessage("Demo mode: no real signup.");
        return;
      }

      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;

      if (!email || !password) {
        showMessage("Please enter an email and password first.");
        return;
      }

      try {
        // This creates a new user in Firebase Auth
        await FB.createUserWithEmailAndPassword(auth, email, password);
        // User is now logged in as well
        showMessage("Account created. You are now signed in.");
        // onAuthStateChanged will move you to the admin dashboard
      } catch (e) {
        showMessage("Sign up failed: " + e.message);
      }
    });

  // ----------- LOGOUT -----------
  document.getElementById("logout-btn")?.addEventListener("click", async () => {
    if (!auth) {
      showView("kiosk-view");
      return;
    }
    await FB.signOut(auth);
    showView("kiosk-view");
  });

  // ----------- Anonymous sign-in (optional) -----------
  // This lets the kiosk UI work even before anyone logs in.
  (async () => {
    try {
      await FB.signInAnonymously(auth);
    } catch (e) {
      console.warn("Anonymous sign-in failed (demo mode is still okay):", e);
    }
  })();
}