import React, { useEffect, useState } from "react";
import useScout from "../../hooks/riot-hook";
import apiHeader from "../../services/apiHeader";
import Analyzer from "../Analyzer/Analyzer";
import MatchItemNew from "../MatchItem";
import * as S from "./matchStyle";
import Roles from "../Roles";

const MatchsNew = ({ matchsIds, summonerId, summonerPuuid }) => {
  const {
    version,
    renderState,
    setRender,
    getMatchsFromDatabase,
    matchDataStateDb,
    cleanMatchsFromDatabase,
  } = useScout();
  const [ids, setIds] = useState([]);
  const [champion, setChampion] = useState();
  const [matchs, setMatchs] = useState([]);
  const [queue, setQueue] = useState();
  const [summonerSpell, setSummonerSpell] = useState();
  const [runes, setRunes] = useState();

  useEffect(() => {
    setIds(matchsIds);
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

    return function cleanUp() {
      setIds([]);
    };
  }, [matchsIds]);

  useEffect(() => {
    getMatchsFromDatabase(summonerPuuid);
    return function cleanUp() {
      cleanMatchsFromDatabase();
    };
  }, [summonerPuuid]);
  useEffect(() => {
    console.log("matchs", matchDataStateDb);
    setRender(true);
    return function cleanUp() {
      setRender(false);
    };
  }, [matchDataStateDb]);

  useEffect(() => {
    console.log(ids)
    const getMatchInfos = async () => {
      for (var i in ids) {
        await apiHeader.get(`match/info/${ids[i]}`);
      }
    };
    getMatchInfos();
  }, [ids]);

  const getIndex = (item) => {
    for (var i in item.participants) {
      if (item.participants[i].summonerId == summonerId) {
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
      return "blue";
    } else {
      return "red";
    }
  };
  const getResult = (bool) => {
    if (bool) {
      return "Vitória";
    } else {
      return "Derrota";
    }
  };
  /*

*/


  if (champion === undefined || summonerSpell === undefined) {
    return <h2>Loading...</h2>;
  }

  return (
    <S.Wrapper>
      <h1>Histórico</h1>
        <Roles matchs={matchDataStateDb} sId={summonerId} />
      {renderState ? (
        <>
          {matchDataStateDb
            .sort((a, b) => b.gameCreation - a.gameCreation)
            .map((item, index) => (
              <MatchItemNew
                key={index}
                champImg={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${getChampName(
                  item.participants[getIndex(item)].championId
                )}`}
                champLevel={item.participants[getIndex(item)].champLevel}
                result={getColor(item.participants[getIndex(item)].win)}
                SS1={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${getSS(
                  item.participants[getIndex(item)].summoner1Id
                )}`}
                SS2={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${getSS(
                  item.participants[getIndex(item)].summoner2Id
                )}`}
                MainRune={`https://ddragon.leagueoflegends.com/cdn/img/${getRunes(
                  item.participants[getIndex(item)].perks.styles[0].style,
                  item.participants[getIndex(item)].perks.styles[0]
                    .selections[0].perk
                )}`}
                SecondaryRune={`https://ddragon.leagueoflegends.com/cdn/img/${getRunes(
                  item.participants[getIndex(item)].perks.styles[1].style,
                  item.participants[getIndex(item)].perks.styles[1]
                    .selections[0].perk
                )}`}
                SecondaryRune2={`https://ddragon.leagueoflegends.com/cdn/img/${getRunes(
                  item.participants[getIndex(item)].perks.styles[1].style,
                  item.participants[getIndex(item)].perks.styles[1]
                    .selections[1].perk
                )}`}
                kills={item.participants[getIndex(item)].kills}
                deaths={item.participants[getIndex(item)].deaths}
                assists={item.participants[getIndex(item)].assists}
                farm={item.participants[getIndex(item)].totalMinionsKilled}
                farm1={item.participants[getIndex(item)].neutralMinionsKilled}
                item0={buildFilter(item.participants[getIndex(item)].item0)}
                item1={buildFilter(item.participants[getIndex(item)].item1)}
                item2={buildFilter(item.participants[getIndex(item)].item2)}
                item3={buildFilter(item.participants[getIndex(item)].item3)}
                item4={buildFilter(item.participants[getIndex(item)].item4)}
                item5={buildFilter(item.participants[getIndex(item)].item5)}
                item6={buildFilter(item.participants[getIndex(item)].item6)}
                role={item.participants[getIndex(item)].individualPosition}
                gameMode={getQueue(item.queueId)}
                passItem={item.participants}
                gameLength={item.gameDuration}
                creationTime={item.gameCreation}
              />
            ))}
        </>
      ) : (
        <></>
      )}
    </S.Wrapper>
  );
};

export default MatchsNew;
