import React, { useEffect, useState } from "react";
import * as S from "./styled";
import EmblemUnranked from "../../imgs/Emblem_Unranked.png";
import EmblemIron from "../../imgs/Emblem_Iron.png";
import EmblemBronze from "../../imgs/Emblem_Bronze.png";
import EmblemSilver from "../../imgs/Emblem_Silver.png";
import EmblemGold from "../../imgs/Emblem_Gold.png";
import EmblemPlatinum from "../../imgs/Emblem_Platinum.png";
import EmblemDiamond from "../../imgs/Emblem_Diamond.png";
import EmblemMaster from "../../imgs/Emblem_Master.png";
import EmblemGrandmaster from "../../imgs/Emblem_Grandmaster.png";
import EmblemChallenger from "../../imgs/Emblem_Challenger.png";

const RankedNew = ({ soloQueue, flexQueue }) => {
  var emblem = EmblemUnranked;
  var emblemFlex = EmblemUnranked;


  
  if(soloQueue !== undefined){
  if (soloQueue.tier == "IRON") {
    emblem = EmblemIron;
  } else if (soloQueue.tier == "BRONZE") {
    emblem = EmblemBronze;
  } else if (soloQueue.tier == "SILVER") {
    emblem = EmblemSilver;
  } else if (soloQueue.tier == "GOLD") {
    emblem = EmblemGold;
  } else if (soloQueue.tier == "PLATINUM") {
    emblem = EmblemPlatinum;
  } else if (soloQueue.tier == "DIAMOND") {
    emblem = EmblemDiamond;
  } else if (soloQueue.tier == "MASTER") {
    emblem = EmblemMaster;
  } else if (soloQueue.tier == "GRANDMASTER") {
    emblem = EmblemGrandmaster;
  } else if (soloQueue.tier == "CHALLENGER") {
    emblem = EmblemChallenger;
  }
}
  if(flexQueue !== undefined){
  if (flexQueue.tier == "IRON") {
    emblemFlex = EmblemIron;
  } else if (flexQueue.tier == "BRONZE") {
    emblemFlex = EmblemBronze;
  } else if (flexQueue.tier == "SILVER") {
    emblemFlex = EmblemSilver;
  } else if (flexQueue.tier == "GOLD") {
    emblemFlex = EmblemGold;
  } else if (flexQueue.tier == "PLATINUM") {
    emblemFlex = EmblemPlatinum;
  } else if (flexQueue.tier == "DIAMOND") {
    emblemFlex = EmblemDiamond;
  } else if (flexQueue.tier == "MASTER") {
    emblemFlex = EmblemMaster;
  } else if (flexQueue.tier == "GRANDMASTER") {
    emblemFlex = EmblemGrandmaster;
  } else if (flexQueue.tier == "CHALLENGER") {
    emblemFlex = EmblemChallenger;
  }
}


if(soloQueue === undefined){
  return <h1>Loading...</h1>
}

  return (
    <S.Wrapper>
      <S.WrapperColumn>
      <S.SoloDuo>
        <h1>Solo/Duo</h1>
        <S.SoloDuoData>
          <S.EmblemAndData>
            <img src={emblem} width="168" />
            <S.TierAndPdl>
              <span>
                {soloQueue.tier} {soloQueue.rank}{" "}
              </span>
              <span>{soloQueue.leaguePoints} PDLS</span>
            </S.TierAndPdl>
          </S.EmblemAndData>
          <S.WinRate>
            <span>
              {" "}
              V {soloQueue.wins} D {soloQueue.losses}{" "}
            </span>
            <hr />
            <span>
              {Math.round(
                (soloQueue.wins / (soloQueue.wins + soloQueue.losses)) * 100
              )}
              %WR
            </span>
          </S.WinRate>
        </S.SoloDuoData>
      </S.SoloDuo>
      <S.Flex>
        <h1>Flex</h1>
        <S.FlexData>
          <S.EmblemAndData>
            <img src={emblemFlex}  height="130" width="168" />
            <S.TierAndPdl>
              <span>
                {flexQueue.tier} {flexQueue.rank}
              </span>
              <span>{flexQueue.leaguePoints} PDLs</span>
            </S.TierAndPdl>
          </S.EmblemAndData>
          <S.WinRate>
            <span>
              V {flexQueue.wins} D {flexQueue.losses}
            </span>
            <span>
              {Math.round(
                (flexQueue.wins / (flexQueue.wins + flexQueue.losses)) * 100
              )}
              % WR
            </span>
          </S.WinRate>
        </S.FlexData>
      </S.Flex>
      </S.WrapperColumn>
    </S.Wrapper>
  );
};

export default RankedNew;
