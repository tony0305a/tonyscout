import React, { createContext, useState, useCallback } from "react";
import api from "../services/api";
import matchApi from "../services/matchs-api";

export const RiotContext = createContext({
  loading: false,
});

const RiotProvider = ({ children }) => {
  const [scoutState, setScoutState] = useState({
    hasUser: false,
    id: undefined,
    name: undefined,
    puuid: undefined,
    summonerLevel: undefined,
    profileIconId: undefined,
  });
  const [version, setVersion] = useState();
  const [championState, setChampionState] = useState();
  const [masteriesState, setMastertiesState] = useState({
    hasSearch: false,
    maestrias: undefined,
  });
  const [rankedState, setRankedState] = useState({
    searchCompleted: false,
    ranked: undefined,
  });
  const [matchState, setMatchState] = useState({
    searchCompleted: false,
    matches: [],
  });
  const [matchDataState, setMatchDataState] = useState([]);
  const [renderState, setRenderState] = useState(Boolean);
  const [graphState, setGraphState] = useState([]);
  const [graphSlot1State, setGraphSlot1State] = useState([])
  const [graphSlot2State, setGraphSlot2State] = useState([])
  const getSummoner = (name) => {
    api
      .get(
        `lol/summoner/v4/summoners/by-name/${name}?api_key=RGAPI-3ff69f05-592c-43e4-b1d8-b6a1b5159f56`
      )
      .then((respose) =>
        setScoutState({
          hasUser: true,
          id: respose.data.id,
          name: respose.data.name,
          puuid: respose.data.puuid,
          summonerLevel: respose.data.summonerLevel,
          profileIconId: respose.data.profileIconId,
        })
      );
  };

  const getVersion = () => {
    fetch("https://ddragon.leagueoflegends.com/api/versions.json")
      .then((response) => response.text())
      .then((x) => setVersion(JSON.parse(x)[0]));
  };

  const getChampionInfo = (version) => {
    if(version != undefined){
    fetch(
      `http://ddragon.leagueoflegends.com/cdn/${version}/data/pt_BR/champion.json`
    )
      .then((response) => response.text())
      .then((x) => setChampionState(JSON.parse(x)));
    }
  };

  const getMasteries = (id) => {
    api
      .get(
        `lol/champion-mastery/v4/champion-masteries/by-summoner/${id}?api_key=RGAPI-3ff69f05-592c-43e4-b1d8-b6a1b5159f56`
      )
      .then((response) =>
        setMastertiesState({
          hasSearch: true,
          maestrias: response.data,
        })
      );
  };

  const getRanked = (encryptedSummonerId) => {
    api
      .get(
        `lol/league/v4/entries/by-summoner/${encryptedSummonerId}?api_key=RGAPI-3ff69f05-592c-43e4-b1d8-b6a1b5159f56`
      )
      .then((respone) =>
        setRankedState({
          searchCompleted: true,
          ranked: respone.data,
        })
      );
  };

  const getMatches = (puuid) => {
    matchApi
      .get(
        `lol/match/v5/matches/by-puuid/${puuid}/ids?queue=420&?start=0&count=30&api_key=RGAPI-3ff69f05-592c-43e4-b1d8-b6a1b5159f56`
      )
      .then((response) =>
        setMatchState({
          searchCompleted: true,
          matches: response.data,
        })
      );
  };

  const getMatchData = (id) => {
    matchApi
      .get(
        `lol/match/v5/matches/${id}?api_key=RGAPI-3ff69f05-592c-43e4-b1d8-b6a1b5159f56`
      )
      .then((response) =>
        setMatchDataState((prevState) => [...prevState, response.data])
      );
  };
  const cleanMatchData = () => {
    setMatchDataState([]);
  };
  const setRender = (bool) => {
    setRenderState(bool);
  };
  const setGraphs = (array) =>{
    setGraphState(array)
  }
  const setSlot1Graph = (array) =>{
    setGraphSlot1State(array)
  }
  const setSlot2Graph = (array) =>{
    setGraphSlot2State(array)
  }

  const contextValue = {
    scoutState,
    version,
    masteriesState,
    championState,
    rankedState,
    matchState,
    matchDataState,
    renderState,
    graphState,
    graphSlot1State,
    graphSlot2State,
    getSummoner: useCallback((name) => getSummoner(name), []),
    getVersion: useCallback((version) => getVersion(version), []),
    getChampionInfo: useCallback(() => getChampionInfo(), []),
    cleanMatchData: useCallback(() => cleanMatchData(), []),
    getMasteries: useCallback((id) => getMasteries(id), []),
    getRanked: useCallback(
      (encryptedSummonerId) => getRanked(encryptedSummonerId),
      []
    ),
    getMatches: useCallback((puuid) => getMatches(puuid), []),
    getMatchData: useCallback((id) => getMatchData(id), []),
    setRender: useCallback((bool) => setRender(bool), []),
    setGraphs: useCallback((array) => setGraphs(array), []),
    setSlot1Graph: useCallback((array) => setSlot1Graph(array), []),
    setSlot2Graph: useCallback((array) => setSlot2Graph(array), []),
  };
  return (
    <RiotContext.Provider value={contextValue}>{children}</RiotContext.Provider>
  );
};

export default RiotProvider;
