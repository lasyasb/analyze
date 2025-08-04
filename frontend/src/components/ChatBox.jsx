import { useState } from "react";
import axios from "axios";

export default function ChatBox({ onChartData }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAsk = async () => {
    try {
      const res = await axios.post(
  `${import.meta.env.VITE_BACKEND_URL}/ask`,
  { question }
);


      const result = res.data.answer;
setAnswer(result);

// Strip explanation and extract JSON only
try {
  const match = result.match(/\{[\s\S]*?\}/); // match the first JSON block
  if (match) {
    const parsed = JSON.parse(match[0]);
    if (parsed.labels && parsed.data) {
      onChartData(parsed);
    }
  }
} catch (e) {
  console.log("Not a valid chart JSON.");
  onChartData(null);
}



    } catch (err) {
      console.error("Ask failed:", err);
      setAnswer("Failed to get a response.");
    }
  };

  return (
    <div className="card">
      <h2>🤖 Ask the Dataset</h2>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="e.g. Chart of income by gender"
      />
      <button onClick={handleAsk}>Ask</button>
      {answer && <pre>{answer}</pre>}
    </div>
  );
}
