import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  height: 400px;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

export const WrapperColumn = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

export const SoloDuo = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 235px;
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  h1 {
    background-color: purple;
    color: white;
    padding: 8px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;
export const SoloDuoData = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 600px) {
    justify-content: space-around;
  }
`;
export const EmblemAndData = styled.div`
  display: flex;
`;
export const TierAndPdl = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    background-color: purple;
    color: white;
    margin: 4px;
    padding: 4px;
    border-radius: 8px;
  }
`;

export const WinRate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 8px;
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 400px;
  height: 168px;
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  @media screen and (max-width: 600px) {
    width: 100%;
  }

  h1 {
    background-color: purple;
    color: white;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    padding: 8px;
  }
`;

export const FlexData = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 600px) {
    justify-content: space-around;
  }
`;
