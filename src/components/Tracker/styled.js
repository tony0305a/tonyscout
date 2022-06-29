import styled from "styled-components";

export const Wrapper = styled.div`
h1{
    background-color:purple;
    color:white;
    padding:8px;
    border-top-left-radius:4px;
    border-top-right-radius:4px;
}
display:flex;
flex-direction:column;
`;
export const Form = styled.div`
display:flex;
margin-top:4px;
border:1px solid black;
input{
    display:flex;
    flex-grow:2;

}
button{
    background-color:purple;
    color:white;
    padding:8px;
}
`;
export const TrackedData = styled.div`
display:flex;
margin:4px;
border:1px solid black;

`;
export const SummonerData = styled.div`
display:flex;
flex-direction:column;
justify-content:center; 
align-items:center;
img{
    border-radius:50%;
}
span{
    background-color:purple;
    color:white;
    padding:2px;
    border-radius:4px;
}
`;