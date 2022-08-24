import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  margin-top: 8px;
  margin-left:8px;
`;
export const Bar = styled.div`
  width: 16px;
  border-radius: 8px;
  border-bottom-right-radius: 0px;
  border-top-right-radius: 0px;
  height:100%;
`;
export const Outbar = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Line = styled.div`
  display: flex;
`;
export const SelfChampionImg = styled.div`
margin-left:8px;
  img {
    border-radius: 50%;
  }
  span {
    position: relative;
    left: -15px;
    background-color: black;
    color: white;
    border-radius: 30%;
    font-size: 16px;
  }
`;
export const Spells = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  left: -8px;
  img {
    border-radius: 8px;
    margin-top: 4px;
  }
`;
export const Runes = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const SecondaryRuneLine = styled.div`
  display: flex;
`;
export const KDA = styled.div`
  margin-left: 8px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;
export const Metadata = styled.div`
  display: flex;
  flex-direction:column;
  margin-inline:4px;
`;
export const Build = styled.div`
  display: flex;
  margin-inline:4px;
  img {
    width: 28px;
    height: 28px;
  }
`;
export const Playerinfos = styled.div`
display:flex;
`;
