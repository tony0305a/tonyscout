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
    getChampionInfo,
    getRanked,
    getMatches,
    getMatchData,
    matchState,
    setRender,
    getMatchsFromDatabase,
    matchDataStateDb,
    renderState,
    cleanMatchsFromDatabase,
  } = useScout();

  const [searchSummoner, setSearchSummoner] = useState();
  const [champion, setChampion] = useState();

  const findSummoner = () => {
    cleanMatchsFromDatabase()
    setRender(false);
    getChampionInfo();
    getVersion();
    getSummoner(searchSummoner);
  };
  useEffect(() => {
    if (scoutState.hasUser) {
      getMasteries(scoutState.id);
      getRanked(scoutState.id);
      getMatches(scoutState.puuid, 420);
      cleanMatchsFromDatabase();
      getMatchsFromDatabase(scoutState.puuid);
      getChampionInfo();
    }
  }, [scoutState]);

  useEffect(() => {
    getVersion();
    // setRender(true);console.log('render para true')
    return function cleanUp() {
      //  console.log("cleanUp matchState");
      //TODO add a render false
      //     cleanMatchData()
      //   setRender(false);console.log('render para false')
    };
  }, [matchState]);
  useEffect(() => {
    // console.log(matchDataStateDb)

    if (matchDataStateDb.length !== 0) {
      //      setRender(true);console.log('deveria set o render pra true')
      /*
      for (var i in matchState.matches) {
        getMatchData(matchState.matches[i]);console.log('pegou partidas direto da API')
      }
      */
    }

    return function cleanUp() {
      setRender(false);
    };
  }, [matchDataStateDb]);
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
