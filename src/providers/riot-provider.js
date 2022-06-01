import React, { createContext, useState, useCallback } from "react";
import api from "../services/api";

export const RiotContext = createContext({
    loading:false,
});


const RiotProvider = ({children}) => {
const [scoutState, setScoutState] = useState({
    hasUser:false,
    id:undefined,
    name:undefined,
    puuid:undefined,
    summonerLevel:undefined,
    profileIconId:undefined,
    })
const [version, setVersion] = useState()
const [championState,setChampionState] = useState()
const [masteriesState, setMastertiesState] = useState({
    hasSearch:false,
    maestrias:undefined,
})

    const getSummoner = (name) => {
        api.get(`lol/summoner/v4/summoners/by-name/${name}?api_key=RGAPI-3ff69f05-592c-43e4-b1d8-b6a1b5159f56`)
        .then((respose)=>setScoutState({
            hasUser:true,
            id:respose.data.id,
            name:respose.data.name,
            puuid:respose.data.puuid,
            summonerLevel:respose.data.summonerLevel,
            profileIconId:respose.data.profileIconId

        }))
    }

    const getVersion = () =>{
        fetch('https://ddragon.leagueoflegends.com/api/versions.json')
        .then((response)=>response.text()).then((x)=>setVersion(JSON.parse(x)[0]))
    }

    const getChampionInfo = () => {
        fetch('http://ddragon.leagueoflegends.com/cdn/12.10.1/data/pt_BR/champion.json')
        .then((response)=>response.text()).then((x)=>setChampionState(JSON.parse(x)))
    }

    const getMasteries = (id) => {
        api.get(`lol/champion-mastery/v4/champion-masteries/by-summoner/${id}?api_key=RGAPI-3ff69f05-592c-43e4-b1d8-b6a1b5159f56`)
        .then((response)=>setMastertiesState({
            hasSearch:true,
            maestrias:response.data}))
    }


    const contextValue = {
        scoutState,
        version,
        masteriesState,
        getSummoner: useCallback((name) => getSummoner(name), []),
        getVersion: useCallback(() => getVersion(), []),
        getChampionInfo: useCallback(() => getChampionInfo(), []),
        getMasteries: useCallback((id) => getMasteries(id), []),
    }

    return(
        <RiotContext.Provider value={contextValue}>
            {children}
        </RiotContext.Provider>
    )

}

export default RiotProvider