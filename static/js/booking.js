function handleBooking(event) {
  event.preventDefault();
  const checkin = document.getElementById("checkin").value;
  const checkout = document.getElementById("checkout").value;
  const roomType = document.getElementById("room-type").value;
  const guests = document.getElementById("guests").value;

  
  const booking = {
    id: Date.now(),
    checkin,
    checkout,
    roomType,
    guests,
    status: "pending",
  };

  if (checkin == checkout){
    alert(
      "Data não pode ser igual."
    )
    return
  }
  mockData.bookings.push(booking);
  localStorage.setItem("roomsData", JSON.stringify(mockData));

  alert(
    "Sua reserva foi realizada com sucesso! Em breve um mensageiro entrará em contato."
  );
  event.target.reset();
}

function refreshData(){
  const roomsContainer = document.querySelector("#room-type");
  roomsContainer.innerHTML = mockData.rooms
    .map(
      (room) => `
              <option value="${room.name}">${room.name}</option>
             `
    )
    .join("");
}

window.onload=refreshData();
