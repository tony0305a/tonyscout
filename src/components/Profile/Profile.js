import React, { useState } from "react";
import { useEffect } from "react";
import useScout from "../../hooks/riot-hook";
import api from "../../services/api";
import ActiveMatch from "../ActiveMatch/ActiveMatch";
import Masteries from "../Masteries/Masteries";
import * as S from "./styled";
import Ranked from "../Ranked/Ranked";
import Matches from "../Matches/Matches";
import Analyzer from "../Analyzer/Analyzer";
import Graphics from "../Analyzer/Graphics";
import Compare from "../Compare/Compare";
import apiHeader from "../../services/apiHeader";

const Profile = () => {
  const {
    scoutState,
    version,
    getMatchData,
    matchState,
    championState,
    cleanMatchData,
    matchDataState,
    getMatches,
    matchDataStateDb,
    setRender,
    cleanMatchsFromDatabase,
  } = useScout();

  const profileIcon = `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${scoutState.profileIconId}.png`;
  const [activeInfo, setActiveInfo] = useState(false);
  const [renderActiveMatch, setRenderActiveMatch] = useState(true);
  const [renderMatchs, setRenderMatch] = useState(false);
  useEffect(() => {
    if (scoutState.id != undefined) {
      setRenderMatch(false);
      async function activeMatch(id) {
        try {
          const match = await apiHeader.get(`active-match/${id}`);
          setRenderActiveMatch(true);
        } catch (error) {
          console.log("Sem partida ativa");
          setRenderActiveMatch(false);
          throw error;
        }
      }

      activeMatch(scoutState.id);
    }
  }, [scoutState]);

  useEffect(() => {
    return function ComeUp() {
      cleanMatchData();
    };
  }, [matchState]);

  const renderMatch = () => {
    if (renderMatchs) {
      setRenderMatch(false);
    } else {
      setRenderMatch(true);
    }
    // matchDataStateDb.map((item)=>console.log(item))
    console.log(matchState);
  };

  const analisar = async () => {
    setRender(false);
    getMatches(scoutState.puuid, 420);
    console.log(matchState);
    for (var i in matchState.matches) {
      await apiHeader.get(`/verify-id/${matchState.matches[i]}`).then((res) => {
        if (res.data.length == 0) {
          getMatchData(matchState.matches[i]);
        }
      });
    }
  };
  useEffect(() => {
    if (matchDataStateDb.length >= 1) {
      setRender(true);
    }
  }, [matchDataStateDb]);
  return (
    <S.ProfileAndMatchAndRanked>
      <S.ProfileAndMatch>
        <S.Wrapper>
          {scoutState.hasUser ? (
            <>
              <S.SummonerInfo>
                <span>{scoutState.name}</span>
                <img src={profileIcon} width="112" />
                <span>{scoutState.summonerLevel}</span>
                {renderActiveMatch ? (
                  <>
                    <button onClick={renderMatch}>Partida Ativa</button>
                  </>
                ) : (
                  <></>
                )}
                <button onClick={analisar}>Atualizar</button>
              </S.SummonerInfo>
              <S.Mast>
                <Masteries />
              </S.Mast>
              <Graphics />
            </>
          ) : (
            <>
              <span>Sem invocador</span>
            </>
          )}
        </S.Wrapper>
        <>
          <Compare />
          {renderMatchs ? (
            <>
              <ActiveMatch />
            </>
          ) : (
            <></>
          )}
        </>
      </S.ProfileAndMatch>
      <S.RankedAndMatches>
        <Ranked />
        <Matches />
      </S.RankedAndMatches>
    </S.ProfileAndMatchAndRanked>
  );
};
export default Profile;
