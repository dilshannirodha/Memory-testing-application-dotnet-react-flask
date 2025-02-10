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


# Configure Gemini API Key
genai.configure(api_key="AIzaSyB2uuD4ibj4isIoA_QkdsyIKdccNhAP05g")
#gemini api 
model = genai.GenerativeModel("gemini-pro")

@app.route('/generate', methods=['POST'])
def generate_text():
    data = request.json
    prompt = data.get("prompt", "")

    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400

    try:
        response = model.generate_content(prompt)
        return jsonify({"generated_text": response.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@app.route('/summarize', methods=['POST'])
def summarize_text():
    data = request.json
    text = data.get("text", "")

    if not text:
        return jsonify({"error": "Text is required"}), 400

    try:
        prompt = f"Summarize the following text:\n\n{text}"
        response = model.generate_content(prompt)
        return jsonify({"summary": response.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/classify', methods=['POST'])
def classify_text():
    data = request.json
    text = data.get("text", "")

    if not text:
        return jsonify({"error": "Text is required"}), 400

    try:
        # Use Gemini API to classify the text
        prompt = f"Classify the following text into one of the following topics: Technology, Health, Finance, Education, Entertainment, Sports, Politics, or Other. Text:\n\n{text}"
        response = model.generate_content(prompt)
        return jsonify({"topic": response.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500 
    
if __name__ == "__main__":
    app.run(debug=True, port=5001)
