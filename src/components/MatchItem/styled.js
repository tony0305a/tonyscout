import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid black;
  margin-top: 2px;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;
export const Champion = styled.img`
  border-radius: 50%;
  @media screen and (max-width: 600px) {
    width: 48px;
    height: 48px;
  }
`;
export const Colunm = styled.div`
  display: flex;
  flex-direction: column;
`;
export const ColunmMetadata = styled.div`
  display: flex;
  flex-direction: column;
  width: 120px;
  align-items: center;
  padding: 8px;
  @media screen and (max-width: 600px) {
    width: 70px;
    display: flex;
    justify-content: center;
  }
`;
export const ColunmChampion = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  align-items: flex-start;
  padding: 8px;
  @media screen and (max-width: 600px) {
    width: 150px;
  }
`;
export const ColunmParticipants = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  align-items: flex-start;
  height: 130px;
  flex-wrap: wrap;
  @media screen and (max-width: 600px) {
    width:200px;
  }
`;
export const ColunmScore = styled.div`
  display: flex;
  flex-direction: column;
  width: 48px;
  align-items: center;
  padding: 8px;
  @media screen and (max-width: 600px) {
    span {
      width:40px;
      font-size: 16px;
    }
  }
`;
export const ColunmBuild = styled.div`
  display: flex;
  flex-direction: column;
  width: 240px;
  align-items: flex-start;
  padding: 8px;
  img {
    width: 32px;
    height: 32px;
  }
  @media screen and (max-width: 600px) {
    width: 100px;
    img {
      width: 24px;
      height: 24px;
    }
  }
`;
export const ChampionLine = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const SummonerSpells = styled.div`
  display: flex;
  flex-direction: column;
  img {
    border-radius: 40%;
  }
  @media screen and (max-width: 600px) {
    img {
      width: 18px;
      height: 18px;
    }
  }
`;
export const Runes = styled.div`
  display: flex;
  flex-direction: column;
  img {
    border-radius: 40%;
  }
  @media screen and (max-width: 600px) {
    img {
      width: 18px;
      height: 18px;
    }
  }
`;
export const Line = styled.div`
  display: flex;
`;
export const UpperLine = styled.div`
  display: flex;
  height: 100px;
  @media screen and (max-width: 600px) {
    height:70px;
  }
`;
export const LowerLine = styled.div`
  display: flex;
  width: 370px;
`;

export const MatchParticipantsWrapper = styled.div`
  display: flex;
  height: 10px;
  margin: 8px;
  justify-content: center;
  align-items: center;
  span {
    font-size: 12px;
    width: 78px;
    cursor: pointer;
    margin-left: 2px;
    overflow:hidden;
    &:hover {
      color: purple;
    }
  }
  @media screen and (max-width: 600px) {
    margin: 8px;
    height: 8px;
    span {
      font-size: 10px;
      width: 40px;
      overflow: hidden;
    }
  }
`;
export const ColunmGraphs = styled.div`
display:flex;
`;
