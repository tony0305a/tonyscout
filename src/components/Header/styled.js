import { startTransition } from "react"
import styled from "styled-components"

export const Wrapper = styled.div`
display:flex;
justify-content:center;

`;
export const Form = styled.div`
display:flex;
border:1px solid black;
input{
    display:flex;
    flex-grow:2;
    width:360px;
    background-color:white;
    padding-left:4px;
}
button{
    padding:4px;
    background-color:purple;
    padding-left:4px;
    color:white;
}
`;