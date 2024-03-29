import React, { useLayoutEffect } from "react";
import { useState } from "react";
import { useEffect } from "react";
import useScout from "../../hooks/riot-hook";
import Analyzer from "../Analyzer/Analyzer";
import Matchitem from "../MatchItem/Matchitem";
import * as S from "./styled";
import apiHeader from "../../services/apiHeader";
import { ChampionAnalyzer } from "../ChampionAnalyzer/ChampionAnalyzer";

const Matches = () => {
  const {
    scoutState,
    matchDataState,
    matchState,
    version,
    renderState,
    setRender,
    getChampionInfo,
    getVersion,
    matchDataStateDb,
  } = useScout();
  const [champion, setChampion] = useState();
  const [queue, setQueue] = useState();
  const [summonerSpell, setSummonerSpell] = useState();
  const [runes, setRunes] = useState();
  const [matchDataDb, setMatchDataDb] = useState([]);
  const [matchIds, setMatchIds] = useState([]);
  const [matchs, setMatchs] = useState([]);
  useEffect(() => {
    //mount
    getVersion();
    const getMatchIds = async () => {
      const response = await apiHeader.get(`match/ids/${scoutState.puuid}/420`);
      setMatchIds(response.data);
    };

    getMatchIds();

    console.log(matchState);
    //unmount
    return function CleanUp() {
      getVersion();
    };
  }, []);
  useEffect(() => {
    const getMatchInfo = async () => {
      for (var i in matchIds) {
        var response = await apiHeader.get(`match/info/${matchIds[i]}`);
        setMatchs((prevState) => [...prevState, response.data]);
      }
    };
    getMatchInfo();
  }, [matchState]);
  useEffect(() => {
    console.log(matchs);
  }, [matchs]);
  useEffect(() => {
    if (version != undefined) {
      fetch(
        `https://ddragon.leagueoflegends.com/cdn/${version}/data/pt_BR/champion.json`
      )
        .then((response) => response.text())
        .then((x) => setChampion(JSON.parse(x)));
      fetch(
        `https://ddragon.leagueoflegends.com/cdn/${version}/data/pt_BR/summoner.json`
      )
        .then((res) => res.text())
        .then((x) => setSummonerSpell(JSON.parse(x)));

      fetch(
        `https://ddragon.leagueoflegends.com/cdn/${version}/data/pt_BR/runesReforged.json`
      )
        .then((res) => res.text())
        .then((x) => setRunes(JSON.parse(x)));

      fetch("https://static.developer.riotgames.com/docs/lol/queues.json")
        .then((response) => response.text())
        .then((x) => setQueue(JSON.parse(x)));
    }

    return function cleanUp() {
      //   cleanMatchData()
      getVersion();
    };
  }, [matchState]);

  useEffect(() => {
    return function cleanUp() {
      getChampionInfo(version);
    };
  }, [scoutState]);

  useEffect(() => {
    return function cleanUp() {};
  }, [matchDataStateDb]);

  const getIndex = (item) => {
    for (var i in item.participants) {
      if (item.participants[i].summonerId == scoutState.id) {
        return i;
      }
    }
  };

  const getChampName = (cid) => {
    var hero = champion.data;
    for (var i in hero) {
      if (hero[i].key == cid) {
        return hero[i].image.full;
      }
    }
  };

  const getQueue = (id) => {
    for (var i in queue) {
      if (queue[i].queueId == id) {
        if (queue[i].description == "5v5 Ranked Flex games") {
          return "Flex";
        } else if (queue[i].description == "5v5 Draft Pick games") {
          return "Normal Alternada";
        } else if (queue[i].description == "5v5 ARAM games") {
          return "ARAM";
        } else if (queue[i].description == "5v5 Ranked Solo games") {
          return "Solo/Duo";
        } else {
          return queue[i].description;
        }
      }
    }
  };

  const getSS = (id) => {
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

  const buildFilter = (id) => {
    if (id == 0) {
      return `https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Grey_background.jpg/1200px-Grey_background.jpg`;
    } else {
      return `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${id}.png`;
    }
  };

  const getColor = (bool) => {
    if (bool) {
      return "lightblue";
    } else {
      return "lightcoral";
    }
  };
  const getResult = (bool) => {
    if (bool) {
      return "Vitória";
    } else {
      return "Derrota";
    }
  };

  const call = () => {
    console.log(matchState);
  };

  return (
    <>
      {scoutState.hasUser ? (
        <S.Wrapper>
          <h1>Histórico</h1>
          <S.Analyzer>
            <Analyzer />
          </S.Analyzer>
          {renderState ? (
            <S.MatchBody>
              {matchDataStateDb
                .sort((a, b) => b.gameCreation - a.gameCreation)
                .map((item, index) => (
                  <S.SingleMatch
                    key={index}
                    style={{
                      backgroundColor: getColor(
                        item.participants[getIndex(item)].win
                      ),
                    }}
                  >
                    <Matchitem
                      creationTime={item.gameCreation}
                      gameMode={getQueue(item.queueId)}
                      role={
                        item.participants[getIndex(item)].individualPosition
                      }
                      champPic={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${getChampName(
                        item.participants[getIndex(item)].championId
                      )}`}
                      kills={item.participants[getIndex(item)].kills}
                      deaths={item.participants[getIndex(item)].deaths}
                      assists={item.participants[getIndex(item)].assists}
                      SS1={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${getSS(
                        item.participants[getIndex(item)].summoner1Id
                      )}`}
                      SS2={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${getSS(
                        item.participants[getIndex(item)].summoner2Id
                      )}`}
                      rune1={`https://ddragon.leagueoflegends.com/cdn/img/${getRunes(
                        item.participants[getIndex(item)].perks.styles[0].style,
                        item.participants[getIndex(item)].perks.styles[0]
                          .selections[0].perk
                      )}`}
                      rune2={`https://ddragon.leagueoflegends.com/cdn/img/${getRunes(
                        item.participants[getIndex(item)].perks.styles[0].style,
                        item.participants[getIndex(item)].perks.styles[0]
                          .selections[1].perk
                      )}`}
                      rune3={`https://ddragon.leagueoflegends.com/cdn/img/${getRunes(
                        item.participants[getIndex(item)].perks.styles[0].style,
                        item.participants[getIndex(item)].perks.styles[0]
                          .selections[2].perk
                      )}`}
                      rune4={`https://ddragon.leagueoflegends.com/cdn/img/${getRunes(
                        item.participants[getIndex(item)].perks.styles[0].style,
                        item.participants[getIndex(item)].perks.styles[0]
                          .selections[3].perk
                      )}`}
                      rune5={`https://ddragon.leagueoflegends.com/cdn/img/${getRunes(
                        item.participants[getIndex(item)].perks.styles[1].style,
                        item.participants[getIndex(item)].perks.styles[1]
                          .selections[0].perk
                      )}`}
                      rune6={`https://ddragon.leagueoflegends.com/cdn/img/${getRunes(
                        item.participants[getIndex(item)].perks.styles[1].style,
                        item.participants[getIndex(item)].perks.styles[1]
                          .selections[1].perk
                      )}`}
                      rune7={`https://ddragon.leagueoflegends.com/cdn/img/perk-images/StatMods/${getMods(
                        item.participants[getIndex(item)].perks.statPerks
                          .offense
                      )}`}
                      rune8={`https://ddragon.leagueoflegends.com/cdn/img/perk-images/StatMods/${getMods(
                        item.participants[getIndex(item)].perks.statPerks.flex
                      )}`}
                      rune9={`https://ddragon.leagueoflegends.com/cdn/img/perk-images/StatMods/${getMods(
                        item.participants[getIndex(item)].perks.statPerks
                          .defense
                      )}`}
                      item0={buildFilter(
                        item.participants[getIndex(item)].item0
                      )}
                      item1={buildFilter(
                        item.participants[getIndex(item)].item1
                      )}
                      item2={buildFilter(
                        item.participants[getIndex(item)].item2
                      )}
                      item3={buildFilter(
                        item.participants[getIndex(item)].item3
                      )}
                      item4={buildFilter(
                        item.participants[getIndex(item)].item4
                      )}
                      item5={buildFilter(
                        item.participants[getIndex(item)].item5
                      )}
                      item6={buildFilter(
                        item.participants[getIndex(item)].item6
                      )}
                      color={getColor(item.participants[getIndex(item)].win)}
                      kda={(
                        (item.participants[getIndex(item)].kills +
                          item.participants[getIndex(item)].assists) /
                        item.participants[getIndex(item)].deaths
                      ).toFixed(1)}
                      passItem={item}
                      result={getResult(item.participants[getIndex(item)].win)}
                      farm={
                        item.participants[getIndex(item)].totalMinionsKilled
                      }
                      farm1={
                        item.participants[getIndex(item)].neutralMinionsKilled
                      }
                      gameLength={item.gameDuration}
                      parts={item.participants}
                    ></Matchitem>
                  </S.SingleMatch>
                ))}
            </S.MatchBody>
          ) : (
            <></>
          )}
        </S.Wrapper>
      ) : (
        <></>
      )}
    </>
  );
};
export default Matches;
