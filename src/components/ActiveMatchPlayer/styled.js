import styled from "styled-components"

export const Wrapper = styled.div`
display:flex;
background-color:purple;
border:1px solid white;
border-radius:4px;
align-items:center;
width:50%;
height:100px;
span{
    color:white;
}

`;

export const PlayerData = styled.div`
display:flex;
flex-direction:column;
width:35%;
justify-content:center;
align-items:center;

img{
    border-radius:50%;
}

`;
export const HeroData = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;

`;

export const Runes = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:flex-start;
margin:8px;

div{
    display:flex;
}

`;
export const Elo = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;

`;