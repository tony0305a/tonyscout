import Header from "./components/Header/Header";
import Profile from "./components/Profile/Profile";
import * as S from "./AppStyle";
import { useEffect, useState } from "react";
import { Home } from "./components/Home/Home";
import useScout from "./hooks/riot-hook";
function App() {
  const [renderProfile, setRenderProfile] = useState(false);
  const {
    scoutState,
  } = useScout();


  useEffect(() => {
    if (scoutState.hasUser) {
      setRenderProfile(true);
    }
  }, [scoutState]);

  return (
    <>
    <Header/>
      {scoutState.hasUser ? (
        <>
          <Profile />
        </>
      ) : (
        <>
          <Home />
        </>
      )}

      <S.Wrapper>
      </S.Wrapper>

    </>
  );
}

export default App;
