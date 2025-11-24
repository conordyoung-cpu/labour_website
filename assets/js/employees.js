// Employees module
// This file handles loading employees from Firestore
// and adding new ones when you click "Add Employee".

import { showMessage } from "./ui.js";

export function initEmployees() {
  // Grab Firebase services that were set up in index.html
  const services = window.__services || {};
  const db = services.db;
  const FB = services.FB;

  // If Firestore isn't ready, just run in demo mode
  if (!db || !FB) {
    console.warn("Employees: no Firestore available, demo mode only.");
    wireDemoButton();
    return;
  }

  // Pull out the helpers we need from Firebase
  const { collection, addDoc, onSnapshot } = FB;

  // Use a simple "employees" collection in Firestore
  const employeesCol = collection(db, "employees");

  const tbody = document.getElementById("employee-table-body");
  const addBtn = document.getElementById("add-employee-btn");

  if (!tbody || !addBtn) {
    console.warn("Employees: table body or add button not found.");
    return;
  }

  // Keep the employee table in sync with Firestore
  onSnapshot(employeesCol, (snapshot) => {
    tbody.innerHTML = "";
    snapshot.forEach((docSnap) => {
      const e = docSnap.data();
      const tr = document.createElement("tr");
      tr.className = "border-b";
      tr.innerHTML = `
        <td class="py-3 px-6">${e.name || ""}</td>
        <td class="py-3 px-6">${e.contact || ""}</td>
        <td class="py-3 px-6">${e.role || "Employee"}</td>
        <td class="py-3 px-6">${e.site || "N/A"}</td>
        <td class="py-3 px-6 text-sm text-gray-500">Edit / Delete (later)</td>
      `;
      tbody.appendChild(tr);
    });
  });

  // When you click "Add Employee", ask for details and save to Firestore
  addBtn.addEventListener("click", async () => {
    const name = prompt("Employee name:");
    if (!name) return;

    const contact = prompt("Contact (phone or email):") || "";
    const role = prompt("Role (e.g. Labourer, Supervisor):") || "Employee";
    const site = prompt("Assigned site:") || "N/A";

    try {
      await addDoc(employeesCol, {
        name,
        contact,
        role,
        site,
        createdAt: new Date()
      });
      showMessage("Employee added.");
    } catch (e) {
      console.error(e);
      showMessage("Could not add employee: " + e.message);
    }
  });
}

// Fallback behaviour if Firestore isn't running
function wireDemoButton() {
  document.getElementById("add-employee-btn")?.addEventListener("click", () => {
    showMessage("Running in demo mode. Firestore is not connected yet.");
  });
}