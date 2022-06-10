
import Header from "./components/Header/Header";
import Matches from "./components/Matches/Matches";
import Profile from "./components/Profile/Profile";
import Ranked from "./components/Ranked/Ranked";
import * as S from "./AppStyle"
import Navigation from "./components/Navigation/Navigation";
function App() {
  return (
    <>
      <Navigation/>
      <Header />
      <Profile />
      <S.Wrapper>
      <Matches/>
      </S.Wrapper>
    </>
  );
}

export default App;
