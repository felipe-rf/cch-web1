from http.server import SimpleHTTPRequestHandler, HTTPServer
import os
import cgi
import re

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
            content_type, pdict = cgi.parse_header(self.headers["Content-Type"])

            if content_type == "multipart/form-data":
                pdict["boundary"] = bytes(pdict["boundary"], "utf-8")
                boundary = pdict["boundary"]
                body = self.rfile.read(int(self.headers["Content-Length"]))

                # Find the file part in the multipart data using the boundary
                parts = body.split(b'--' + boundary)
                for part in parts:
                    # Check for the file part by finding 'Content-Disposition'
                    if b'Content-Disposition' in part and b'filename=' in part:
                        # Extract filename using regex from the Content-Disposition header
                        match = re.search(r'filename="([^"]+)"', part.decode('utf-8', errors='ignore'))
                        if match:
                            filename = match.group(1)
                        else:
                            filename = "default.jpg"  # Fallback if filename is not found
                        
                        # Extract the actual file content (the part after the filename)
                        # Skip decoding because it's binary data (e.g., image data)
                        file_data = part.split(b'\r\n\r\n', 1)[1].strip()

                        os.makedirs(UPLOAD_DIR, exist_ok=True)
                        file_path = os.path.join(UPLOAD_DIR, filename)

                        # Write the file data to the server (in binary mode)
                        with open(file_path, "wb") as f:
                            f.write(file_data)

                        self.send_response(200)
                        self.send_header("Content-Type", "application/json")
                        self.end_headers()
                        self.wfile.write(b'{"message": "Image uploaded successfully!", "filename": "' + filename.encode() + b'"}')
                        return

        self.send_response(400)
        self.end_headers()

PORT = 8000
server = HTTPServer(("localhost", PORT), CustomHandler)
print(f"Server running at http://localhost:{PORT}")
server.serve_forever()
