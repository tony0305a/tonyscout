import styled from "styled-components";

export const Wrapper = styled.div`
display:flex;
justify-content:center;
align-items:center;


`;
export const M = styled.div`
display:flex;
margin:8px;
padding:8px;
width:144px;
flex-direction:column;
justify-content:center;
align-items:center;
background-color:purple;
height:144px;
border-radius:8px;
img{
    border-radius:50%;
}
span{
    color:white;
}
time{
    display:flex;
    color:white;
    height:32px;
    align-items:center;
    justify-content:center;
    width:96px;
}
`;