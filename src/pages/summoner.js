import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import MasteriesNew from "../components/Masteries";
import MatchsNew from "../components/Matches";
import ProfileNew from "../components/Profile";
import RankedNew from "../components/Ranked";
import apiHeader from "../services/apiHeader";
import * as S from "./summonerStyle";

const Summoner = () => {
  let { summonerName } = useParams();
  const [summonerData, setSummonerData] = useState([]);
  const [masteriesData, setMasteriesData] = useState([]);
  const [rankedsData, setRankedsData] = useState([]);
  const [soloQ, setSoloQ] = useState();
  const [flexQ, setFlexQ] = useState();
  const [matchIds, setMatchIds] = useState();
  const [matchs, setMatchs] = useState([]);

  useEffect(() => {
    const getSummoner = async () => {
      const summoner = await apiHeader.get(`summoner/${summonerName}`);
      setSummonerData(summoner.data);
    };
    getSummoner();
  }, [summonerName]);

  useEffect(() => {
    const getMasteries = async () => {
      const masteries = await apiHeader.get(
        `summoner/masteries/${summonerData.id}`
      );
      setMasteriesData(masteries.data);
    };
    const getRankeds = async () => {
      const rankeds = await apiHeader.get(`summoner/ranked/${summonerData.id}`);
      setRankedsData(rankeds.data);
    };
    const getMatchIds = async (queueId) => {
      const ids = await apiHeader.get(
        `match/ids/${summonerData.puuid}/${queueId}`
      );
      setMatchIds(ids.data);
    };
    getMasteries();
    getRankeds();
    getMatchIds(420);
  }, [summonerData]);

  useEffect(() => {
    const getMatchsInfo = async () => {
      for (var i in matchIds) {
        const matchs = await apiHeader.get(`match/info/${matchIds[i]}`);
        setMatchs((prev) => [...prev, matchs.data]);
      }
    };
    getMatchsInfo();
  }, [matchIds]);

  useEffect(() => {
    for (var i in rankedsData) {
      if (rankedsData[i].queueType === "RANKED_SOLO_5x5") {
        setSoloQ(rankedsData[i]);
      } else if (rankedsData[i].queueType === "RANKED_FLEX_SR") {
        setFlexQ(rankedsData[i]);
      }
    }
  }, [rankedsData]);

  return (
    <>
      <Header />
      <S.Wrapper>
        <S.SummonerInfos>
          <ProfileNew
            summonerName={summonerData.name}
            summonerPuuid = {summonerData.puuid}
            profileIconId={summonerData.profileIconId}
            level={summonerData.summonerLevel}
            matchsIds={matchIds}

          />
          <MasteriesNew masteries={masteriesData} />
        </S.SummonerInfos>

        <S.SummonerMatchsRanked>
          <S.Ranked>
            <RankedNew soloQueue={soloQ} flexQueue={flexQ} />
          </S.Ranked>
          <S.Matches>
            <MatchsNew matchsIds={matchIds} summonerId={summonerData.id} summonerPuuid = {summonerData.puuid} />
          </S.Matches>
        </S.SummonerMatchsRanked>
      </S.Wrapper>
    </>
  );
};

export default Summoner;
