import React from "react";
import { Link } from "react-router-dom";
import useScout from "../../hooks/riot-hook";
import * as S from "./styled";
const MatchitemParticipants = ({ blueSide, redSide, champ, version }) => {
  const { getSummoner, setRender, cleanMatchsFromDatabase } = useScout();
  const call = () => {
    cleanMatchsFromDatabase();
    setRender(false);
    console.log(blueSide);
  };

  /*   
            champ={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${getChampName(
            item.championId
            )}`}        
    */

  const getChampName = (cid) => {
    var hero = champ.info.data;
    for (var i in hero) {
      if (hero[i].key == cid) {
        return hero[i].image.full;
      }
    }
  };

  return (
    <S.MatchParticipantsWrapper>
      <S.Blueside>
        {blueSide.map((item, index) => (
          <S.Teams key={index}>
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${getChampName(
                item.championId
              )}`}
              width="24"
              height="24"
            />
            <Link to={`/${item.summonerName}`}>
              <span>{item.summonerName}</span>
            </Link>
          </S.Teams>
        ))}
      </S.Blueside>
      <S.Blueside>
        {redSide.map((item, index) => (
          <S.Teams key={index}>
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${getChampName(
                item.championId
              )}`}
              width="24"
              height="24"
            />
            <Link to={`/${item.summonerName}`}>
              <span>{item.summonerName}</span>
            </Link>
          </S.Teams>
        ))}
      </S.Blueside>
    </S.MatchParticipantsWrapper>
  );
};
export default MatchitemParticipants;
