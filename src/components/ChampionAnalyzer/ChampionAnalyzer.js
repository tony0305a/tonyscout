import React from "react";
import useScout from "../../hooks/riot-hook";
import * as S from "./styled";

export const ChampionAnalyzer = () => {
  const { matchDataStateDb, scoutState } = useScout();
  const getIndex = (item) => {
    for (var i in item.participants) {
      if (item.participants[i].summonerId == scoutState.id) {
        return i;
      }
    }
  };

  const getChampionData = (matchs) => {
    var dataEntraceArray = [];
    var dataOutArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    matchs.map((item) => {
      dataEntraceArray.push({
        hero: item.participants[getIndex(item)].championId,
        win: item.participants[getIndex(item)].win,
        kills: item.participants[getIndex(item)].kills,
      });
    });
    

  };

  const call = () => {
    getChampionData(matchDataStateDb);
  };

  return (
    <S.Wrapper>
      <button onClick={call}>call</button>
    </S.Wrapper>
  );
};
