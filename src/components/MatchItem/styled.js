import styled from "styled-components"

export const Wrapper = styled.div`
display:flex;
border:1px solid black;
height:200px;
justify-content:center;
align-items:flex-start;
`;

export const Metadata = styled.div`
display:flex;
flex-direction:column;
width:160px;
`;

export const Individual = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
img{
    width:72px;
    height:72px;
    border-radius:50%;
}
span{
    width:64px;
}

`;


export const Sides = styled.div`
display:flex;
justify-content:center;
align-items:center;
`;
export const BlueSide = styled.div`
display:flex;
flex-direction:column;
`;
export const RedSide = styled.div`
display:flex;
flex-direction:column;
`;