import React, { useEffect } from "react";
import { useState } from "react";
import { version } from "styled-components";
import useScout from "../../hooks/riot-hook";
import * as S from "./styled";

const Header = () => {
  const {
    getSummoner,
    getVersion,
    version,
    getMasteries,
    scoutState,
    championState,
    getChampionInfo,
    rankedState,
    getRanked,
    getMatches,
    getMatchData,
    matchDataState,
    matchState,
    setRender,
    renderState,
  } = useScout();

  const [searchSummoner, setSearchSummoner] = useState();
  const [champion, setChampion] = useState();

  const findSummoner = () => {
    getChampionInfo();
    getVersion();
    getSummoner(searchSummoner);
    setRender(false);
  };
  useEffect(() => {
    if (scoutState.hasUser) {
      getMasteries(scoutState.id);
      getRanked(scoutState.id);
      getMatches(scoutState.puuid);
      getChampionInfo();
    }
  }, [scoutState]);

  useEffect(() => {
    getVersion();
    for (var i in matchState.matches) {
      getMatchData(matchState.matches[i]);
    }
    // setRender(true);console.log('render para true')
    return function cleanUp() {
    //  console.log("cleanUp matchState");
      //TODO add a render false
      //     cleanMatchData()
      //   setRender(false);console.log('render para false')
    };
  }, [matchState]);

  return (
    <S.Wrapper>
      <span>Patch {version}</span>
      <S.Form>
        <input
          type="text"
          placeholder="Pesquise o nome invocador"
          onChange={(event) => setSearchSummoner(event.target.value)}
        />
        <button type="submit" onClick={findSummoner}>
          Pesquisar
        </button>
      </S.Form>
    </S.Wrapper>
  );
};
export default Header;
