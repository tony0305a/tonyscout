import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  margin-top: 16px;
  width: 800px;
  flex-wrap: wrap;
  border-radius: 8px;
  background-color: white;
`;
export const Header = styled.div`
  width: 100%;
  padding: 8px;
  background-color: purple;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  height: 40px;
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }
`;
