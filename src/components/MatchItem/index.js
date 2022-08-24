import React, {useState,useEffect} from "react";
import useScout from "../../hooks/riot-hook";
import MatchitemParticipants from "./MatchitemParticipants";
import * as S from "./MatchItemStyle";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import pt from "javascript-time-ago/locale/pt-PT.json";
TimeAgo.addLocale(pt);
const MatchItemNew = ({
  champImg,
  champLevel,
  result,
  SS1,
  SS2,
  MainRune,
  SecondaryRune,
  SecondaryRune2,
  kills,
  deaths,
  assists,
  farm,
  farm1,
  item1,
  item2,
  item3,
  item4,
  item5,
  item6,
  role,
  gameMode,
  passItem,
  gameLength,
  creationTime
}) => {
  const { version } = useScout();

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
  }, []);

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
  var blueTeam = passItem.slice(0,5)
  var redTeam = passItem.slice(5,10)

  return (
    <S.Wrapper>
      <S.Bar style={{ background: result }} />
      <div>
        <S.Outbar>
          <S.Line>
            <S.SelfChampionImg>
              <img src={champImg} width="54" />
              <span>{champLevel}</span>
            </S.SelfChampionImg>
            <S.Spells>
              <img src={SS1} width="22" height="22" />
              <img src={SS2} width="22" height="22" />
            </S.Spells>
            <S.Runes>
              <img src={MainRune} width="32" />
              <S.SecondaryRuneLine>
                <img src={SecondaryRune} width="24" />
                <img src={SecondaryRune2} width="24" />
              </S.SecondaryRuneLine>
            </S.Runes>
            <S.KDA>
              <span>
                {kills}/{deaths}/{assists}
              </span>
              <span>{farm + farm1}:CS</span>
            </S.KDA>
          </S.Line>
          <S.Line>
            <S.Metadata>
              <span>{gameMode}</span>
              <span>{role}</span>
              <ReactTimeAgo date={creationTime}  timeStyle="round" />

            </S.Metadata>
            <S.Build>
              <img src={item1} />
              <img src={item2} />
              <img src={item3} />
              <img src={item4} />
              <img src={item5} />
              <img src={item6} />
            </S.Build>
          </S.Line>
        </S.Outbar>
      </div>
      <S.Playerinfos>
          <MatchitemParticipants
            blueSide={blueTeam}
            redSide={redTeam}
            champ={champion}
            version={version}
          />
      </S.Playerinfos>
    </S.Wrapper>
  );
};

export default MatchItemNew;
