import React from "react";
import { useState } from "react";
import * as S from "./styled"
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import en from 'javascript-time-ago/locale/en.json'
import useScout from "../../hooks/riot-hook";
TimeAgo.addLocale(en)

const Matchitem = ({id,gameMode,creationTime,champPic,player1,player2,player3,player4,player5,
    player6,player7,player8,player9,player10,kills,deaths,assists}) => {



    return(
        <S.Wrapper>
            <S.Metadata>
            <span>{id}</span>
            <span>{gameMode}</span>
            <ReactTimeAgo date={creationTime} locale="pt-BR" timeStyle="round"/>
            </S.Metadata>



            <S.Individual>
            <img src={champPic}/>
            <span>{kills} /{deaths}/{assists}</span>
            </S.Individual>
            
            <S.Sides>
            <S.BlueSide>
            <span>{player1}</span>
            <span>{player2}</span>
            <span>{player3}</span>
            <span>{player4}</span>          
            <span>{player5}</span>
            </S.BlueSide>
            <S.RedSide>
            <span>{player6}</span>
            <span>{player7}</span>
            <span>{player8}</span>
            <span>{player9}</span>
            <span>{player10}</span>
            </S.RedSide>
            </S.Sides>


        </S.Wrapper>
    )

}
export default Matchitem