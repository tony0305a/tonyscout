import styled from 'styled-components'

export const Wrapper = styled.div`
display:flex;
justify-content:space-around;
background-color:purple;
margin-bottom:8px;
a{
    margin:8px;
    color:white;
    border:1px solid white;
    padding:4px;
    border-radius:8px;
    
    &:hover{
        color:black;
        border:1px solid #ccc
    }
}


`;