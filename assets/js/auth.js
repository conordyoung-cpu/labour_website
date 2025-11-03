// Authentication flow (simplified scaffolding)
import { showView, showMessage } from "./ui.js";
const { auth, FB, db } = window.__services || {};

export function initAuth(){
  if(!auth) return; // running in demo without Firebase
  FB.onAuthStateChanged(auth, async (user) => {
    try {
      if (user && !user.isAnonymous) {
        // TODO: fetch role & assigned site from Firestore users doc (artifacts/{appId}/users/{uid})
        // For now, just go to admin dashboard
        document.getElementById('nav-title').textContent = "Admin Dashboard";
        document.getElementById('logout-btn')?.classList.remove('hidden');
        showView('admin-dashboard-view');
      } else {
        document.getElementById('logout-btn')?.classList.add('hidden');
        showView('kiosk-view');
      }
    } catch (e) {
      console.error(e);
      showMessage("Auth error: " + e.message);
    }
  });

  // Login submit
  document.getElementById('login-submit-btn')?.addEventListener('click', async ()=> {
    if(!auth){ showMessage("Demo mode: no real login."); return; }
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    try {
      await FB.signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      showMessage("Login failed: " + e.message);
    }
  });

  document.getElementById('logout-btn')?.addEventListener('click', async ()=> {
    if(!auth){ showView('kiosk-view'); return; }
    await FB.signOut(auth);
    showView('kiosk-view');
  });

  // Anonymous init (optional)
  (async ()=>{
    try {
      // sign in anonymously so read-only UI still works
      await FB.signInAnonymously(auth);
    } catch (e) {
      console.warn("Anonymous sign-in failed (demo mode is okay):", e);
    }
  })();
}