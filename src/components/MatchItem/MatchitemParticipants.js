import React from "react";
import useScout from "../../hooks/riot-hook";
import * as S from "./styled";
const MatchitemParticipants = ({ name, champ }) => {
  const { version, championState, getSummoner, setRender } = useScout();
  const call = () => {
    getSummoner(name);
    setRender(false);
  };
  
  return (
    <S.MatchParticipantsWrapper>
      <img src={champ} width="24" height="24" />
      <span onClick={call}>{name}</span>
    </S.MatchParticipantsWrapper>
  );
};
export default MatchitemParticipants;
