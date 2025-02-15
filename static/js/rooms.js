// script.js
function loadMockData() {
  // Load rooms
  const roomsContainer = document.querySelector("#rooms .rooms-grid");
  roomsContainer.innerHTML = mockData.rooms
    .map(
      (room) => `
          <div class="room-card">
            <img src="${room.image}" alt="${room.name}" class="room-image">
            <div class="room-content">
              <h3>${room.name}</h3>
              <p>${room.description}</p>
              <p>Capacidade: ${room.capacity} pessoas</p>
              <p>Preço: ${room.price} moedas de ouro/noite</p>
              <a href="#" class="btn btn-primary" onclick="showSection('booking')">Reservar</a>
            </div>
          </div>
        `
    )
    .join("");

  // Load services, dashboard, etc. (similar to how you did it before)
}

window.onload = function () {
  loadMockData();
};
