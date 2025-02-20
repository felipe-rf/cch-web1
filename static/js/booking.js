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
  localStorage.setItem("roomsData", JSON.stringify(mockData));

  alert(
    "Sua reserva foi realizada com sucesso! Em breve um mensageiro entrará em contato."
  );
  event.target.reset();
}
