import React, { createContext, useState, useCallback } from "react";
import api from "../services/api";

export const RiotContext = createContext({
    loading:false,
});


const RiotProvider = ({children}) => {
const [scoutState, setScoutState] = useState({
    id:undefined,
    name:undefined,
    puuid:undefined,
    summonerLevel:undefined,
    profileIconId:undefined,
    })

    const getSummoner = (name) => {
        api.get(`lol/summoner/v4/summoners/by-name/${name}?api_key=RGAPI-3ff69f05-592c-43e4-b1d8-b6a1b5159f56`)
        .then((respose)=>setScoutState({
            id:respose.data.id,
            name:respose.data.name,
            puuid:respose.data.puuid,
            summonerLevel:respose.data.summonerLevel,
            profileIconId:respose.data.profileIconId

        }))
    }



    const contextValue = {
        scoutState,
        getSummoner: useCallback((name) => getSummoner(name), []),
    }

    return(
        <RiotContext.Provider value={contextValue}>
            {children}
        </RiotContext.Provider>
    )

}

export default RiotProvider