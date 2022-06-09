import React from "react";
import useScout from "../../hooks/riot-hook";
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

const Ranked = () => {
  const { rankedState, scoutState } = useScout();
  var emblem = EmblemUnranked;
  var emblemFlex = EmblemUnranked;
  var soloDuo = false;
  var flex = false;
  if (rankedState.searchCompleted) {
    var data;
    var flexData;

    if (rankedState.ranked[0] != undefined) {
      data = rankedState.ranked[0];
      if (data.queueType == "RANKED_FLEX_SR") {
        data = rankedState.ranked[1];
      }
      soloDuo = true;
    }
    if (rankedState.ranked[1] != undefined) {
      flexData = rankedState.ranked[1];
      if (flexData.queueType == "RANKED_SOLO_5x5") {
        flexData = rankedState.ranked[0];
        flex = true;
      }
      flex = true;
    }

    //set emblem solo/duo
    if (soloDuo) {
      if (data.tier == "IRON") {
        emblem = EmblemIron;
      } else if (data.tier == "BRONZE") {
        emblem = EmblemBronze;
      } else if (data.tier == "SILVER") {
        emblem = EmblemSilver;
      } else if (data.tier == "GOLD") {
        emblem = EmblemGold;
      } else if (data.tier == "PLATINUM") {
        emblem = EmblemPlatinum;
      } else if (data.tier == "DIAMOND") {
        emblem = EmblemDiamond;
      } else if (data.tier == "MASTER") {
        emblem = EmblemMaster;
      } else if (data.tier == "GRANDMASTER") {
        emblem = EmblemGrandmaster;
      } else if (data.tier == "CHALLENGER") {
        emblem = EmblemChallenger;
      }
    }
    // set emblem flex
    if (flex) {
      if (flexData.tier == "IRON") {
        emblemFlex = EmblemIron;
      } else if (flexData.tier == "BRONZE") {
        emblemFlex = EmblemBronze;
      } else if (flexData.tier == "SILVER") {
        emblemFlex = EmblemSilver;
      } else if (flexData.tier == "GOLD") {
        emblemFlex = EmblemGold;
      } else if (flexData.tier == "PLATINUM") {
        emblemFlex = EmblemPlatinum;
      } else if (flexData.tier == "DIAMOND") {
        emblemFlex = EmblemDiamond;
      } else if (flexData.tier == "MASTER") {
        emblemFlex = EmblemMaster;
      } else if (flexData.tier == "GRANDMASTER") {
        emblemFlex = EmblemGrandmaster;
      } else if (flexData.tier == "CHALLENGER") {
        emblemFlex = EmblemChallenger;
      }
    }
  }

  return (
    <S.Wrapper>
      {rankedState.searchCompleted ? (
        <S.WrapperColumn>
          {soloDuo ? (
            <S.SoloDuo>
              <h1>Solo/Duo</h1>
              <S.SoloDuoData>
                <S.EmblemAndData>
                  <img src={emblem} width="168" />
                  <S.TierAndPdl>
                    <span>
                      {data.tier} {data.rank}
                    </span>
                    <span>{data.leaguePoints} PDLs</span>
                  </S.TierAndPdl>
                </S.EmblemAndData>
                <S.WinRate>
                  <span>
                    V {data.wins} D {data.losses}
                  </span>
                  <hr />
                  <span>
                    {Math.round((data.wins / (data.wins + data.losses)) * 100)}%
                    WR
                  </span>
                </S.WinRate>
              </S.SoloDuoData>
            </S.SoloDuo>
          ) : (
            <S.SoloDuo>
              <h1>Solo/Duo</h1>
              <S.EmblemAndData>
                <img src={emblem} width="236" />
                <S.TierAndPdl>
                  <span>Unranked</span>
                </S.TierAndPdl>
              </S.EmblemAndData>
            </S.SoloDuo>
          )}

          {flex ? (
            <S.Flex>
              <h1>Flex</h1>
              <S.FlexData>
                <S.EmblemAndData>
                  <img src={emblemFlex} width="117" />
                  <S.TierAndPdl>
                    <span>
                      {flexData.tier} {flexData.rank}
                    </span>
                    <span>{flexData.leaguePoints} PDLs</span>
                  </S.TierAndPdl>
                </S.EmblemAndData>
                <S.WinRate>
                  <span>
                    V {flexData.wins} D {flexData.losses}
                  </span>
                  <span>
                    {Math.round(
                      (flexData.wins / (flexData.wins + flexData.losses)) * 100
                    )}
                    % WR
                  </span>
                </S.WinRate>
              </S.FlexData>
            </S.Flex>
          ) : (
            <S.Flex>
              <h1>Flex</h1>
              <S.EmblemAndData>
                <img src={emblemFlex} width="185" />
                <S.TierAndPdl>
                  <span>Unranked</span>
                </S.TierAndPdl>
              </S.EmblemAndData>
            </S.Flex>
          )}
        </S.WrapperColumn>
      ) : (
        <></>
      )}
    </S.Wrapper>
  );
};

export default Ranked;
