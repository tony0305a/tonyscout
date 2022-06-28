import styled from "styled-components"

export const Wrapper = styled.div`
margin:8px;
display:flex;
align-items:center;
justify-content:space-around;
border:1px solid #ccc;
background-color:white;
border-radius:8px;

@media screen and (max-width: 600px){
    flex-direction:column;
    justify-content:center;
    align-items:center;
    width:100%;
}

`;

export const SummonerInfo = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
width:30%;

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
button{
    margin-top:4px;
    color:white;
    background-color:purple;
    padding:4px;
    border-radius:8px;
}

`;
export const Mast = styled.div`
display:flex;
flex-wrap:wrap;
justify-content:center;
align-items:center;
width:100%;

`;
export const MatchWrapper = styled.div`
display:flex;
flex-direction:column;
`;
export const ProfileAndMatch = styled.div`
display:flex;
flex-direction:column;
`;
export const ProfileAndMatchAndRanked = styled.div`
display:flex;
flex-direction:column;

`;
export const RankedAndMatches = styled.div`
display:flex;
@media screen and (max-width: 600px){
    flex-direction:column;
    width:100%;
}

`;