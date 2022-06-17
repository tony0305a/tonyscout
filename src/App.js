
import Header from "./components/Header/Header";
import Profile from "./components/Profile/Profile";
import * as S from "./AppStyle"
import Navigation from "./components/Navigation/Navigation";
function App() {
  return (
    <>
      <Navigation/>
      <Header />
      <Profile />
      <S.Wrapper>
      </S.Wrapper>
    </>
  );
}

export default App;
