// Carregamento inicial
window.onload = function () {
  // Verificar autenticação
  const adminToken = localStorage.getItem("adminToken");
  if (adminToken) {
    showAdminPanel();
    refreshData();
    showSection();
  } else {
    window.location.href = "/admin/login";
  }
};

function showAdminPanel() {
  document.getElementById("admin-panel").style.display = "inline";
  showAdminSection("dashboard");
}

function showAdminSection(sectionId) {
  document.querySelectorAll(".admin-section").forEach((section) => {
    section.style.display = "none";
  });
  document.getElementById(sectionId).style.display = "inline";
}

function showSubSection(sectionId) {
  // Find the currently visible admin section
  const activeAdminSection = document.querySelector(
    ".admin-section[style*='inline']"
  );

  if (activeAdminSection) {
    // Hide only the sub-sections within the active admin section
    activeAdminSection.querySelectorAll(".sub-section").forEach((section) => {
      section.style.display = "none";
    });

    // Show the requested sub-section
    const targetSubSection = document.getElementById(sectionId);
    if (targetSubSection && activeAdminSection.contains(targetSubSection)) {
      targetSubSection.style.display = "inline";
    }
  }
}

function handleLogout() {
  localStorage.removeItem("adminToken");
  window.location.reload();
}

function refreshData() {
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

  const roomsContainer = document.querySelector(".rooms-grid");
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
                   <a href="#" class="btn btn-primary" onclick="showEditRoom(${room.id})">Editar</a>
                   <a href="#" class="btn btn-primary" onclick="deleteRoom(${room.id})">Deletar</a>
                 </div>
               </div>
             `
    )
    .join("");

  const serviceContainer = document.querySelector(".features-grid");
  serviceContainer.innerHTML = mockData.services
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
              <a href="#" class="btn btn-primary" onclick="showEditService(${service.id})">Editar</a>
              <a href="#" class="btn btn-primary" onclick="deleteService(${service.id})">Deletar</a>
              </div>
          `
    )
    .join("");

  const imageContainer = document.querySelector(".images-grid");
  imageContainer.innerHTML = carousselImages
    .map(
      (src) => `
      <div class="feature-card">
        <img src="${src}" alt="Carousel image" class="room-image">
         <a href="#" class="btn btn-primary" onclick="deleteImage('${src}')">Deletar</a>
      </div>
    `
    )
    .join("");

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

function uploadImage(section) {
  const fileInput = document.getElementById(`${section}-imageUpload`);

  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("image", file);

    fetch("http://localhost:8000/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log("Upload successful:", data))
      .catch((error) => console.error("Error:", error));
    return;
  } else {
    console.log("No file selected.");
  }
}

function addRoom(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const description = document.getElementById("desc").value;
  const price = parseFloat(document.getElementById("price").value);
  const capacity = parseInt(document.getElementById("capacity").value);
  const image_name = document.getElementById("rooms-imageUpload").files[0].name;
  const image = "/static/img/" + image_name;
  const newRoom = {
    id: mockData.rooms.length + 1, // Generate a new ID
    name,
    description,
    price,
    capacity,
    image,
  };

  // Add the new room to the rooms array
  mockData.rooms.push(newRoom);
  localStorage.setItem("roomsData", JSON.stringify(mockData));

  // Re-render the room list
  refreshData();
}

function editRoom(event, roomId) {
  event.preventDefault();
  const name = document.getElementById("edit-name").value;
  const description = document.getElementById("edit-desc").value;
  const price = parseFloat(document.getElementById("edit-price").value);
  const capacity = parseInt(document.getElementById("edit-capacity").value);
  const imageInput = document.getElementById("edit-imageUpload").files[0];

  // Find the room by ID
  const roomIndex = mockData.rooms.findIndex((room) => room.id === roomId);
  if (roomIndex === -1) {
    alert("Room not found!");
    return;
  }

  // Update room properties
  mockData.rooms[roomIndex].name = name;
  mockData.rooms[roomIndex].description = description;
  mockData.rooms[roomIndex].price = price;
  mockData.rooms[roomIndex].capacity = capacity;

  // Only update image if a new one was uploaded
  if (imageInput) {
    const image_name = imageInput.name;
    mockData.rooms[roomIndex].image = "/static/img/" + image_name;
    uploadImage("edit");
  }

  // Save updated data
  localStorage.setItem("roomsData", JSON.stringify(mockData));

  // Re-render the room list
  refreshData();
}

