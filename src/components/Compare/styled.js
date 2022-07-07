import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px;
  justify-content: center;
  width: 100%;
  background-color: white;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
`;
export const Head = styled.div`
  display: flex;
  h1 {
    background-color: purple;
    color: white;
    padding: 8px;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    width: 100%;
  }
`;
export const Body = styled.div`
  display: flex;
  @media screen and (max-width: 600px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
export const Slot1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 8px;
  width: 50%;
  button {
    background-color: purple;
    color: white;
    padding: 4px;
    border-radius: 4px;
  }
`;
export const Slot2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 8px;
  width: 50%;
  button {
    background-color: purple;
    color: white;
    padding: 4px;
    border-radius: 4px;
  }
`;
export const SlotCompare = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 8px;
  width: 50%;
  button {
    background-color: purple;
    color: white;
    padding: 4px;
    border-radius: 4px;
  }
`;
