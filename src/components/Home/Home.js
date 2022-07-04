import React from "react";
import apiHeader from "../../services/apiHeader";
import * as S from './styled';
export const Home = () =>{


    const call = () =>{
        apiHeader.get('/tonylee')
        .then((res)=>console.log(res.data))

    }

    return(
        <>
        <S.Wrapper>
            <span>Bem-Vindos(a)s</span>
            <button onClick={call}>Call</button>
        </S.Wrapper>
        </>
    )
}