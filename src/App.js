
import Header from "./components/Header/Header";
import Matches from "./components/Matches/Matches";
import Profile from "./components/Profile/Profile";
import Ranked from "./components/Ranked/Ranked";
import * as S from "./AppStyle"
function App() {
  return (
    <>
      <Header />
      <Profile />
      <S.Wrapper>
      <Ranked />
      <Matches/>
      </S.Wrapper>
    </>
  );
}

export default App;
