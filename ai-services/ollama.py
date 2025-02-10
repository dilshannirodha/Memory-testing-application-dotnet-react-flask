from flask import Flask, jsonify , request
from flask_cors import CORS
import fitz  # PyMuPDF for PDF text extraction
import requests
import io
import google.generativeai as genai


app = Flask(__name__)
CORS(app) 

@app.route("/extract-text/<int:file_id>", methods=["GET"])
def extract_text(file_id):
    dotnet_api_url = f"http://localhost:5000/api/File/getFile/{file_id}"
    response = requests.get(dotnet_api_url)
    
    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch file from .NET API"}), 500
    pdf_bytes = io.BytesIO(response.content)
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")

    extracted_text = "\n".join([page.get_text() for page in doc])

    return jsonify({"file_id": file_id, "extracted_text": extracted_text})

# Ollama API endpoint
OLLAMA_API_URL = "http://localhost:11434/api/generate"

@app.route('/generate', methods=['POST'])
def generate_text():
    # Get the input text from the request
    data = request.json
    prompt = data.get('prompt', '')

    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400

    # Prepare the payload for Ollama API
    payload = {
        "model": "mistral",  # Replace with the model you want to use
        "prompt": prompt,
        "stream": False  # Set to True if you want streaming responses
    }

    # Send a POST request to Ollama API
    response = requests.post(OLLAMA_API_URL, json=payload)

    if response.status_code == 200:
        # Parse the response
        result = response.json()
        return jsonify(result)
    else:
        return jsonify({"error": "Failed to generate text"}), 500

@app.route('/summarize', methods=['POST'])
def summarize_text():
    # Get the input text from the request
    data = request.json
    text = data.get('text', '')

    if not text:
        return jsonify({"error": "No text provided"}), 400

    # Prepare the prompt for summarization
    prompt = f"Summarize the following text:\n\n{text}\n\nSummary:"

    # Prepare the payload for Ollama API
    payload = {
        "model": "mistral",  # Use the Mistral model
        "prompt": prompt,
        "stream": False  # Set to True if you want streaming responses
    }

    # Send a POST request to Ollama API
    response = requests.post(OLLAMA_API_URL, json=payload)

    if response.status_code == 200:
        # Parse the response
        result = response.json()
        summary = result.get("response", "").strip()
        return jsonify({"summary": summary})
    else:
        return jsonify({"error": "Failed to summarize text"}), 500

    
if __name__ == "__main__":
    app.run(debug=True, port=5001)
