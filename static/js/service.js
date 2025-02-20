function loadMockData() {
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

  
}

window.onload = function () {
  loadMockData();
};
