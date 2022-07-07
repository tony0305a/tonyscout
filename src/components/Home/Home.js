import React, { useEffect } from "react";
import useScout from "../../hooks/riot-hook";
import apiHeader from "../../services/apiHeader";
import * as S from "./styled";
export const Home = () => {
  //NfTBFDvDotprroTPB5JdywFlFMeP_lRp-FtLqlNGLvKJDP3mY2_ToNgyGQDsvlgD1HADHtZHAad6NA
  //Tmw7MCSBM2p7oef-hIbejHiJ1Bx_uI9wBoAu-bw8wJAM0T3ycIqvflocE2mvCusDX06Hid7RPvDNvg
  const { matchDataStateDb, getMatchsFromDatabase } = useScout();
  const call = () => {};
  useEffect(() => {}, [matchDataStateDb]);

  const call2 = () => {
    if (matchDataStateDb.length === 0) {
      console.log("zero");
    }
  };

  return (
    <>
      <S.Wrapper>
        <span>Bem-Vindos(a)s</span>
      </S.Wrapper>
    </>
  );
};
