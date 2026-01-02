import { showView, showMessage } from "./ui.js";

const { auth, db, FB } = window.__services;

const {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  doc,
  setDoc,
  getDoc
} = FB;

// ===============================
// LOGIN
// ===============================
const loginBtn = document.getElementById("login-submit-btn");

loginBtn?.addEventListener("click", async () => {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  if (!email || !password) {
    showMessage("Please enter email and password");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    // onAuthStateChanged will handle routing
  } catch (err) {
    showMessage(err.message);
  }
});

// ===============================
// SIGN UP
// ===============================
const signupBtn = document.getElementById("signup-submit-btn");

signupBtn?.addEventListener("click", async () => {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  if (!email || !password) {
    showMessage("Please enter email and password");
    return;
  }

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    // Create Firestore user profile
    await setDoc(doc(db, "users", cred.user.uid), {
      email,
      role: "worker", // default role
      createdAt: new Date()
    });

  } catch (err) {
    showMessage(err.message);
  }
});

// ===============================
// LOGOUT
// ===============================
document.getElementById("logout-btn")?.addEventListener("click", async () => {
  await signOut(auth);
  showView("kiosk-view");
});

// ===============================
// AUTH STATE HANDLER
// ===============================
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    showView("kiosk-view");
    return;
  }

  // Try to get user profile from Firestore
  const snap = await getDoc(doc(db, "users", user.uid));

  // TEMP: route everyone to worker dashboard for now
  // (we will split admin vs worker next)
  showView("worker-dashboard-view");
});