import React from "react";
import { GraphItem } from "../Analyzer/GraphItem";
import { Slot1 } from "./Slot1";
import { Slot2 } from "./Slot2";
import { SlotCompare } from "./SlotCompare";
import * as S from "./styled";

const Compare = () => {
  return (
    <S.Wrapper>
      <S.Head>
        <h1>Compare With</h1>
      </S.Head>
      <S.Body>
        <S.Slot1>
          <Slot1 />
        </S.Slot1>
        <S.SlotCompare>
          <SlotCompare />
        </S.SlotCompare>
        <S.Slot2>
          <Slot2 />
        </S.Slot2>
      </S.Body>
    </S.Wrapper>
  );
};
export default Compare;
