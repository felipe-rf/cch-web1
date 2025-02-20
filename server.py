from http.server import SimpleHTTPRequestHandler, HTTPServer
import os
import re
import uuid

UPLOAD_DIR = "static/img"

class CustomHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.startswith("/static") or self.path == "/":
            return super().do_GET()

        clean_path = self.path.strip("/")
        self.path = f"/pages/{clean_path}.html"
        return super().do_GET()

    def do_POST(self):
        if self.path == "/upload":
            content_type = self.headers.get("Content-Type")
            if not content_type or "multipart/form-data" not in content_type:
                self.send_error(400, "Invalid Content-Type")
                return

            # Extrai o boundary do Content-Type
            boundary = content_type.split("boundary=")[-1].encode()
            content_length = int(self.headers["Content-Length"])
            body = self.rfile.read(content_length)

            # Divide as partes do multipart usando o boundary
            parts = body.split(b'--' + boundary)

            for part in parts:
                if b'Content-Disposition' in part and b'filename=' in part:
                    # Extrai o nome do arquivo usando regex
                    match = re.search(r'filename="([^"]+)"', part.decode(errors='ignore'))
                    filename = match.group(1) if match else f"{uuid.uuid4().hex}.jpg"

                    # Extrai o conteúdo do arquivo (ignorando headers)
                    file_data = part.split(b'\r\n\r\n', 1)[-1].rstrip(b'--')

                    # Garante que o diretório de upload existe
                    os.makedirs(UPLOAD_DIR, exist_ok=True)

                    # Evita sobrescrita de arquivos
                    file_path = os.path.join(UPLOAD_DIR, filename)
                    counter = 1
                    while os.path.exists(file_path):
                        name, ext = os.path.splitext(filename)
                        file_path = os.path.join(UPLOAD_DIR, f"{name}_{counter}{ext}")
                        counter += 1

                    # Salva o arquivo
                    with open(file_path, "wb") as f:
                        f.write(file_data)

                    self.send_response(200)
                    self.send_header("Content-Type", "application/json")
                    self.end_headers()
                    self.wfile.write(b'{"message": "Image uploaded successfully!", "filename": "' + os.path.basename(file_path).encode() + b'"}')
                    return

        self.send_response(400)
        self.end_headers()

PORT = 8000
server = HTTPServer(("localhost", PORT), CustomHandler)
print(f"Server running at http://localhost:{PORT}")
server.serve_forever()
