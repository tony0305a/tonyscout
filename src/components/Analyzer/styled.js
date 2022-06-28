import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  background-color: white;
  flex-direction: column;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  height:400px;
  margin:8px;
  span {
    background-color: purple;
    color: white;
    padding: 8px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
`;
export const GraphRoles = styled.div`
display:flex;
align-items:center;
justify-content:center;
width:100%;
`;
export const Roles = styled.div`
  display: flex;
  justify-content:space-around;
`;
export const Graph = styled.div`
  display: flex;
`;
export const HardData = styled.div`
display:flex;
flex-direction:column;
padding: 8px;

`;