function showEditRoom(roomId) {
  // Find the room by ID
  const roomIndex = mockData.rooms.findIndex((room) => room.id === roomId);
  if (roomIndex === -1) {
    alert("Room not found!");
    return;
  }

  // Update room properties
  document.getElementById("edit-name").value = mockData.rooms[roomIndex].name;
  document.getElementById("edit-desc").value =
    mockData.rooms[roomIndex].description;
  document.getElementById("edit-price").value = mockData.rooms[roomIndex].price;
  document.getElementById("edit-capacity").value =
    mockData.rooms[roomIndex].capacity;

  showSubSection("edit-room");
  const form = document.getElementById("edit-room-form");
  form.roomid = roomId;
}

document
  .getElementById("create-room-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents unwanted page refresh
    uploadImage("rooms");
    addRoom(event);
    showSubSection("rooms-grid");
  });

document
  .getElementById("edit-room-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents unwanted page refresh
    editRoom(event, document.getElementById("edit-room-form").roomid);
    showSubSection("rooms-grid");
  });

function deleteRoom(roomId) {
  // Filter out the room with the given ID
  mockData.rooms = mockData.rooms.filter((room) => room.id !== roomId);

  // Save the updated rooms data to localStorage
  localStorage.setItem("roomsData", JSON.stringify(mockData));

  // Re-render the room list
  refreshData();
}

// Service dashboard

function addService(event) {
  event.preventDefault();

  const name = document.getElementById("service-name").value;
  const description = document.getElementById("service-desc").value;
  const price = parseFloat(document.getElementById("service-price").value);
  const newService = {
    id: mockData.services.length + 1, // Generate a new ID
    name,
    description,
    price,
  };

  // Add the new room to the rooms array
  mockData.services.push(newService);
  localStorage.setItem("roomsData", JSON.stringify(mockData));

  // Re-render the room list
  refreshData();
}

function editService(event, serviceId) {
  event.preventDefault();
  const name = document.getElementById("edit-service-name").value;
  const description = document.getElementById("edit-service-desc").value;
  const price = parseFloat(document.getElementById("edit-service-price").value);

  // Find the room by ID
  const serviceIndex = mockData.services.findIndex(
    (service) => service.id === serviceId
  );
  if (serviceIndex === -1) {
    alert("Service not found!");
    return;
  }

  // Update room properties
  mockData.services[serviceIndex].name = name;
  mockData.services[serviceIndex].description = description;
  mockData.services[serviceIndex].price = price;

  // Save updated data
  localStorage.setItem("serviceData", JSON.stringify(mockData));

  // Re-render the room list
  refreshData();
}

function showEditService(serviceId) {
  // Find the room by ID
  const serviceIndex = mockData.services.findIndex(
    (service) => service.id === serviceId
  );
  if (serviceIndex === -1) {
    alert("Service not found!");
    return;
  }

  // Update room properties
  document.getElementById("edit-service-name").value =
    mockData.services[serviceIndex].name;
  document.getElementById("edit-service-desc").value =
    mockData.services[serviceIndex].description;
  document.getElementById("edit-service-price").value =
    mockData.services[serviceIndex].price;
  showSubSection("edit-service");
  const form = document.getElementById("edit-service-form");
  form.serviceid = serviceId;
}

document
  .getElementById("create-service-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents unwanted page refresh
    addService(event);
    showSubSection("service-grid");
  });

document
  .getElementById("edit-service-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents unwanted page refresh
    editService(event, document.getElementById("edit-service-form").serviceid);
    showSubSection("service-grid");
  });

function deleteService(serviceId) {
  // Filter out the room with the given ID
  mockData.services = mockData.services.filter(
    (service) => service.id !== serviceId
  );

  // Save the updated rooms data to localStorage
  localStorage.setItem("roomsData", JSON.stringify(mockData));

  // Re-render the room list
  refreshData();
}

function deleteImage(img_src) {
  // Filter out the room with the given ID
  carousselImages = carousselImages.filter((img) => img !== img_src);

  // Save the updated rooms data to localStorage
  localStorage.setItem("images", JSON.stringify(carousselImages));

  // Re-render the room list
  refreshData();
}

function updateBookingStatus(bookingId, status) {
  const booking = mockData.bookings.find((b) => b.id === bookingId);
  if (booking) {
    booking.status = status;
    localStorage.setItem("roomsData", JSON.stringify(mockData));
    refreshData();
  }
}

document
  .getElementById("images-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    uploadImage("images");
    const image_name =
      document.getElementById("images-imageUpload").files[0].name;
    const image = "/static/img/" + image_name;
    carousselImages.push(image);
    localStorage.setItem("images", JSON.stringify(carousselImages));
    showSubSection("images-grid");
    refreshData();
  });
