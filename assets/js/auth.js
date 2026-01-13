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
      // Firebase verifies the email/password automatically
      await signInWithEmailAndPassword(auth, email, password);
      // Success will trigger onAuthStateChanged below
    } catch (err) {
      showMessage("Login Failed: " + err.message);
    }
  });

  // -------- FINISH SIGN UP (New Flow) --------
  document.getElementById("finish-signup-btn")?.addEventListener("click", async () => {
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;

    if (!name || !email || !password) {
      showMessage("Please fill in all fields (Name, Email, and Password)");
      return;
    }

    try {
      // 1. Create the Auth account
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      // 2. Create the User Profile in Firestore
      // We use the Auth UID as the document ID so it's easy to find later
      await setDoc(doc(db, "users", cred.user.uid), {
        uid: cred.user.uid,
        name: name,
        email: email,
        role: "worker", // Automatically set to worker
        createdAt: new Date()
      });

      // 3. Navigate straight to worker page
      showView("worker-dashboard-view");
      showMessage(`Welcome to the team, ${name}!`);

    } catch (err) {
      showMessage("Signup Error: " + err.message);
    }
  });

  // -------- LOGOUT --------
  document.getElementById("logout-btn")?.addEventListener("click", async () => {
    try {
      await signOut(auth);
      showView("kiosk-view");
    } catch (err) {
      showMessage("Error logging out");
    }
  });

  // -------- AUTH STATE LISTENER --------
  // This runs automatically whenever someone logs in or out
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      showView("kiosk-view");
      return;
    }

    try {
      // Check the database for this user's role
      const userDoc = await getDoc(doc(db, "users", user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role === "admin") {
          showView("admin-dashboard-view");
        } else {
          showView("worker-dashboard-view");
        }
      } else {
        // Fallback if user exists in Auth but not in Database
        showView("worker-dashboard-view");
      }
    } catch (err) {
      console.error("Error fetching user role:", err);
      showView("worker-dashboard-view");
    }
  });
}