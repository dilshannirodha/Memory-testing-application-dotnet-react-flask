import google.generativeai as genai

genai.configure(api_key="AIzaSyA2Goo-IMA1AgWS2KpSCjumZw-jMfdHrQc")  # Replace with your key
try:
    model = genai.GenerativeModel('gemini-1.5-pro')
    response = model.generate_content("Say hello")

    print(response.text)  # Should print a response like "Hello!"
except Exception as e:
    print("Error:", e)