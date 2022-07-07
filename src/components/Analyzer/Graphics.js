import React, { useEffect, useState } from "react";
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

const Graphics = () => {
  const { graphState, matchDataStateDb } = useScout();
  const [renderGraph, setRenderGraph] = useState(true);

  useEffect(() => {
    if (!isNaN(graphState[0])) {
      console.log(graphState)
        setRenderGraph(true);
    }
  }, [graphState]);

  const data = {
    labels: ["Lane", "Fight", "Utility", "Split", "Farm", "Objectives"],
    datasets: [
      {
        label: "Solo/Duo Perfomace",
        data: graphState,
        borderColor: "rgba(128, 0, 128, 1)",
        backgroundColor: "rgba(128,0,128,0.4)",
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
      <>
        {renderGraph ? (
          <div
            style={{
              position: "relative",
              margin: "auto",
              width: "300px",
            }}
          >
            <Radar data={data} options={options} />
          </div>
        ) : (
          <></>
        )}
      </>
    </>
  );
};
export default Graphics;
