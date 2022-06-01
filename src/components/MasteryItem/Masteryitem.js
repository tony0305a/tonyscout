import React from "react";
import * as S from './styled'
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import en from 'javascript-time-ago/locale/en.json'
TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(en)
const MasteryItem = ({pic, championLevel, championPoints, lastPlayTime}) => {

    return(
        <S.Wrapper>
            <S.M>
            <img src={pic} width="64"/>
            <span>M{championLevel}</span>
            <span>{championPoints}</span>
            <ReactTimeAgo date={lastPlayTime} locale="pt-BR" timeStyle="round" />
            </S.M>
        </S.Wrapper>
    )

}
export default MasteryItem