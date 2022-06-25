import React, { useState } from "react";
import useScout from "../../hooks/riot-hook";
import { GraphCompare } from "../Analyzer/GraphCompare";

export const SlotCompare = () => {
  const {
    graphState,
    scoutState,
    rankedState,
    setSlot1Graph,
    graphSlot1State,
    graphSlot2State,
  } = useScout();
  const [thisGraph, setThisGraph] = useState([10, 20, 30, 40, 50, 60]);
  const [graphData1, setGraphData1] = useState([]);
  const [graphData2, setGraphData2] = useState([]);
  const [summonerName1, setSummonerName1] = useState("SummonerName");
  const [summonerName2, setSummonerName2] = useState("SummonerName");
  const compare = () => {
    console.log(graphSlot1State);
    if (graphSlot1State.length != 0) {
      setGraphData1(graphSlot1State[0]);
      setSummonerName1(graphSlot1State[1]);
    }
    if (graphSlot2State.length != 0) {
      setGraphData2(graphSlot2State[0]);
      setSummonerName2(graphSlot2State[1]);
    }
  };

  return (
    <>
      <button onClick={compare}>Compare</button>
      <GraphCompare
        graphData1={graphData1}
        summonerName1={summonerName1}
        graphData2={graphData2}
        summonerName2={summonerName2}
      />
    </>
  );
};
