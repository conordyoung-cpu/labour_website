// auth.js
// Handles login, signup, logout, and auth-based routing

import { showView, showMessage } from "./ui.js";

// Firebase services
const { auth, db, FB } = window.__services || {};

const {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  doc,
  setDoc,
  getDoc
} = FB || {};

// ===============================
// INIT AUTH
// ===============================
export function initAuth() {
  if (!auth || !FB) {
    console.warn("Auth not available");
    return;
  }

  // -------- LOGIN --------
  document.getElementById("login-submit-btn")?.addEventListener("click", async () => {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    if (!email || !password) {
      showMessage("Please enter email and password");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      showMessage(err.message);
    }
  });

  // -------- SIGN UP --------
  document.getElementById("signup-submit-btn")?.addEventListener("click", async () => {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    if (!email || !password) {
      showMessage("Please enter email and password");
      return;
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", cred.user.uid), {
        email,
        role: "worker",
        createdAt: new Date()
      });

    } catch (err) {
      showMessage(err.message);
    }
  });

  // -------- LOGOUT --------
  document.getElementById("logout-btn")?.addEventListener("click", async () => {
    await signOut(auth);
    showView("kiosk-view");
  });

  // -------- AUTH STATE --------
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      showView("kiosk-view");
      return;
    }

    // TEMP: everyone goes to worker dashboard
    showView("worker-dashboard-view");
  });
}