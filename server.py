from http.server import SimpleHTTPRequestHandler, HTTPServer
import os

class CustomHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        self.path = self.path.rstrip("/")
        if self.path == "/admin":
            self.path = "pages/admin.html"  # Arquivo HTML para a rota /admin
        elif self.path == "/rooms":
            self.path = "pages/rooms.html"  # Arquivo HTML para a rota /admin
        elif self.path == "":
            self.path = "index.html"  # Arquivo principal
        else:
            self.path = self.path.lstrip("/")
        print(self.path)
        return super().do_GET()

# Configurar o servidor na porta 8000
PORT = 8000
server = HTTPServer(("localhost", PORT), CustomHandler)
print(f"Servidor rodando em http://localhost:{PORT}")
server.serve_forever()
