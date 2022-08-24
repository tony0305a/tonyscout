import React from "react";
import useScout from "../../hooks/riot-hook";
import * as S from "./styled";
import apiHeader from "../../services/apiHeader";
const ProfileNew = ({ summonerName, profileIconId, level, matchsIds }) => {
  const { version, setRender } = useScout();

  const atualizar = async () =>{

    for(var i in matchsIds){
      const check = await apiHeader.get(`match/db/verify/${matchsIds[i]}`)
      if(check.data.length === 0){
       var add =  await apiHeader.get(`match/info/${matchsIds[i]}`);
       console.log('added',add)
      }
    }

  }

  return (
    <S.SummonerInfo>
      <span>{summonerName}</span>
      <img
        src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${profileIconId}.png`}
        width="112"
      />
      <span>{level}</span>
      <button onClick={atualizar}>Atualizar</button>
    </S.SummonerInfo>
  );
};

export default ProfileNew;
