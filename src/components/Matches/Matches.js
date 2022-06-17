import React, { useLayoutEffect } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getTTFB } from "web-vitals";
import useScout from "../../hooks/riot-hook";
import matchApi from "../../services/matchs-api";
import Matchitem from "../MatchItem/Matchitem";

const Matches = () => {
  const {
    scoutState,
    matchDataState,
    cleanMatchData,
    matchState,
    version,
    renderState,
    setRender,
  } = useScout();
  const [champion, setChampion] = useState();
  const [queue, setQueue] = useState();
  const [summonerSpell, setSummonerSpell] = useState();
  const [runes, setRunes] = useState();

    useLayoutEffect(()=>{
      return () => {
      }
    },[scoutState])

  useEffect(() => {
    //mount
    console.log("montou");
    console.log("fez alguma coisa");
    //unmount
    return function CleanUp() {
      console.log("desmontou");
    };
  }, []);

  useEffect(()=>{
    fetch(`http://ddragon.leagueoflegends.com/cdn/${version}/data/pt_BR/champion.json`)
    .then((response) => response.text())
    .then((x) => setChampion(JSON.parse(x)))
    setRender(true)

    return function cleanUp(){
   //   cleanMatchData()
    }
  },[matchState])

  useEffect(() => {
    console.log("att scoutState");

    return function cleanUp() {
      console.log("cleanUp scoutState");
    };
  }, [scoutState]);

  const call = () => {
    matchDataState.map((item) => {
      console.log(item);
      console.log(getIndex(item));
    });
  };
  const getIndex = (item) => {
    for (var i in item.info.participants) {
      if (item.info.participants[i].summonerId == scoutState.id) {
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
        return queue[i].description;
      }
    }
  };

  if(matchDataState == undefined){
    return <><p>Loading...</p>      <button onClick={call}>Call</button></>
  }

  return (
    <>

      {scoutState.hasUser ? (
        <>
          {renderState ? (
            <>
              {matchDataState.map((item) => (
                <Matchitem
                  creationTime={item.info.gameCreation}
                  gameMode={getQueue(item.info.queueId)}
                  id={item.metadata.matchId}
                  champPic={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${getChampName(
                    item.info.participants[getIndex(item)].championId
                  )}`}
                ></Matchitem>
              ))}
            </>
          ) : (
            <>
              <p>nada</p>
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};
export default Matches;
