import React, { useState, useEffect } from "react";
import * as S from "./styled";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en.json";
import MatchitemParticipants from "./MatchitemParticipants";
import useScout from "../../hooks/riot-hook";
import { M } from "../MasteryItem/styled";
TimeAgo.addLocale(en);

const Matchitem = ({
  id,
  gameMode,
  creationTime,
  champPic,
  kills,
  deaths,
  assists,
  SS1,
  SS2,
  rune1,
  rune2,
  rune3,
  rune4,
  rune5,
  rune6,
  rune7,
  rune8,
  rune9,
  role,
  item0,
  item1,
  item2,
  item3,
  item4,
  item5,
  item6,
  color,
  passItem,
  result,
  gameLength,
  farm,
  farm1,
}) => {
  const { matchDataState, version, matchState, scoutState } = useScout();
  const [champion, setChampion] = useState();
  const [queue, setQueue] = useState();
  const [summonerSpell, setSummonerSpell] = useState();
  const [runes, setRunes] = useState();

  useEffect(() => {
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

    fetch("https://static.developer.riotgames.com/docs/lol/queues.json")
      .then((response) => response.text())
      .then((x) => setQueue(JSON.parse(x)));

    return function cleanUp() {
      //   cleanMatchData()
      fetch(
        `http://ddragon.leagueoflegends.com/cdn/${version}/data/pt_BR/champion.json`
      )
        .then((response) => response.text())
        .then((x) => setChampion(JSON.parse(x)));
    };
  }, [matchState]);

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
      return `http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${id}.png`;
    }
  };
  const call = () => {
    console.log(champion);
  };

  if (champion == undefined) {
    return <p>Loading...</p>;
  }

  var decimalTime = (gameLength / 60).toFixed(2)
  var clockTime = (''+decimalTime).replace('.',':')


  return (
    <S.Wrapper style={{ backgroundColor: color }}>
      <S.UpperLine>
        <S.ColunmMetadata>
          <span>{gameMode}</span>
          <span>{role}</span>
          <ReactTimeAgo date={creationTime} locale="pt-BR" timeStyle="round" />
        </S.ColunmMetadata>
        <S.ColunmChampion>
          <S.ChampionLine>
            <S.Champion src={champPic} width="72" />
            <S.Line>
              <S.SummonerSpells>
                <img src={SS1} width="22" height="22" />
                <img src={SS2} width="22" height="22" />
              </S.SummonerSpells>
            </S.Line>
            <S.Line>
              <S.Runes>
                <S.Line>
                  <img src={rune1} width="24" />
                  <img src={rune2} width="24" />
                  <img src={rune3} width="24" />
                  <img src={rune4} width="24" />
                </S.Line>
                <S.Line>
                  <img src={rune5} width="24" />
                  <img src={rune6} width="24" />
                </S.Line>
                <S.Line>
                  <img src={rune7} width="24" />
                  <img src={rune8} width="24" />
                  <img src={rune9} width="24" />
                </S.Line>
              </S.Runes>
            </S.Line>
          </S.ChampionLine>
        </S.ColunmChampion>
        <S.ColunmScore>
          <span>
            {kills}/{deaths}/{assists}
          </span>
          <span>{farm+farm1}:CS</span>
        </S.ColunmScore>
        <S.ColunmParticipants>
          {passItem.info.participants.map((item) => (
            <MatchitemParticipants
              name={item.summonerName}
              champ={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${getChampName(
                item.championId
              )}`}
            ></MatchitemParticipants>
          ))}
        </S.ColunmParticipants>
      </S.UpperLine>
      <S.LowerLine>
        <S.ColunmMetadata>
          <span>{result}</span>
          <span>{clockTime}</span>
        </S.ColunmMetadata>
        <S.ColunmBuild>
          <S.Line>
            <img src={item1} width="36" height="36" />
            <img src={item2} width="36    " height="36" />
            <img src={item3} width="36" height="36" />
            <img src={item4} width="36" height="36" />
            <img src={item5} width="36" height="36" />
            <img src={item6} width="36" height="36" />
          </S.Line>
        </S.ColunmBuild>
      </S.LowerLine>
    </S.Wrapper>
  );
};
export default Matchitem;
