import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  width: 800px;
  height:580px;
  overflow:scroll;
  flex-wrap: wrap;
  margin:8px;
  border-radius: 8px;
  background-color: white;
  &::-webkit-scrollbar{
    display:none;

}
li{
  list-style-type: none;
}
`;
export const Header = styled.div`
  width: 100%;
  padding: 8px;
  background-color: purple;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  height: 40px;
  span {
    display: flex;
    color: white;
  }
`;
