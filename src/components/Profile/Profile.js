import React, { useState } from "react";
import { useEffect } from "react";
import useScout from "../../hooks/riot-hook";
import api from "../../services/api";
import ActiveMatch from "../ActiveMatch/ActiveMatch";
import Masteries from "../Masteries/Masteries";
import * as S from "./styled";
import Ranked from "../Ranked/Ranked";
import Matches from "../Matches/Matches";

const Profile = () => {
  const {
    scoutState,
    version,
    getMatchData,
    matchState,
    championState,
    cleanMatchData,
  } = useScout();
 
  const profileIcon = `http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${scoutState.profileIconId}.png`;
  const [activeInfo, setActiveInfo] = useState(false);
  const [renderActiveMatch, setRenderActiveMatch] = useState(false);
  const [renderMatchs, setRenderMatch] = useState(false)
  useEffect(()=>{
    setRenderMatch(false)
    async function activeMatch(id) {
      try {
        const match = await api.get(
          `lol/spectator/v4/active-games/by-summoner/${id}?api_key=RGAPI-3ff69f05-592c-43e4-b1d8-b6a1b5159f56`
        );
        setRenderActiveMatch(true);
      } catch (error) {
        console.log("Sem partida ativa");
        setRenderActiveMatch(false);
        throw error
      }
    }




    activeMatch(scoutState.id);
  },[])

  useEffect(()=>{


    return function ComeUp(){
      cleanMatchData()
    }

  },[matchState])

  const renderMatch = () =>{
      setRenderMatch(true)
  }

  const analisar = () => {

  }

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
              <p>{scoutState.id}</p>
              <p>{scoutState.puuid}</p>
              {renderActiveMatch?(<><button onClick={renderMatch} >Partida Ativa</button></>):(<></>)}
              <button onClick={analisar} >Analisar</button>
    
            </S.SummonerInfo>
            <S.Mast>
              <Masteries />
            </S.Mast>
          </>
        ) : (
          <>
            <span>Sem invocador</span> 
          </>
        )}

      </S.Wrapper>
      <>
      {renderMatchs?(<><ActiveMatch /></>):(<></>)}
      </>

    </S.ProfileAndMatch>
    <S.RankedAndMatches>
    <Ranked/>
    <Matches/>
    </S.RankedAndMatches>

    </S.ProfileAndMatchAndRanked>
  );
};
export default Profile;
