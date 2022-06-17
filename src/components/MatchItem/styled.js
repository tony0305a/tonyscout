import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid black;
`;
export const Champion = styled.img`
  border-radius: 50%;
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
`;
export const ColunmChampion = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  align-items: flex-start;
  padding: 8px;
`;
export const ColunmParticipants = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  align-items: flex-start;
  height: 130px;
  flex-wrap: wrap;
`;
export const ColunmScore = styled.div`
  display: flex;
  flex-direction: column;
  width: 48px;
  align-items: center;
  padding: 8px;
`;
export const ColunmBuild = styled.div`
  display: flex;
  flex-direction: column;
  width: 240px;
  align-items: flex-start;
  padding: 8px;
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
`;
export const Runes = styled.div`
  display: flex;
  flex-direction: column;
  img {
    border-radius: 40%;
  }
`;
export const Line = styled.div`
  display: flex;
`;
export const UpperLine = styled.div`
  display: flex;
  height: 80px;
`;

export const MatchParticipantsWrapper = styled.div`
  display: flex;
  height: 10px;
  margin: 8px;
  justify-content: center;
  align-items: center;
  span {
    font-size: 14px;
    width: 150px;
    cursor: pointer;
    margin-left: 4px;
  }
`;
