import styled from "styled-components"

export const Wrapper = styled.div`
display:flex;
flex-wrap:wrap;
overflow:scroll;

&::-webkit-scrollbar{
    display:none;
}
li{
    list-style:none;
}
`;