import React, { createContext, useState } from "react";

const RiotContext = createContext();


const RiotProvider = ({children}) => {
const [scoutState, setScoutState] = useState()


    const contextValue = {
        scoutState,
    }

    return(
        <RiotContext.Provider value={contextValue}>
            {children}
        </RiotContext.Provider>
    )

}

export default RiotProvider