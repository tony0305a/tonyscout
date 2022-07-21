import React, { useEffect } from "react";
import { useState } from "react";
import { version } from "styled-components";
import useScout from "../../hooks/riot-hook";
import * as S from "./styled";
import { useForm } from "react-hook-form";
import logo from "../../imgs/logo.png";
import { useNavigate } from "react-router-dom";

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
    matchState,
    setRender,
    getMatchsFromDatabase,
    matchDataStateDb,
    cleanMatchsFromDatabase,
    cleanScoutState,
    cleanMasteriesState
  } = useScout();
  const navigate = useNavigate()

  const [searchSummoner, setSearchSummoner] = useState();
  const [champion, setChampion] = useState();

  const findSummoner = () => {
    cleanMatchsFromDatabase();
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

  const clickLogo = () =>{
    cleanScoutState();
    cleanMasteriesState();
    navigate('/')
  }


  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    findSummoner(data.name)};
  return (
    <S.Wrapper>
      <S.Nav>
        <img src={logo} onClick={clickLogo}  width="64" height="64" />
      </S.Nav>

      <S.HeaderBody>
        <span>Patch {version}</span>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Pesquise o nome invocador"
            onChange={(event) => { navigate('/');setSearchSummoner(event.target.value)}}
          />
          <button type="submit">Pesquisar</button>
        </S.Form>
      </S.HeaderBody>
    </S.Wrapper>
  );
};
export default Header;
