import React, { useEffect, useState } from "react";
import useScout from "../../hooks/riot-hook";
import { GraphItem } from "../Analyzer/GraphItem";

export const Slot1 = () => {
  const { graphState, scoutState, rankedState, setSlot1Graph } = useScout();
  const [thisGraph, setThisGraph] = useState([]);
  const [summonerName, setSummonerName] = useState("Nome");
  const [summonerElo, setSummonerElo] = useState("Unranked");
  const saveHere = () => {
    console.log(graphState);
    if (!isNaN(graphState[0])) {
      setThisGraph(graphState);
      setSummonerName(scoutState.name);
      if (rankedState.ranked[0] != undefined) {
        var r = rankedState.ranked[0];
        console.log(r);
        if (r.queueType === "RANKED_SOLO_5x5") {
          r = rankedState.ranked[0];
        } else {
          r = rankedState.ranked[1];
        }

        setSummonerElo(`${r.tier} ${r.rank}`);
        setSlot1Graph([thisGraph, summonerName, summonerElo]);
      }
    }
  };

  return (
    <>
      <button onClick={saveHere}>Save Graph here</button>
      <span>{summonerName}</span>
      <span>{summonerElo}</span>
      <GraphItem
        graphData={thisGraph}
        summonerName={summonerName}
        color={"255,0,0,0.4"}
      />
    </>
  );
};
