function handleAdminLogin(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "admin") {
    localStorage.setItem("adminToken", "mock-token");
    window.location.href = "/admin";
  } else {
    alert("Credenciais inválidas");
  }
}

