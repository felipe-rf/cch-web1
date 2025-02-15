// Funções de navegação
function showSection(sectionId) {
  document.querySelectorAll(".section").forEach((section) => {
    section.style.display = "none";
  });
  document.getElementById(sectionId).style.display = "block";
}

// Funções de reserva
function handleBooking(event) {
  event.preventDefault();
  const checkin = document.getElementById("checkin").value;
  const checkout = document.getElementById("checkout").value;
  const roomType = document.getElementById("room-type").value;
  const guests = document.getElementById("guests").value;

  // Simulando salvamento da reserva
  const booking = {
    id: Date.now(),
    checkin,
    checkout,
    roomType,
    guests,
    status: "pending",
  };

  mockData.bookings.push(booking);
  alert(
    "Sua reserva foi realizada com sucesso! Em breve um mensageiro entrará em contato."
  );
  event.target.reset();
}

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
            <a href="/rooms/" class="btn btn-primary">Saiba mais</a>
          </div>
        </div>
      `
    )
    .join("");
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

  // Carregar gerenciamento de reservas
  const bookingsManager = document.getElementById("manage-bookings");
  bookingsManager.innerHTML = `
          <div class="overflow-x-auto">
            <table class="w-full bg-white shadow-md" style="border: 2px solid #8b4513;">
              <thead style="background: #2c1810; color: #d4af37;">
                <tr>
                  <th class="p-4">ID</th>
                  <th class="p-4">Check-in</th>
                  <th class="p-4">Check-out</th>
                  <th class="p-4">Tipo de Aposento</th>
                  <th class="p-4">Hóspedes</th>
                  <th class="p-4">Status</th>
                  <th class="p-4">Ações</th>
                </tr>
              </thead>
              <tbody>
                ${mockData.bookings
                  .map(
                    (booking) => `
                  <tr style="border-bottom: 1px solid #8b4513;">
                    <td class="p-4">${booking.id}</td>
                    <td class="p-4">${booking.checkin}</td>
                    <td class="p-4">${booking.checkout}</td>
                    <td class="p-4">${booking.roomType}</td>
                    <td class="p-4">${booking.guests}</td>
                    <td class="p-4">${booking.status}</td>
                    <td class="p-4">
                      <button class="btn btn-primary" onclick="updateBookingStatus(${booking.id}, 'confirmed')">
                        Confirmar
                      </button>
                    </td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        `;
}

function updateBookingStatus(bookingId, status) {
  const booking = mockData.bookings.find((b) => b.id === bookingId);
  if (booking) {
    booking.status = status;
    loadMockData();
  }
}
