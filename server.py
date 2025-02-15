from http.server import SimpleHTTPRequestHandler, HTTPServer
import os

class CustomHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.startswith("/static") or self.path == "/": 
            return super().do_GET()

        self.path = f"/pages/{self.path}.html"

        return super().do_GET()

# Configurar o servidor na porta 8000
PORT = 8000
server = HTTPServer(("localhost", PORT), CustomHandler)
print(f"Servidor rodando em http://localhost:{PORT}")
server.serve_forever()
