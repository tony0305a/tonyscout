import React, { useEffect, useState } from "react";
import useScout from "../../hooks/riot-hook";
import * as S from "./styled";
export const Tracker = () => {
  const { scoutState, getSummonerToTrack, trackerState, version } = useScout();
  const [trackSearch, setTrackSearch] = useState();
  const [trackedSummoners, setTrackedSummoners] = useState([]);
  const [renderStorage,setRenderStorage] = useState()
  const profileIcon = `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${trackerState.profileIconId}.png`;
  const track = () => {
    getSummonerToTrack(trackSearch);
  };
  useEffect(() => {
    if (trackerState.id){
        setTrackedSummoners((prev)=>[...prev,trackerState])
      
    }
  }, [trackerState]);
  useEffect(()=>{
    sessionStorage.setItem('item',JSON.stringify(trackedSummoners))
  },[trackedSummoners])

  const call = () => {
    console.log(trackedSummoners)
   setRenderStorage(JSON.parse(sessionStorage.getItem('item')))
   console.log(renderStorage)

  };
  const cleann = () => {
    sessionStorage.clear()
  };
  return (
    <S.Wrapper>
      <h1>Tracker</h1>
      <button onClick={call}>call</button>
      <button onClick={cleann} >clean</button>
      <S.Form>
        <input
          type="text"
          placeholder="Track a summoner"
          onChange={(event) => setTrackSearch(event.target.value)}
        />
        <button onClick={track}>Pesquisar</button>
      </S.Form>
        <S.TrackedData>
          <S.SummonerData>
            <span>{trackerState.summonerName}</span>
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${trackerState.profileIconId}.png`}
              width="48"
            />
            <span>{trackerState.summonerLevel}</span>
          </S.SummonerData>
        </S.TrackedData>
    </S.Wrapper>
  );
};
