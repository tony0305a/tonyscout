import React, { useEffect, useState } from "react";
import useScout from "../../hooks/riot-hook";
import * as S from "./styled";
export const Tracker = () => {
  const { scoutState, getSummonerToTrack, trackerState, version } = useScout();
  const [trackSearch, setTrackSearch] = useState();
  const [trackedSummoners, setTrackedSummoners] = useState([]);
  const [renderStorage, setRenderStorage] = useState(false);
  const profileIcon = `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${trackerState.profileIconId}.png`;
  const track = () => {
    getSummonerToTrack(trackSearch);
  };
  useEffect(()=>{

    console.log(JSON.parse(window.localStorage.getItem('item')))
    setTrackedSummoners(JSON.parse(window.localStorage.getItem('item')))

  },[])

  useEffect(() => {

    if (trackerState.id !== 0) {

        setTrackedSummoners((prev)=>[...prev,trackerState])
   
    }

  }, [trackerState]);
  useEffect(() => {
    if(trackedSummoners.length !== 0){
    window.localStorage.setItem('item',JSON.stringify(trackedSummoners))
    setRenderStorage(true)
    }

  }, [trackedSummoners]);

  const call = () => {

    console.log(trackedSummoners)
  };
  const cleann = () => {
    window.localStorage.clear();
  };


  return (
    <S.Wrapper>
      <h1>Tracker</h1>
      <S.Form>
        <input
          type="text"
          placeholder="Track a summoner"
          onChange={(event) => setTrackSearch(event.target.value)}
        />
        <button onClick={track}>Pesquisar</button>
      </S.Form>
    {renderStorage?(<>
    
            {trackedSummoners.map((item,index)=>(
                      <S.TrackedData key={index} >
                      <S.SummonerData>
                        <span>{item.summonerName}</span>
                        <img
                          src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${item.profileIconId}.png`}
                          width="48"
                        />
                        <span>{item.summonerLevel}</span>
                      </S.SummonerData>
                    </S.TrackedData>
        ))}</>):(<><p>sem nd</p></>)}
        




    </S.Wrapper>
  );
};
