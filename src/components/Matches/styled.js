import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction:column;
  width: 45%;
  height:600px;
  border-radius: 8px;
  margin:8px;
  background-color: white;
  border-top-left-radius:4px;
  border-top-right-radius:4px;
h1{
  background-color:purple;
  width:100%;
  padding:8px;
  color:white;
  border-top-left-radius:4px;
  border-top-right-radius:4px;
}
@media screen and (max-width: 600px){
    width:100%;
}
overflow:scroll;
&::-webkit-scrollbar{
    display:none;

}
`;

export const SingleMatch = styled.div`
display:flex;
width:100%;
`;
export const MatchBody = styled.div`
display:flex;
width:100%;
flex-wrap:wrap;
@media screen and (max-width: 600px){
    width:100%;
}
&::-webkit-scrollbar{
    display:none;

}
`;
export const Analyzer = styled.div`
display:flex;
height:220px;
`;