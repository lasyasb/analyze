from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from dotenv import load_dotenv
from mistral_utils import ask_mistral

load_dotenv()

app = Flask(__name__)
CORS(app)

df = None  # Global dataset

@app.route("/upload", methods=["POST"])
def upload_csv():
    global df
    print("Upload endpoint hit")  # <-- Add this
    print("Request files:", request.files)  # <-- And this

    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        df = pd.read_csv(file)
        print("CSV loaded:", df.shape)
        return jsonify({
            "message": "CSV uploaded successfully!",
            "columns": df.columns.tolist()
        }), 200
    except Exception as e:
        print("CSV load failed:", e)
        return jsonify({"error": f"Failed to read CSV: {str(e)}"}), 500

@app.route("/summary", methods=["GET"])
def get_summary():
    global df
    if df is None:
        return jsonify({"error": "No dataset uploaded"}), 400
    
    prompt = f"Summarize this dataset in 5 bullet points:\n\n{df.head(20).to_string(index=False)}"
    summary = ask_mistral(prompt)
    return jsonify({"summary": summary})

@app.route("/ask", methods=["POST"])
def ask_question():
    global df
    data = request.json
    question = data.get("question")

    if df is None or not question:
        return jsonify({"error": "Missing data"}), 400

    prompt = f"""You are an AI data analyst. When asked to generate a chart, respond ONLY with a JSON like:
{{
  "labels": ["Label1", "Label2"],
  "data": [value1, value2],
  "label": "Chart Title"
}}

Question: {question}
Dataset: 
{df.head(20).to_string(index=False)}
"""
    answer = ask_mistral(prompt)
    return jsonify({"answer": answer})


@app.route("/")
def index():
    return "Backend is running! 🚀"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
