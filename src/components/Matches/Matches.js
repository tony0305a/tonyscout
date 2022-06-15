import React, { useEffect, useState } from "react";
import useScout from "../../hooks/riot-hook";
import matchApi from "../../services/matchs-api";
import Matchitem from "../MatchItem/Matchitem";
import * as S from "./styled";
const Matches = () => {
  const { matchState, setMatchState, getVersion, version, scoutState } =
    useScout();
  const [matchData, setMatchData] = useState();
  const [champion, setChampion] = useState();
  const [queue, setQueue] = useState();
  const [renderMatchs, setRenderMatchs] = useState(false)

  useEffect(() => {
    setMatchData([])
    setRenderMatchs(false)
    const getMatchData = (matchId) => {
      try{
        matchApi
        .get(
          `lol/match/v5/matches/${matchId}?api_key=RGAPI-3ff69f05-592c-43e4-b1d8-b6a1b5159f56`
        )
        .then((response) =>
          setMatchData((prevState) => [...prevState, response.data])
        );
        setRenderMatchs(true)
      } catch (error){
        setRenderMatchs(false)
      }

    };

    fetch(
      `http://ddragon.leagueoflegends.com/cdn/12.10.1/data/pt_BR/champion.json`
    )
      .then((response) => response.text())
      .then((x) => setChampion(JSON.parse(x)));
    fetch("https://static.developer.riotgames.com/docs/lol/queues.json")
      .then((response) => response.text())
      .then((x) => setQueue(JSON.parse(x)));


      matchState.matches.map((item) => {
         getMatchData(item)

    })


  }, [scoutState]);

  /*
  const [matchData, setMatchData] = useState([
    {
      metadata: { gameId: "0" },
      info: {
        queueId: "0",
        gameCreation: "0",
        participants: [
          {
            kills: "0",
            deaths: "0",
            assists: "0",
            championId: "0",
            summonerId: scoutState.id,
          },
          {
            kills: "0",
            deaths: "0",
            assists: "0",
            championId: "0",
            summonerId: scoutState.id,
          },
          {
            kills: "0",
            deaths: "0",
            assists: "0",
            championId: "0",
            summonerId: scoutState.id,
          },
          {
            kills: "0",
            deaths: "0",
            assists: "0",
            championId: "0",
            summonerId: scoutState.id,
          },
          {
            kills: "0",
            deaths: "0",
            assists: "0",
            championId: "0",
            summonerId: scoutState.id,
          },
          {
            kills: "0",
            deaths: "0",
            assists: "0",
            championId: "0",
            summonerId: scoutState.id,
          },
          {
            kills: "0",
            deaths: "0",
            assists: "0",
            championId: "0",
            summonerId: scoutState.id,
          },
          {
            kills: "0",
            deaths: "0",
            assists: "0",
            championId: "0",
            summonerId: scoutState.id,
          },
          {
            kills: "0",
            deaths: "0",
            assists: "0",
            championId: "0",
            summonerId: scoutState.id,
          },
          {
            kills: "0",
            deaths: "0",
            assists: "0",
            championId: "0",
            summonerId: scoutState.id,
          },
        ],
        gameMode: "0",
      },
    },
  ]);


  getVersion();



  useEffect(() => {
    /*


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
        return queue[i].description;
      }
    }
  };

  const check = () => {
    matchData.map((item) => {
      console.log(item.info.participants[0].championId);
    });
    console.log(matchData);
  };

  const getIndex = (item) => {
    for (var i in item.info.participants) {
      if (item.info.participants[i].summonerId == scoutState.id) {
        return i;
      }
    }
  };
  */
  const call = () =>{
    console.log(matchData)
  }

  return (
    <S.Wrapper>
      <span>Partida</span>
      <button onClick={call}>call</button>
      {renderMatchs?(
      <>
      {matchData.data.map((item)=>(
      <Matchitem
      id={item.metadata.gameId}
      >
      
      </Matchitem>
      ))}
      </>
      ):(
      <><p>Sem partidas</p></>
      )}
    </S.Wrapper>
  );
};
export default Matches;
