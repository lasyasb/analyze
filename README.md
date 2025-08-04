README.md

# 📊 AI-Powered Analytics Dashboard

A beautiful, responsive, and intelligent dashboard that allows users to upload CSV datasets, get instant summaries, ask data-related questions, and even generate charts — powered by the Mistral AI model. Built with React + Flask + Mistral.

## 🚀 Live Demo

🔗 [View Live on Render/Vercel](https://analyze-react.onrender.com)  
📁 [GitHub Repo](https://github.com/lasyasb/analyze)

---

## 🧠 Features

- ✅ **CSV Upload**: Drop your dataset and start analyzing instantly.
- 🤖 **AI-Powered Summary**: Get quick bullet-point summaries of your dataset.
- 💬 **Ask the Dataset**: Ask questions like “Generate a chart of individuals by education” and get intelligent responses.
- 📊 **Auto Chart Generation**: AI returns chart-ready JSONs for data visualizations.
- 🎨 **Clean, Responsive UI**: Built with custom CSS for a consistent and modern experience.

---

## ⚙️ Tech Stack

| Frontend | Backend | AI |
|----------|---------|----|
| React (Vite) | Flask | Mistral (mistral-small) |
| Axios | Pandas | OpenAI-compatible API |
| CSS Styling | CORS | dotenv |

---

## 🧪 How to Run Locally

### 1. Clone the repo
```bash
git clone https://github.com/lasyasb/analyze.git
cd analyze

2. Setup Backend (Flask)

cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

Create a .env file:

MISTRAL_API_KEY=your_api_key_here

Run the server:

python app.py

3. Setup Frontend (React)

cd frontend
npm install
npm run dev
