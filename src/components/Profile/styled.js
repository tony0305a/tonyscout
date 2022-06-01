import styled from "styled-components"

export const Wrapper = styled.div`
margin:8px;
display:flex;
align-items:center;
justify-content:space-around;
border:1px solid #ccc;
`;

export const SummonerInfo = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;

span{
    display:flex;
    background-color:purple;
    color:white;
    padding:4px;
    align-items:flex-start;
    border-radius:8px;
}
img{
    border-radius:50%;
}

`;
export const Mast = styled.div`
display:flex;
flex-wrap:wrap;
width:980px;

`;