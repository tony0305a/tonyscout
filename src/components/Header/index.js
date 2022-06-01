import React from "react";
import { useState } from "react";
import useScout from "../../hooks/riot-hook";
import * as S from "./styled"

const Header = () =>{

    const {  getSummoner } = useScout()
    const [searchSummoner, setSearchSummoner] = useState()

    const findSummoner = () => {
        
        return getSummoner(searchSummoner)
  
    }


    return(
        <S.Wrapper>
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