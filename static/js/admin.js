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
