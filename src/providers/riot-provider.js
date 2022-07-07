import React, { createContext, useState, useCallback } from "react";
import apiHeader from "../services/apiHeader";

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
  const [graphSlot1State, setGraphSlot1State] = useState([]);
  const [graphSlot2State, setGraphSlot2State] = useState([]);
  const [trackerState, setTrackerState] = useState({
    searchCompleted: false,
    id: 0,
    puuid: 0,
    summonerName: "name",
    summonerLevel: 0,
    profileIconId: 0,
  });
  const [matchDataStateDb, setMatchDataStateDb] = useState([]);
  const getSummoner = (name) => {
    apiHeader.get(`summoner/${name}`).then((respose) =>
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
  const getSummonerToTrack = (name) => {
    apiHeader.get(`/${name}`).then((respose) =>
      setTrackerState({
        searchCompleted: true,
        id: respose.data.id,
        summonerName: respose.data.name,
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
    if (version !== undefined) {
      fetch(
        `http://ddragon.leagueoflegends.com/cdn/${version}/data/pt_BR/champion.json`
      )
        .then((response) => response.text())
        .then((x) => setChampionState(JSON.parse(x)));
    }
  };

  const getMasteries = (id) => {
    apiHeader.get(`summoner/masteries/${id}`).then((response) =>
      setMastertiesState({
        hasSearch: true,
        maestrias: response.data,
      })
    );
  };

  const getRanked = (encryptedSummonerId) => {
    apiHeader.get(`ranked/${encryptedSummonerId}`).then((respone) =>
      setRankedState({
        searchCompleted: true,
        ranked: respone.data,
      })
    );
  };

  const getMatches = (puuid, queueId) => {
    apiHeader.get(`matchs-ids/${puuid}/${queueId}`).then((response) =>
      setMatchState({
        searchCompleted: true,
        matches: response.data,
      })
    );
  };

  const getMatchData = (id) => {
    apiHeader
      .get(`matchs-info/${id}`)
      .then((response) =>
        setMatchDataStateDb((prevState) => [...prevState, response.data])
      );
  };

  const getMatchsFromDatabase = (puuid) => {
    apiHeader
      .get(`/matchs/${puuid}`)
      .then((res) => {
        var check = res.data;
        if (check.length === 0) {
          setMatchDataStateDb([]);
        }
        res.data.map((item) => {
          setMatchDataStateDb((prevState) => [...prevState, item.alldata]);
        });
      })
      .catch((error) => {
        throw error;
      });
  };

  const cleanMatchsFromDatabase = () => {
    setMatchDataStateDb([]);
  };

  const cleanMatchData = () => {
    setMatchDataState([]);
  };
  const cleanScoutState = () => {
    setScoutState({
      hasUser: false,
      id: 0,
      name: "name",
      puuid: 0,
      summonerLevel: 0,
      profileIconId: 0,
    });
  };
  const cleanMasteriesState = () => {
    setMastertiesState({ hasSearch: false, maestrias: undefined });
  };
  const cleanRankedState = () => {
    setRankedState({ searchCompleted: false, ranked: undefined });
  };

  const setRender = (bool) => {
    setRenderState(bool);
  };
  const setGraphs = (array) => {
    setGraphState(array);
  };
  const setSlot1Graph = (array) => {
    setGraphSlot1State(array);
  };
  const setSlot2Graph = (array) => {
    setGraphSlot2State(array);
  };

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
    trackerState,
    matchDataStateDb,
    getSummoner: useCallback((name) => getSummoner(name), []),
    getSummonerToTrack: useCallback((name) => getSummonerToTrack(name), []),
    getVersion: useCallback((version) => getVersion(version), []),
    getChampionInfo: useCallback(() => getChampionInfo(), []),
    cleanMatchData: useCallback(() => cleanMatchData(), []),
    cleanScoutState: useCallback(() => cleanScoutState(), []),
    cleanMasteriesState: useCallback(() => cleanMasteriesState(), []),
    cleanRankedState: useCallback(() => cleanRankedState(), []),
    cleanMatchsFromDatabase: useCallback(() => cleanMatchsFromDatabase(), []),
    getMasteries: useCallback((id) => getMasteries(id), []),
    getRanked: useCallback(
      (encryptedSummonerId) => getRanked(encryptedSummonerId),
      []
    ),
    getMatches: useCallback((puuid, queueId) => getMatches(puuid, queueId), []),
    getMatchData: useCallback((id) => getMatchData(id), []),
    getMatchsFromDatabase: useCallback(
      (puuid) => getMatchsFromDatabase(puuid),
      []
    ),
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
