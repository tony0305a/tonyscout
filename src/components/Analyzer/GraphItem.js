import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  ArcElement,
} from "chart.js";
import useScout from "../../hooks/riot-hook";
import { type } from "@testing-library/user-event/dist/type";
ChartJS.register(
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const GraphItem = ({ graphData, summonerName, color }) => {
  const data = {
    labels: ["Lane", "Fight", "Utility", "Split", "Farm", "Objectives"],
    datasets: [
      {
        label: `${summonerName} Solo/Duo Perfomace`,
        data: graphData,
        borderColor: "rgba(128, 0, 128, 1)",
        backgroundColor: `rgba(${color})`,
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    scale: {
      suggestedMax: 100,
      suggestedMin: 0,
      ticks: {
        display: true,
        maxTicksLimit: 2,
      },
    },
  };
  return (
    <>
      <div
        style={{
          position: "relative",
          margin: "auto",
          width: "300px",
        }}
      >
        <Radar data={data} options={options} />
      </div>
    </>
  );
};
