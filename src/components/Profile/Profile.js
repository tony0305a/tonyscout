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

const Profile = () => {
  const {
    scoutState,
    version,
    getMatchData,
    matchState,
    championState,
    cleanMatchData,
    matchDataState,
  } = useScout();

  const profileIcon = `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${scoutState.profileIconId}.png`;
  const [activeInfo, setActiveInfo] = useState(false);
  const [renderActiveMatch, setRenderActiveMatch] = useState(true);
  const [renderMatchs, setRenderMatch] = useState(false);
  useEffect(() => {
    if(scoutState.id != undefined){
    setRenderMatch(false);
    async function activeMatch(id) {
      try {
        const match = await api.get(
          `lol/spectator/v4/active-games/by-summoner/${id}?api_key=RGAPI-3ff69f05-592c-43e4-b1d8-b6a1b5159f56`
        );
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
    if(renderMatchs){
      setRenderMatch(false)
    } else {
      setRenderMatch(true);
    }
   
  };

  const analisar = () => {
    console.log(matchDataState);
  };

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
                <button onClick={analisar}>Analisar</button>
              </S.SummonerInfo>
              <S.Mast>
                <Masteries />
              </S.Mast>
              <Graphics/>
            </>
          ) : (
            <>
              <span>Sem invocador</span>
            </>
          )}
        </S.Wrapper>
        <>
        <Compare/>
          {renderMatchs ? (
            <>
              <ActiveMatch/>
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
