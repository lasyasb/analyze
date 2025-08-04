# backend/mistral_utils.py
import os
import requests

API_URL = "https://api.mistral.ai/v1/chat/completions"
MISTRAL_KEY = os.environ.get("MISTRAL_API_KEY")  # 🔒 Securely loaded

def ask_mistral(prompt):
    if not MISTRAL_KEY:
        return "MISTRAL_API_KEY not set."

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {MISTRAL_KEY}"
    }

    data = {
        "model": "mistral-small",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.7
    }

    try:
        response = requests.post(API_URL, headers=headers, json=data)
        response.raise_for_status()
        return response.json()["choices"][0]["message"]["content"]
    except Exception as e:
        return f"Error calling Mistral: {str(e)}"
