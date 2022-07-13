import { startTransition } from "react"
import styled from "styled-components"

export const Wrapper = styled.div`
display:flex;
justify-content:center;
align-items:center;

span{
    margin-right:8px;
}


`;
export const Form = styled.form`
display:flex;
border:1px solid black;
width:60%;
input{
    display:flex;
    flex-grow:2;
    width:100%;
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