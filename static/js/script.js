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
  //Carregar pagina
  const roomsContainer = document.querySelector(".rooms-grid");
  roomsContainer.innerHTML = mockData.rooms
    .slice(0, 3) // Slice to get the first 3 rooms
    .map(
      (room) => `
        <div class="room-card">
          <img src="${room.image}" alt="${room.name}" class="room-image">
          <div class="room-content">
            <h3>${room.name}</h3>
            <p>${room.description}</p>
            <a href="rooms/" class="btn btn-primary">Saiba mais</a>
          </div>
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
