import React, { useState } from "react";
import { useEffect } from "react";
import useScout from "../../hooks/riot-hook";
import api from "../../services/api";
import ActiveMatch from "../ActiveMatch/ActiveMatch";
import Masteries from "../Masteries/Masteries";
import * as S from "./styled";

const Profile = () => {
  const {
    scoutState,
    getMasteries,
    masteriesState,
    version,
    getChampionInfo,
    championState,
  } = useScout();
  const [renderActiveMatch, setRenderActiveMatch] = useState(false);
  const [champion, setChampion] = useState();
  const [summonerSpell, setSummonerSpell] = useState();
  const [runes, setRunes] = useState();
  const [activeInfo, setActiveInfo] = useState(false);
  const [gameQueue, setGameQueue] = useState();

  const profileIcon = `http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${scoutState.profileIconId}.png`;

  useEffect(() => {
    async function activeMatch(id) {
      try {
        const match = await api.get(
          `lol/spectator/v4/active-games/by-summoner/${id}?api_key=RGAPI-3ff69f05-592c-43e4-b1d8-b6a1b5159f56`
        );
        console.log(match);
        setActiveInfo(match);
        setRenderActiveMatch(true);
      } catch (error) {
        console.log("Sem partida ativa");
        setRenderActiveMatch(false);
        setActiveInfo();
        getChampionInfo();
      }
    }


    fetch(
      `http://ddragon.leagueoflegends.com/cdn/${version}/data/pt_BR/summoner.json`
    )
      .then((res) => res.text())
      .then((x) => setSummonerSpell(JSON.parse(x)));
    
    fetch(
      `http://ddragon.leagueoflegends.com/cdn/${version}/data/pt_BR/runesReforged.json`
    )
      .then((res) => res.text())
      .then((x) => setRunes(JSON.parse(x)));

    activeMatch(scoutState.id);
  }, [scoutState]);

  const getHeroInfo = (id) => {
    try {
      var info = championState.data;
      for (var i in info) {
        if (info[i].key == id) {
          return info[i].image.full;
        }
      }
    } catch (error) {
      console.log(`deu ruim ${error}`);
    }
  };
  const getSS1 = (id) => {
    var info = summonerSpell.data;
    for (var i in info) {
      if (info[i].key == id) {
        return info[i].image.full;
      }
    }
  };
  const getRunes = (style,id) =>{
    for(var i in runes){
      if(runes[i].id == style){
        var main = runes[i].slots
        for(var n in main){
            var pick = main[n].runes
            for(var o in pick){
              if(pick[o].id == id){
                return pick[o].icon
              }
            }
        }
      }
    }
  }

  console.log(getHeroInfo(266));

  const call = () => {
    console.log(getRunes(8100,8112))
  };

  return (
    <S.MatchWrapper>
      <S.Wrapper>
        {scoutState.hasUser ? (
          <>
            <S.SummonerInfo>
              <span>{scoutState.name}</span>
              <img src={profileIcon} width="112" />
              <span>{scoutState.summonerLevel}</span>
              <p>{scoutState.id}</p>

              <button onClick={call}>Partida ativa</button>
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

      {renderActiveMatch ? (
        <ActiveMatch
          queue={gameQueue}
          startTime={activeInfo.data.gameStartTime}
          player2={activeInfo.data.participants[1].summonerName}
          player3={activeInfo.data.participants[2].summonerName}
          player4={activeInfo.data.participants[3].summonerName}
          player5={activeInfo.data.participants[4].summonerName}
          player6={activeInfo.data.participants[5].summonerName}
          player7={activeInfo.data.participants[6].summonerName}
          player8={activeInfo.data.participants[7].summonerName}
          player9={activeInfo.data.participants[8].summonerName}
          player10={activeInfo.data.participants[9].summonerName}
          player1={activeInfo.data.participants[0].summonerName}
          player1ChamPicture={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${getHeroInfo(
            activeInfo.data.participants[0].championId
          )}`}
          player1Summonerspell1={`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${getSS1(
            activeInfo.data.participants[0].spell1Id
          )}`}
          player1Summonerspell2={`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${getSS1(
            activeInfo.data.participants[0].spell2Id
          )}`}
        ></ActiveMatch>
      ) : (
        <>
          <p>sem partida ativa</p>
        </>
      )}
    </S.MatchWrapper>
  );
};
export default Profile;
