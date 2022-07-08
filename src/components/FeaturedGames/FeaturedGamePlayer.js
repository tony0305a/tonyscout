import React from "react";
import * as S from './styled'

export const FeaturedGamePlayer = ({name,elo}) =>{
    return(
        <>
        <span>{name}</span>
        <span>{elo}</span>
        </>
    )
}