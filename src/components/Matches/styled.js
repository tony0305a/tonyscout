import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height:580px;
  overflow:scroll;
  flex-wrap: wrap;
  border-radius: 8px;
  background-color: white;
  &::-webkit-scrollbar{
    display:none;

}
li{
  list-style-type: none;
}
@media screen and (max-width: 600px){
    width:100%;
}
`;
export const Header = styled.div`
  display:flex;
  flex-direction:column;
  width: 100%;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  height: 580px;
  margin:8px;
  padding:8px;
  h1 {
    display: flex;
    color: white;
    height:40px;
    align-items:center;
    background-color:purple;
    border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  }
`;
export const SingleMatch = styled.div`
width:100%;

`;