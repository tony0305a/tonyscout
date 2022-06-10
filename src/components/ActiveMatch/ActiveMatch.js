import * as S from "./styled";
import React, { useState } from "react";
import { useEffect } from "react";
import useScout from "../../hooks/riot-hook";
import api from "../../services/api";
import ActiveMatchPlayer from "../ActiveMatchPlayer/ActiveMatchPlayer";

const ActiveMatch = () => {
  const {
    scoutState,
    getMasteries,
    masteriesState,
    version,
    getChampionInfo,
    championState,
    getRanked,
    rankedState,
  } = useScout();

  const [renderActiveMatch, setRenderActiveMatch] = useState(false);
  const [partElo, setPartElo] = useState([]);
  const [mapBuild, setMapBuild] = useState();
  const [summonerSpell, setSummonerSpell] = useState();
  const [runes, setRunes] = useState();
  const [activeInfo, setActiveInfo] = useState(false);
  const [gameQueue, setGameQueue] = useState();

  useEffect(() => {
    setPartElo([]);
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

  useEffect(() => {
    if (activeInfo != undefined) {
      const getPartElo = (id) => {
        api
          .get(
            `lol/league/v4/entries/by-summoner/${id}?api_key=RGAPI-3ff69f05-592c-43e4-b1d8-b6a1b5159f56`
          )
          .then((res) => setPartElo((prevState) => [...prevState, res.data]));
      };
      if (activeInfo.data != undefined) {
        for (var i in activeInfo.data.participants) {
          setMapBuild(activeInfo.data.participants);
          getPartElo(activeInfo.data.participants[i].summonerId);
        }
      }
    }
  }, [activeInfo]);

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
  const getRunes = (style, id) => {
    for (var i in runes) {
      if (runes[i].id == style) {
        var main = runes[i].slots;
        for (var n in main) {
          var pick = main[n].runes;
          for (var o in pick) {
            if (pick[o].id == id) {
              return pick[o].icon;
            }
          }
        }
      }
    }
  };
  const getMods = (id) => {
    if (id == 5005) {
      return "StatModsAttackSpeedIcon.png";
    } else if (id == 5008) {
      return "StatModsAdaptiveForceIcon.png";
    } else if (id == 5002) {
      return "StatModsArmorIcon.png";
    } else if (id == 5001) {
      return "StatModsHealthScalingIcon.png";
    } else if (id == 5003) {
      return "StatModsMagicResIcon.MagicResist_Fix.png";
    } else if (id == 5007) {
      return "StatModsCDRScalingIcon.png";
    }
  };

  const getElo = (id, queue) => {
    for (var i in partElo) {
      if(partElo[i][queue] != undefined){
      if (partElo[i][queue].summonerId == id) {

          return `${partElo[i][queue].queueType} ${partElo[i][queue].tier}
            ${partElo[i][queue].rank}  ${partElo[i][queue].leaguePoints} pdls`

        //  return `${partElo[i][queue].queueType} ${partElo[i][queue].tier} ${partElo[i][queue].rank} ${partElo[i][queue].leaguePoints} `;
        }
      

    }
  };
}
  const call = () => {
    activeInfo.data.participants.map((item) => {
      console.log(item);
    });
  };

  return (
    <S.Wrapper>

      {renderActiveMatch ? (
        <>
          {activeInfo.data.participants.sort().map((item) => (
            <ActiveMatchPlayer
              summonerName={item.summonerName}
              summonerIcon={`http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${item.profileIconId}.png`}
              championImage={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${getHeroInfo(
                item.championId
              )}`}
              summonerSpell1={`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${getSS1(
                item.spell1Id
              )}`}
              summonerSpell2={`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${getSS1(
                item.spell2Id
              )}`}
              primaryRune1={`http://ddragon.leagueoflegends.com/cdn/img/${getRunes(
                item.perks.perkStyle,
                item.perks.perkIds[0]
              )}`}
              primaryRune2={`http://ddragon.leagueoflegends.com/cdn/img/${getRunes(
                item.perks.perkStyle,
                item.perks.perkIds[1]
              )}`}
              primaryRune3={`http://ddragon.leagueoflegends.com/cdn/img/${getRunes(
                item.perks.perkStyle,
                item.perks.perkIds[2]
              )}`}
              primaryRune4={`http://ddragon.leagueoflegends.com/cdn/img/${getRunes(
                item.perks.perkStyle,
                item.perks.perkIds[3]
              )}`}
              secondaryRune1={`http://ddragon.leagueoflegends.com/cdn/img/${getRunes(
                item.perks.perkSubStyle,
                item.perks.perkIds[4]
              )}`}
              secondaryRune2={`http://ddragon.leagueoflegends.com/cdn/img/${getRunes(
                item.perks.perkSubStyle,
                item.perks.perkIds[5]
              )}`}
              statMod1={`http://ddragon.leagueoflegends.com/cdn/img/perk-images/StatMods/${getMods(
                item.perks.perkIds[6]
              )}`}
              statMod2={`http://ddragon.leagueoflegends.com/cdn/img/perk-images/StatMods/${getMods(
                item.perks.perkIds[7]
              )}`}
              statMod3={`http://ddragon.leagueoflegends.com/cdn/img/perk-images/StatMods/${getMods(
                item.perks.perkIds[8]
              )}`}
              elo={getElo(item.summonerId,0)}
              elo2={getElo(item.summonerId,1)}
            ></ActiveMatchPlayer>
          ))}
        </>
      ) : (
        <S.Wrapper>
      
        </S.Wrapper>
      )}
    </S.Wrapper>
  );
};
export default ActiveMatch;
