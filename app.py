from flask import Flask, send_from_directory

app = Flask(__name__)

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')  # Mengirim file index.html dari direktori saat ini

if __name__ == '__main__':
    app.run(ssl_context=('cert.pem', 'key.pem'), port=8000)
