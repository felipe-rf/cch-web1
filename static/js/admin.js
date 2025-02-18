function showAdminLogin() {
  document.getElementById("admin-login").style.display = "block";
  document.getElementById("admin-panel").style.display = "none";
}

function showAdminPanel() {
  document.getElementById("admin-login").style.display = "none";
  document.getElementById("admin-panel").style.display = "flex";
  showAdminSection("dashboard");
}

function showAdminSection(sectionId) {
  document.querySelectorAll(".admin-section").forEach((section) => {
    section.style.display = "none";
  });
  document.getElementById(sectionId).style.display = "block";
}

// Funções de autenticação
function handleAdminLogin(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Simulando autenticação
  if (username === "admin" && password === "admin") {
    localStorage.setItem("adminToken", "mock-token");
    showAdminPanel();
  } else {
    alert("Credenciais inválidas");
  }
}

function handleLogout() {
  localStorage.removeItem("adminToken");
  window.location.reload();
}

// Carregar dashboard administrativo
const dashboard = document.getElementById("dashboard");
dashboard.innerHTML = `
         <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div class="feature-card">
             <h3>Total de Aposentos</h3>
             <p class="text-2xl font-bold">${mockData.rooms.length}</p>
           </div>
           <div class="feature-card">
             <h3>Total de Serviços</h3>
             <p class="text-2xl font-bold">${mockData.services.length}</p>
           </div>
           <div class="feature-card">
             <h3>Reservas Pendentes</h3>
             <p class="text-2xl font-bold">${
               mockData.bookings.filter((b) => b.status === "pending").length
             }</p>
           </div>
         </div>
       `;
