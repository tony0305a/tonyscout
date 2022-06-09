import React from "react";
import * as S from "./styled";
import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en.json";

const ActiveMatch = ({
  queue,
  startTime,
  player1,
  player1Icon,
  player1Summonerspell1,
  player1Summonerspell2,
  player1Rune1,
  player1Rune2,
  player1Rune3,
  player1Rune4,
  player1Rune5,
  player1Rune6,
  player1Rune7,
  player1Rune8,
  player1Rune9,
  player2,
  player3,
  player4,
  player5,
  player6,
  player7,
  player8,
  player9,
  player10,
  player1ChamPicture,
  player2ChamPicture,
  player3ChamPicture,
  player4ChamPicture,
  player5ChamPicture,
  player6ChamPicture,
  player7ChamPicture,
  player8ChamPicture,
  player9ChamPicture,
  player10ChamPicture,

  ss2,
}) => {
  return (
    <S.Wrapper>
      <S.Metadata>
        <span>{queue}</span>
        <span>
          started:{" "}
          <ReactTimeAgo date={startTime} locale="pt-BR" timeStyle="round" />
        </span>
      </S.Metadata>
      <S.Teams>
        <S.Blueside>
          <S.IndividualData>
            <S.PlayerInfo>
            <span>{player1}</span>
            <img src={player1Icon} width="28"/>
            </S.PlayerInfo>
              <S.HeroAndSummoner>
            <img src={player1ChamPicture} width="28"/>
            <div>
            <img src={player1Summonerspell1} width="14"/>
            <img src={player1Summonerspell2} width="14"/>
            </div>
            </S.HeroAndSummoner>
          <S.Runes>
            <div>
            <img src={player1Rune1} width="14"/>
            <img src={player1Rune2} width="14"/>
            <img src={player1Rune3} width="14"/>
            <img src={player1Rune4} width="14"/>
            </div>
            <div>
            <img src={player1Rune5} width="14"/>
            <img src={player1Rune6} width="14"/>
            </div>
            <div>
            <img src={player1Rune7} width="14"/>
            <img src={player1Rune8} width="14"/>
            <img src={player1Rune9} width="14"/>
            </div>
            </S.Runes>
          </S.IndividualData>
          <span>{player2}</span>
          <span>{player3}</span>
          <span>{player4}</span>
          <span>{player5}</span>
        </S.Blueside>
        <S.Redside>
          <span>{player6}</span>
          <span>{player7}</span>
          <span>{player8}</span>
          <span>{player9}</span>
          <span>{player10}</span>
        </S.Redside>
      </S.Teams>
    </S.Wrapper>
  );
};
export default ActiveMatch;
