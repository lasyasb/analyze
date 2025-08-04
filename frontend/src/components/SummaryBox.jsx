import { useState } from "react";
import axios from "axios";

export default function SummaryBox() {
  const [summary, setSummary] = useState("");

  const handleSummary = async () => {
    try {
      const res = await axios.get(
        "https://verbose-acorn-pjp7x7pw9wxj3997v-5000.app.github.dev/summary"
      );
      setSummary(res.data.summary);
    } catch (err) {
      console.error("Failed to fetch summary", err);
      setSummary("Failed to fetch summary.");
    }
  };

  return (
    <div className="card">
      <h2>🧠 Dataset Summary</h2>
      <button onClick={handleSummary}>Get Summary</button>
      <p>{summary}</p>
    </div>
  );
}
