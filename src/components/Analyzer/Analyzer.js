import React, { useEffect, useState } from "react";
import useScout from "../../hooks/riot-hook";
import { M } from "../MasteryItem/styled";
import * as S from "./styled";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Analyzer = () => {
  const { matchDataState, scoutState, renderState, setRender } = useScout();
  const [graph, setGraph] = useState([]);

  const getIndex = (item) => {
    for (var i in item.info.participants) {
      if (item.info.participants[i].summonerId == scoutState.id) {
        return i;
      }
    }
  };
  const getRoles = () => {
    var top = 0;
    var jungle = 0;
    var mid = 0;
    var ad = 0;
    var sup = 0;
    matchDataState.map((item) => {
      console.log(item.info.participants[getIndex(item)].individualPosition);

      if (item.info.participants[getIndex(item)].individualPosition == "TOP") {
        top += 1;
      } else if (
        item.info.participants[getIndex(item)].individualPosition == "JUNGLE"
      ) {
        jungle += 1;
      } else if (
        item.info.participants[getIndex(item)].individualPosition == "MIDDLE"
      ) {
        mid += 1;
      } else if (
        item.info.participants[getIndex(item)].individualPosition == "BOTTOM"
      ) {
        ad += 1;
      } else if (
        item.info.participants[getIndex(item)].individualPosition == "UTILITY"
      ) {
        sup += 1;
      }
    });
    return [top, jungle, mid, ad, sup];
  };
  const getChallenges = () => {
    var TwentyAssistStreakCount = 0;
    var abilityUses = 0;
    var acesBefore15Minutes = 0;
    var alliedJungleMonsterKills = 0;
    var baronBuffGoldAdvantageOverThreshold = 0;
    var baronTakedowns = 0;
    var bountyGold = 0;
    var buffsStolen = 0;
    var controlWardsPlaced = 0;
    var dancedWithRiftHerald = 0;
    var deathsByEnemyChamps = 0;
    var dodgeSkillShotsSmallWindow = 0;
    var doubleAces = 0;
    var dragonTakedowns = 0;
    var earlyLaningPhaseGoldExpAdvantage = 0;
    var effectiveHealAndShielding = 0;
    var enemyJungleMonsterKills = 0;
    var epicMonsterKillsNearEnemyJungler = 0;
    var epicMonsterKillsWithin30SecondsOfSpawn = 0;
    var epicMonsterSteals = 0;
    var epicMonsterStolenWithoutSmite = 0;
    var getTakedownsInAllLanesEarlyJungleAsLaner = 0;
    var killsOnOtherLanesEarlyJungleAsLaner = 0;
    var killsUnderOwnTurret = 0;
    var laneMinionsFirst10Minutes = 0;
    var laningPhaseGoldExpAdvantage = 0;
    var maxCsAdvantageOnLaneOpponent = 0;
    var quickFirstTurret = 0;
    var quickSoloKills = 0;
    var riftHeraldTakedowns = 0;
    var saveAllyFromDeath = 0;
    var scuttleCrabKills = 0;
    var skillshotsDodged = 0;
    var skillshotsHit = 0;
    var soloKills = 0;
    var soloTurretsLategame = 0;
    var stealthWardsPlaced = 0;
    var turretPlatesTaken = 0;
    var turretTakedowns = 0;
    var outnumberedKills = 0;
    var soloTurretsLategame = 0;
    var threeWardsOneSweeperCount = 0;
    var wardTakedowns = 0;
    var wardTakedownsBefore20M = 0;
    var pickKillWithAlly = 0;
    var knockEnemyIntoTeamAndKill = 0;
    var survivedThreeImmobilizesInFight = 0;
    matchDataState.map((item) => {
      if (item.info.participants != undefined) {
        if (
          (item.info.participants[getIndex(item)].challenges != undefined &&
            item.info.queueId == 420) ||
          item.info.queueId == 440
        ) {
          soloKills += parseInt(
            item.info.participants[getIndex(item)].challenges.soloKills
          );
          alliedJungleMonsterKills += parseInt(
            item.info.participants[getIndex(item)].challenges
              .alliedJungleMonsterKills
          );
          baronBuffGoldAdvantageOverThreshold += parseInt(
            item.info.participants[getIndex(item)].challenges
              .baronBuffGoldAdvantageOverThreshold
          );
          baronTakedowns += parseInt(
            item.info.participants[getIndex(item)].challenges.baronTakedowns
          );
          bountyGold += parseInt(
            item.info.participants[getIndex(item)].challenges.bountyGold
          );
          buffsStolen += parseInt(
            item.info.participants[getIndex(item)].challenges.buffsStolen
          );
          controlWardsPlaced += parseInt(
            item.info.participants[getIndex(item)].challenges.controlWardsPlaced
          );
          dancedWithRiftHerald += parseInt(
            item.info.participants[getIndex(item)].challenges
              .dancedWithRiftHerald
          );
          dodgeSkillShotsSmallWindow += parseInt(
            item.info.participants[getIndex(item)].challenges
              .dodgeSkillShotsSmallWindow
          );
          earlyLaningPhaseGoldExpAdvantage += parseInt(
            item.info.participants[getIndex(item)].challenges
              .earlyLaningPhaseGoldExpAdvantage
          );
          effectiveHealAndShielding += parseInt(
            item.info.participants[getIndex(item)].challenges
              .effectiveHealAndShielding
          );
          enemyJungleMonsterKills += parseInt(
            item.info.participants[getIndex(item)].challenges
              .enemyJungleMonsterKills
          );
          epicMonsterKillsNearEnemyJungler += parseInt(
            item.info.participants[getIndex(item)].challenges
              .enemyJungleMonsterKills
          );
          epicMonsterKillsWithin30SecondsOfSpawn += parseInt(
            item.info.participants[getIndex(item)].challenges
              .epicMonsterKillsWithin30SecondsOfSpawn
          );
          epicMonsterSteals += parseInt(
            item.info.participants[getIndex(item)].challenges.epicMonsterSteals
          );
          epicMonsterStolenWithoutSmite += parseInt(
            item.info.participants[getIndex(item)].challenges
              .epicMonsterStolenWithoutSmite
          );
          getTakedownsInAllLanesEarlyJungleAsLaner += parseInt(
            item.info.participants[getIndex(item)].challenges
              .getTakedownsInAllLanesEarlyJungleAsLaner
          );
          killsOnOtherLanesEarlyJungleAsLaner += parseInt(
            item.info.participants[getIndex(item)].challenges
              .killsOnOtherLanesEarlyJungleAsLaner
          );
          killsUnderOwnTurret += parseInt(
            item.info.participants[getIndex(item)].challenges
              .killsUnderOwnTurret
          );
          laneMinionsFirst10Minutes += parseInt(
            item.info.participants[getIndex(item)].challenges
              .laneMinionsFirst10Minutes
          );
          laningPhaseGoldExpAdvantage += parseInt(
            item.info.participants[getIndex(item)].challenges
              .laningPhaseGoldExpAdvantage
          );
          maxCsAdvantageOnLaneOpponent += parseInt(
            item.info.participants[getIndex(item)].challenges
              .maxCsAdvantageOnLaneOpponent
          );
          quickFirstTurret += parseInt(
            item.info.participants[getIndex(item)].challenges.quickFirstTurret
          );
          quickSoloKills += parseInt(
            item.info.participants[getIndex(item)].challenges.quickSoloKills
          );
          riftHeraldTakedowns += parseInt(
            item.info.participants[getIndex(item)].challenges
              .riftHeraldTakedowns
          );
          saveAllyFromDeath += parseInt(
            item.info.participants[getIndex(item)].challenges.saveAllyFromDeath
          );
          scuttleCrabKills += parseInt(
            item.info.participants[getIndex(item)].challenges.scuttleCrabKills
          );
          skillshotsDodged += parseInt(
            item.info.participants[getIndex(item)].challenges.skillshotsDodged
          );
          skillshotsHit += parseInt(
            item.info.participants[getIndex(item)].challenges.skillshotsHit
          );
          soloTurretsLategame += parseInt(
            item.info.participants[getIndex(item)].challenges
              .soloTurretsLategame
          );
          stealthWardsPlaced += parseInt(
            item.info.participants[getIndex(item)].challenges.stealthWardsPlaced
          );
          turretPlatesTaken += parseInt(
            item.info.participants[getIndex(item)].challenges.turretPlatesTaken
          );
          turretTakedowns += parseInt(
            item.info.participants[getIndex(item)].challenges.turretTakedowns
          );
          outnumberedKills += parseInt(
            item.info.participants[getIndex(item)].challenges.outnumberedKills
          );
          soloTurretsLategame += parseInt(
            item.info.participants[getIndex(item)].challenges
              .soloTurretsLategame
          );
          threeWardsOneSweeperCount += parseInt(
            item.info.participants[getIndex(item)].challenges
              .threeWardsOneSweeperCount
          );
          wardTakedowns += parseInt(
            item.info.participants[getIndex(item)].challenges.wardTakedowns
          );
          wardTakedownsBefore20M += parseInt(
            item.info.participants[getIndex(item)].challenges
              .wardTakedownsBefore20M
          );
          pickKillWithAlly += parseInt(
            item.info.participants[getIndex(item)].challenges.pickKillWithAlly
          );
          knockEnemyIntoTeamAndKill += parseInt(
            item.info.participants[getIndex(item)].challenges
              .knockEnemyIntoTeamAndKill
          );
          survivedThreeImmobilizesInFight += parseInt(
            item.info.participants[getIndex(item)].challenges
              .survivedThreeImmobilizesInFight
          );
        }
      }
    });

    var solo =
      soloKills * 0.1 +
      turretPlatesTaken * 0.1 +
      turretTakedowns * 0.1 +
      quickSoloKills +
      quickFirstTurret +
      outnumberedKills * 0.2 +
      soloTurretsLategame * 0.2;
    var fight =
      pickKillWithAlly * 0.05 +
      knockEnemyIntoTeamAndKill * 0.1 +
      survivedThreeImmobilizesInFight * 0.1;
    var utility =
      saveAllyFromDeath * 0.1 +
      controlWardsPlaced * 0.1 +
      effectiveHealAndShielding / 1000 +
      stealthWardsPlaced * 0.1 +
      threeWardsOneSweeperCount +
      wardTakedowns * 0.1 +
      wardTakedownsBefore20M * 0.1;

    return [solo, fight, utility];
  };
  const call = () => {
    console.log(graph);
  };
  useEffect(() => {
    setGraph(getChallenges());
  }, [matchDataState]);

  const data = {
    labels: ["Solo", "Fight", "Utility"],
    datasets: [
      {
        label: "# of Votes",
        data: graph,
        backgroundColor: [
          "rgba(255, 0, 0, 1)",
          "rgba(3, 0, 253, 1)",
          "rgba(0, 140, 25, 1)",
          "rgba(115, 15, 92, 1)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  if (matchDataState == undefined) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }
  return (
    <S.Wrapper>
      <span>Analyzer</span>
      <S.Roles>
        <button onClick={call}>Call</button>
        <div
          style={{
            position: "relative",
            margin: "auto",
            width: "350px",
            height: "100px",
          }}
        >
          {renderState ? <Doughnut data={data} /> : <></>}
        </div>
      </S.Roles>
    </S.Wrapper>
  );
};
export default Analyzer;
