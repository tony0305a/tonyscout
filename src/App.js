import Header from "./components/Header/Header";
import Profile from "./components/Profile/Profile";
import * as S from "./AppStyle";
import Navigation from "./components/Navigation/Navigation";
import { useEffect, useState } from "react";
import { Home } from "./components/Home/Home";
import logo from './imgs/logo.png'
import useScout from "./hooks/riot-hook";
function App() {
  const [renderProfile, setRenderProfile] = useState(false);
  const {scoutState, cleanScoutState, cleanMatchData, cleanMasteriesState, cleanRankedState,} = useScout()

  const rHomePage = () =>{
    cleanScoutState()
    cleanMasteriesState()
  }
  useEffect(()=>{
    if(scoutState.hasUser){
      setRenderProfile(true)
    }
  },[scoutState])

  return (
    <>
      <S.Nav>
        <img src={logo}  onClick={rHomePage} width="64" height="64" />
      </S.Nav>
      <Header />

      {scoutState.hasUser?(<><Profile /></>):(<><Home /></>)}
      
      <S.Wrapper></S.Wrapper>
    </>
  );
}

export default App;
