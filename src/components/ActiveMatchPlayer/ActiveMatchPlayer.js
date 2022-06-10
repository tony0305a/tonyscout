import React from "react";
import * as S from "./styled";

const ActiveMatchPlayer = ({
  summonerName,
  summonerIcon,
  championImage,
  summonerSpell1,
  summonerSpell2,
  primaryRune1,
  primaryRune2,
  primaryRune3,
  primaryRune4,
  secondaryRune1,
  secondaryRune2,
  statMod1,
  statMod2,
  statMod3,
  elo,
  elo2,
}) => {
  return (
    <S.Wrapper>

      <S.PlayerData>
        <span>{summonerName}</span>
        <img src={summonerIcon} width="56" />
      </S.PlayerData>
      <S.HeroData>
        <img src={championImage} width="56" />
        <div>
          <img src={summonerSpell1} width="24" />
          <img src={summonerSpell2} width="24" />
        </div>
      </S.HeroData>

      <S.Runes>
        <div>
          <img src={statMod1} width="24" />
          <img src={statMod2} width="24" />
          <img src={statMod3} width="24" />
        </div>
        <div>
          <img src={primaryRune1} width="32" />
          <img src={primaryRune2} width="24" />
          <img src={primaryRune3} width="24" />
          <img src={primaryRune4} width="24" />
        </div>

        <div>
          <img src={secondaryRune1} width="32" />
          <img src={secondaryRune2} width="24" />
        </div>
      </S.Runes>
      <S.Elo>
        <span>{elo}</span>
      </S.Elo>
    </S.Wrapper>
  );
};
export default ActiveMatchPlayer;
