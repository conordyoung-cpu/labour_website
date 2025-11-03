// Time clock module scaffolding
import { showMessage } from "./ui.js";
const { db, FB } = window.__services || {};

export function initTimeClock(){
  document.getElementById('clock-in-btn')?.addEventListener('click', ()=> {
    showMessage("Clock-in will write to Firestore once configured.");
  });
  document.getElementById('clock-out-btn')?.addEventListener('click', ()=> {
    showMessage("Clock-out will write to Firestore once configured.");
  });

  if (!db) return;
  const appId = window.__app_id || "labour-hire-app";
  // TODO: populate names/sites from Firestore collections
}