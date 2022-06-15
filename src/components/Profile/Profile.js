import React, { useState } from "react";
import { useEffect } from "react";
import useScout from "../../hooks/riot-hook";
import api from "../../services/api";
import ActiveMatch from "../ActiveMatch/ActiveMatch";
import Masteries from "../Masteries/Masteries";
import * as S from "./styled";
import Ranked from "../Ranked/Ranked";

const Profile = () => {
  const {
    scoutState,

    version,

    championState,
  } = useScout();

  const profileIcon = `http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${scoutState.profileIconId}.png`;

  /*
    for(var i in activeInfo.data.participants){
      console.log(i)
    }
    */

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
      <ActiveMatch />
    </S.ProfileAndMatch>
    <Ranked/>
    </S.ProfileAndMatchAndRanked>
  );
};
export default Profile;
