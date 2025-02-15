

// Funções de navegação
function showSection(sectionId) {
  document.querySelectorAll(".section").forEach((section) => {
    section.style.display = "none";
  });
  document.getElementById(sectionId).style.display = "block";
}

// Funções de reserva


// Carregamento inicial
window.onload = function () {
  // Verificar autenticação
  const adminToken = localStorage.getItem("adminToken");
  if (window.location.hash === "#admin") {
    if (adminToken) {
      showAdminPanel();
      showSection();
    } else {
      showAdminLogin();
      showSection();
    }
  }

  // Carregar dados mockados
  loadMockData();
};

function loadMockData() {

  // Carregar serviços
  const servicesContainer = document.querySelector("#services .features-grid");
  servicesContainer.innerHTML = mockData.services
    .map(
      (service) => `
          <div class="feature-card">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b4513" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4"/>
                <path d="M12 8h.01"/>
              </svg>
            </div>
            <h3>${service.name}</h3>
            <p>${service.description}</p>
            <p>${service.price} moedas de ouro</p>
          </div>
        `
    )
    .join("");

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

            }
