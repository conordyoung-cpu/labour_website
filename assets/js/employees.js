// Employees module scaffolding
import { showMessage } from "./ui.js";
const { db, FB } = window.__services || {};

export function initEmployees(){
  // Wire add employee button (demo)
  document.getElementById('add-employee-btn')?.addEventListener('click', ()=> {
    showMessage("Employee modal will be wired to Firestore in the next step.");
  });

  // Live list (requires Firestore)
  if (!db) return;
  const appId = window.__app_id || "labour-hire-app";
  const employeesCol = FB.collection(db, `artifacts/${appId}/public/data/employees`);
  FB.onSnapshot(employeesCol, (snapshot) => {
    const tbody = document.getElementById('employee-table-body');
    if (!tbody) return;
    tbody.innerHTML = "";
    snapshot.forEach(doc => {
      const e = doc.data();
      const tr = document.createElement('tr');
      tr.className = "border-b";
      tr.innerHTML = `
        <td class="py-3 px-6">${e.name || ""}</td>
        <td class="py-3 px-6">${e.contact || ""}</td>
        <td class="py-3 px-6">${e.role || "Employee"}</td>
        <td class="py-3 px-6">${e.assignedSite || "N/A"}</td>
        <td class="py-3 px-6"><button class="text-blue-500 hover:underline">View</button></td>
      `;
      tbody.appendChild(tr);
    });
  });
}