// Sites module scaffolding
import { showMessage } from "./ui.js";
const { db, FB } = window.__services || {};

export function initSites(){
  if (!db) return;
  const appId = window.__app_id || "labour-hire-app";
  const sitesCol = FB.collection(db, `artifacts/${appId}/public/data/sites`);

  // live render
  FB.onSnapshot(sitesCol, (snapshot) => {
    const list = document.getElementById('sites-list');
    if (!list) return;
    list.innerHTML = "";
    snapshot.forEach(doc => {
      const li = document.createElement('li');
      li.className = "mb-2 flex justify-between items-center";
      li.textContent = doc.data().name;
      list.appendChild(li);
    });
  });

  // add site
  document.getElementById('add-site-btn')?.addEventListener('click', async ()=> {
    if (!db){ showMessage("Demo mode: can't add site yet."); return; }
    const name = document.getElementById('new-site-name').value.trim();
    if (!name) return;
    try {
      await FB.addDoc(sitesCol, { name });
      document.getElementById('new-site-name').value = "";
    } catch (e) {
      showMessage("Could not add site: " + e.message);
    }
  });
}