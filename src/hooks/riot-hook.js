import { useContext } from "react";
import { RiotContext } from "../providers/riot-provider";

const useScout = () => {
  const {
    scoutState,
    getSummoner,
    version,
    getVersion,
    masteriesState,
    getMasteries,
    championState,
    getChampionInfo,
    rankedState,
    getRanked,
    matchState,
    getMatches,
    setMatchState,
    matchDataState,
    getMatchData,
    cleanMatchData,
    setRender,
    renderState,
  } = useContext(RiotContext);

  return {
    scoutState,
    getSummoner,
    version,
    getVersion,
    masteriesState,
    getMasteries,
    championState,
    getChampionInfo,
    rankedState,
    getRanked,
    matchState,
    getMatches,
    setMatchState,
    getMatchData,
    matchDataState,
    cleanMatchData,
    setRender,
    renderState,
  };
};
export default useScout;
