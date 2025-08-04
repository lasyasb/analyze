import { useState } from "react";
import axios from "axios";
export default function FileUpload({ onChartData }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "https://analyze-c85k.onrender.com/upload"
,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(res.data.message);
      console.log("Uploaded:", res.data);

      if (onChartData) {
        onChartData(null); // 💥 Reset chart if passed
      }
    } catch (err) {
      console.error("Upload failed:", err);
      setMessage("Upload failed.");
    }
  };

  return (
    <div className="card">
      <h2>📁 Upload CSV</h2>
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
}
