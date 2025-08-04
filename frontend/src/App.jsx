import FileUpload from "./components/FileUpload";
import SummaryBox from "./components/SummaryBox";
import ChatBox from "./components/ChatBox";
import ChartBox from "./components/ChartBox";
import { useState } from "react";

export default function App() {
  const [chartData, setChartData] = useState(null);

  return (
    <div className="container">
      <h1>📈 AI Analytics Dashboard</h1>
      <FileUpload onChartData={setChartData} />

      <SummaryBox />
      <ChatBox onChartData={setChartData} />
      <ChartBox chartData={chartData} />
    </div>
  );
}
