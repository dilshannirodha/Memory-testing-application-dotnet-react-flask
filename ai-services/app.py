from flask import Flask, jsonify , request
from flask_cors import CORS
import fitz  # PyMuPDF for PDF text extraction
import requests
import io
import google.generativeai as genai
import pytesseract
from PIL import Image
import PyPDF2
import base64
import tempfile
import os
import shutil
from pdf2image import convert_from_path


app = Flask(__name__)
CORS(app) 


# Configure Gemini API Key
genai.configure(api_key="AIzaSyB2uuD4ibj4isIoA_QkdsyIKdccNhAP05g")
#gemini api 
model = genai.GenerativeModel("gemini-1.5-pro")
models = genai.list_models()
for m in models:
    print(m.name)

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
    
@app.route('/compare', methods=['POST'])
def compare_answer():
    data = request.json
    study_material = data.get("study_material", "")
    user_answer = data.get("user_answer", "")

    if not study_material or not user_answer:
        return jsonify({"error": "Study material and user answer are required"}), 400

    try:
        prompt = f"""
        Compare the following user answer with the provided study material.
        - Identify missing or incorrect details.
        - Provide a similarity score from 0 to 100.
        - Offer constructive feedback on how the user can improve.

        Study Material:
        {study_material}

        User Answer:
        {user_answer}

        Response format:
        - Similarity Score: (numeric)
        - Missing Information: (text)
        - Feedback: (text)
        """

        response = model.generate_content(prompt)

        return jsonify({"comparison_result": response.text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500



pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'


@app.route('/api/ocr', methods=['POST'])
def ocr():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    file_extension = file.filename.split('.')[-1].lower()

    try:
        # Check for text files
        if file_extension == 'txt':
            text = extract_text_from_txt(file)
            return jsonify({'text': text})

        if file_extension == 'pdf':
            temp_dir = tempfile.mkdtemp()  # Create a temporary directory
            temp_file_path = os.path.join(temp_dir, file.filename)
            file.save(temp_file_path)

            images = convert_pdf_to_images(temp_file_path)  # Pass the file path

            shutil.rmtree(temp_dir)  # Delete the temporary directory

            return jsonify({'images': images})
        
        elif file_extension in ['jpg', 'jpeg', 'png', 'gif']:
            image = Image.open(file.stream)
            text = pytesseract.image_to_string(image)
        
        else:
            return jsonify({'error': 'Unsupported file type'}), 400

        return jsonify({'text': text})

    except Exception as e:
        return jsonify({'error': str(e)}), 500


def extract_text_from_txt(file):
    """Extract text from a plain text file."""
    try:
        text = file.read().decode('utf-8')
        return text
    except UnicodeDecodeError:
        return "Failed to decode the text file. Unsupported encoding."

image_folder = 'static/pdf_images'

if not os.path.exists(image_folder):
    os.makedirs(image_folder)

def convert_pdf_to_images(pdf_path):
    try:
        images = convert_from_path(pdf_path, poppler_path=r'C:/poppler-24.08.0/Library/bin')
        image_urls = []

        # Save each page as a separate image and store the paths
        for i, image in enumerate(images):
            image_filename = f"page_{i + 1}.png"
            image_path = os.path.join(image_folder, image_filename)
            image.save(image_path, 'PNG')

            # Construct the URL to access the image from the frontend
            image_url = f"/static/pdf_images/{image_filename}"
            image_urls.append(image_url)

        return image_urls 
    except Exception as e:
        raise Exception(f"Error converting PDF to images: {str(e)}")
 
@app.route('/api/cleanup-images', methods=['DELETE'])
def cleanup_images():
    try:
        image_folder = 'static/pdf_images'

        if not os.path.exists(image_folder):
            return jsonify({'message': 'Image folder does not exist or is already clean.'}), 200

        # Loop through the files in the directory and delete them
        for filename in os.listdir(image_folder):
            file_path = os.path.join(image_folder, filename)
            if os.path.isfile(file_path):
                os.remove(file_path)

        return jsonify({'message': 'All images in the folder have been successfully deleted.'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5001)
