import * as S from "./styled";
import React, { useState } from "react";
import { useEffect } from "react";
import useScout from "../../hooks/riot-hook";
import api from "../../services/api";
import ActiveMatchPlayer from "../ActiveMatchPlayer/ActiveMatchPlayer";
import EmblemUnranked from "../../imgs/Emblem_Unranked.png";
import EmblemIron from "../../imgs/Emblem_Iron.png";
import EmblemBronze from "../../imgs/Emblem_Bronze.png";
import EmblemSilver from "../../imgs/Emblem_Silver.png";
import EmblemGold from "../../imgs/Emblem_Gold.png";
import EmblemPlatinum from "../../imgs/Emblem_Platinum.png";
import EmblemDiamond from "../../imgs/Emblem_Diamond.png";
import EmblemMaster from "../../imgs/Emblem_Master.png";
import EmblemGrandmaster from "../../imgs/Emblem_Grandmaster.png";
import EmblemChallenger from "../../imgs/Emblem_Challenger.png";
import m7 from "../../imgs/7.png"
import m6 from "../../imgs/6.png"
import m5 from "../../imgs/5.png"
import m4 from "../../imgs/4.png"
import m3 from "../../imgs/3.png"
import m2 from "../../imgs/2.png"
import m1 from "../../imgs/1.png"

const ActiveMatch = () => {
  const { scoutState, version, getChampionInfo, championState } = useScout();

  const [renderActiveMatch, setRenderActiveMatch] = useState(false);
  const [partElo, setPartElo] = useState([]);
  const [mapBuild, setMapBuild] = useState();
  const [summonerSpell, setSummonerSpell] = useState();
  const [runes, setRunes] = useState();
  const [activeInfo, setActiveInfo] = useState(false);
  const [gameQueue, setGameQueue] = useState();
  const [champion,setChampion] = useState()

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
        getChampionInfo(version);
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
    fetch(
      `http://ddragon.leagueoflegends.com/cdn/${version}/data/pt_BR/champion.json`
    )
      .then((response) => response.text())
      .then((x) => setChampion(JSON.parse(x)));
    activeMatch(scoutState.id);
    console.log("foi");
    console.log(championState);
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
      var info = champion.data;
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
      if (partElo[i][queue] != undefined) {
        if (partElo[i][queue].summonerId == id) {
          if (partElo[i][queue].tier == "IRON") {
            return EmblemIron;
          } else if (partElo[i][queue].tier == "BRONZE") {
            return EmblemBronze;
          } else if (partElo[i][queue].tier == "SILVER") {
            return EmblemSilver;
          } else if (partElo[i][queue].tier == "GOLD") {
            return EmblemGold;
          } else if (partElo[i][queue].tier == "PLATINUM") {
            return EmblemPlatinum;
          } else if (partElo[i][queue].tier == "DIAMOND") {
            return EmblemDiamond;
          } else if (partElo[i][queue].tier == "MASTER") {
            return EmblemMaster;
          } else if (partElo[i][queue].tier == "GRANDMASTER") {
            return EmblemGrandmaster;
          } else if (partElo[i][queue].tier == "CHALLENGER") {
            return EmblemChallenger;
          } else if (partElo[i][queue].tier == undefined) {
            return EmblemUnranked;
          }
        }
      }
    }
  };
  const getEloInfo = (id, queue, param) => {
    for (var i in partElo) {
      if (partElo[i][queue] != undefined) {
        if (partElo[i][queue].summonerId == id) {
          if (param == "queueType") {
            if (partElo[i][queue].queueType == "RANKED_SOLO_5x5") {
              return "Solo/Duo";
            } else if (partElo[i][queue].queueType == "RANKED_FLEX_SR") {
              return "Flex";
            }
          } else if (param == "rank") {
            return partElo[i][queue].rank;
          } else if (param == "leaguePoints") {
            return `${partElo[i][queue].leaguePoints} pdls`;
          }
        }
      }
    }
  };

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
              elo={getElo(item.summonerId, 0)}
              eloQueue={getEloInfo(item.summonerId, 0, "queueType")}
              eloRank={getEloInfo(item.summonerId, 0, "rank")}
              eloPdl={getEloInfo(item.summonerId, 0, "leaguePoints")}
              elo2={getElo(item.summonerId, 1)}
              elo2Queue={getEloInfo(item.summonerId, 1, "queueType")}
              elo2Rank={getEloInfo(item.summonerId, 1, "rank")}
              elo2Pdl={getEloInfo(item.summonerId, 1, "leaguePoints")}
            ></ActiveMatchPlayer>
          ))}
        </>
      ) : (
        <S.Wrapper></S.Wrapper>
      )}
    </S.Wrapper>
  );
};
export default ActiveMatch;
