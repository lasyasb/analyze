import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default function ChartBox({ chartData }) {
  if (!chartData) return null;

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: chartData.label || "Chart",
        data: chartData.data,
        backgroundColor: "#4f46e5",
      },
    ],
  };

  return (
    <div className="card">
      <h2>📊 Chart Output</h2>
      <Bar data={data} />
    </div>
  );
}
