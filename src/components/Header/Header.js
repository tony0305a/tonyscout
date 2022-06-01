import React, { useEffect } from "react";
import { useState } from "react";
import { version } from "styled-components";
import useScout from "../../hooks/riot-hook";
import * as S from "./styled"

const Header = () =>{
    const {  getSummoner, getVersion, version, getMasteries, scoutState
    , championState, getChampionInfo } = useScout()




    const [searchSummoner, setSearchSummoner] = useState()

    const findSummoner = () => {     
         getSummoner(searchSummoner)
         getVersion()

    }
    useEffect(()=>{
        if(scoutState.hasUser){
            getMasteries(scoutState.id)
        }

    },[scoutState])

    return(
        <S.Wrapper>
            <span>{version}</span>
        <S.Form>
        <input type="text" placeholder="Pesquise o nome invocador"
        onChange={(event)=> setSearchSummoner(event.target.value)}
        />
        <button type="submit" onClick={findSummoner}>Pesquisar</button>
        </S.Form>
        </S.Wrapper>
    )

}
export default Header