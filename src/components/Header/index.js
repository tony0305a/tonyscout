import React from "react";
import * as S from "./styled"

const Header = () =>{

    return(
        <S.Wrapper>
        <S.Form>
        <input type="text" placeholder="Pesquise o nome invocador"/>
        <button type="submit">Pesquisar</button>
        </S.Form>
        </S.Wrapper>
    )

}
export default Header