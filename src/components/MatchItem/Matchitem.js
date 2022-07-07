import React, { useState, useEffect } from "react";
import * as S from "./styled";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en.json";
import MatchitemParticipants from "./MatchitemParticipants";
import useScout from "../../hooks/riot-hook";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
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
  parts,
}) => {
  const { matchDataState, version, matchState, scoutState } = useScout();
  const [champion, setChampion] = useState({ completed: false, info: [] });
  const [queue, setQueue] = useState();
  const [summonerSpell, setSummonerSpell] = useState();
  const [runes, setRunes] = useState();
  const [thisRender, setThisRender] = useState(false);
  useEffect(() => {
    fetch(
      `https://ddragon.leagueoflegends.com/cdn/${version}/data/pt_BR/champion.json`
    )
      .then((response) => response.text())
      .then((x) => setChampion({ completed: true, info: JSON.parse(x) }));
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
      //   cleanMatchData()
    };
  }, [scoutState]);

  const getChampName = (cid) => {
    var hero = champion.info.data;
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
      return `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${id}.png`;
    }
  };

  var decimalTime = (gameLength / 60).toFixed(2);
  var clockTime = ("" + decimalTime).replace(".", ":");

  const options = {
    indexAxis: "x",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: false,
        text: "Chart.js Horizontal Bar Chart",
      },
    },
  };

  const labels = [];
  const damages = [];
  const labels2 = [];
  const damages2 = [];
  for (var i = 0; i < 5; i++) {
    labels.push(parts[i].summonerName);
    damages.push(parts[i].totalDamageDealtToChampions);
  }

  for (var i = 5; i < 10; i++) {
    labels2.push(parts[i].summonerName);
    damages2.push(parts[i].totalDamageDealtToChampions);
  }
  const data = {
    labels,
    datasets: [
      {
        label: "Dmg",
        data: damages,
        borderColor: "rgb(0, 0, 255)",
        backgroundColor: "rgba(128, 0, 128, 1)",
      },
    ],
  };
  const data2 = {
    labels: labels2,
    datasets: [
      {
        label: "Dmg",
        data: damages2,
        borderColor: "rgb(255, 0, 0)",
        backgroundColor: "rgba(128, 0, 128, 1)",
      },
    ],
  };
  return (
    <S.Wrapper style={{ backgroundColor: color }} id={id}>
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
          <span>{farm + farm1}:CS</span>
        </S.ColunmScore>
        <S.ColunmParticipants>
          {champion.completed ? (
            <>
              {passItem.participants.map((item, index) => (
                <div key={index}>
                  <MatchitemParticipants
                    name={item.summonerName}
                    champ={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${getChampName(
                      item.championId
                    )}`}
                  ></MatchitemParticipants>
                </div>
              ))}
            </>
          ) : (
            <>
              <p>carregando...</p>
            </>
          )}
        </S.ColunmParticipants>
      </S.UpperLine>
      <S.LowerLine>
        <S.ColunmMetadata>
          <span>{result}</span>
          <span>{clockTime}</span>
        </S.ColunmMetadata>
        <S.ColunmBuild>
          <S.Line>
            <img src={item1} />
            <img src={item2} />
            <img src={item3} />
            <img src={item4} />
            <img src={item5} />
            <img src={item6} />
          </S.Line>
        </S.ColunmBuild>
      </S.LowerLine>
      <S.ColunmGraphs>
        <div
          style={{
            display: "flex",
            margin: "8",
            width: "370px",
          }}
        >
          <Bar options={options} data={data} />
        </div>
        <div
          style={{
            display: "flex",
            margin: "8",
            width: "370px",
          }}
        >
          <Bar options={options} data={data2} />
        </div>
      </S.ColunmGraphs>
    </S.Wrapper>
  );
};
export default Matchitem;
