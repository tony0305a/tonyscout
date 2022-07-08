import React from "react";
import { FeaturedGamePlayer } from "./FeaturedGamePlayer";
import * as S from './styled'
export const FeaturedGames = ({name,elo}) =>{
    return(
        <S.Wrapper>
            <FeaturedGamePlayer name={name} elo={elo}  />
        </S.Wrapper>
    )
}