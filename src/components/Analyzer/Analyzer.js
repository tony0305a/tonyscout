import React, { useEffect, useState } from "react";
import useScout from "../../hooks/riot-hook";
import { M } from "../MasteryItem/styled";
import * as S from "./styled";
import { Doughnut, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const Analyzer = () => {
  const { matchDataState, scoutState, renderState, setRender, rankedState } =
    useScout();
  const [graph, setGraph] = useState([]);
  const [renderTop, setRenderTop] = useState(false);
  const [renderJungle, setRenderJungle] = useState(false);
  const [renderMid, setRenderMid] = useState(false);
  const [renderCarry, setRenderCarry] = useState(false);
  const [renderUtility, setRenderUtility] = useState(false);
  const [hardData, setHardData] = useState({
    soloQueues: 0,
    // Lane
    earlyLaningPhaseGoldExpAdvantage: 0,
    junglerKillsEarlyJungle: 0,
    killAfterHiddenWithAlly: 0,
    killsNearEnemyTurret: 0,
    killsOnLanersEarlyJungleAsJungler: 0,
    killsUnderOwnTurret: 0,
    laneMinionsFirst10Minutes: 0,
    laningPhaseGoldExpAdvantage: 0,
    maxCsAdvantageOnLaneOpponent: 0,
    maxKillDeficit: 0,
    maxLevelLeadLaneOpponent: 0,
    moreEnemyJungleThanOpponent: 0,
    multikills: 0,
    multikillsAfterAggressiveFlash: 0,
    outnumberedKills: 0,
    quickFirstTurret: 0,
    quickSoloKills: 0,
    takedownOnFirstTurret: 0,
    takedownsAfterGainingLevelAdvantage: 0,
    takedownsBeforeJungleMinionSpawn: 0,
    takedownsFirstXMinutes: 0,
    turretPlatesTaken: 0,
    //Damage
    damagePerMinute: 0,
    damageTakenOnTeamPercentage: 0,
    teamDamagePercentage: 0,
    totalDamageDealtToChampions: 0,
    totalDamageTaken: 0,
    totalHeal: 0,
    // Fight
    enemyChampionImmobilizations: 0,
    fullTeamTakedown: 0,
    highestCrowdControlScore: 0,
    immobilizeAndKillWithAlly: 0,
    killedChampTookFullTeamDamageSurvived: 0,
    knockEnemyIntoTeamAndKill: 0,
    pickKillWithAlly: 0,
    survivedThreeImmobilizesInFight: 0,
    tookLargeDamageSurvived: 0,
    // Utility
    completeSupportQuestInTime: 0,
    controlWardTimeCoverageInRiverOrEnemyHalf: 0,
    controlWardsPlaced: 0,
    effectiveHealAndShielding: 0,
    killParticipation: 0,
    saveAllyFromDeath: 0,
    stealthWardsPlaced: 0,
    threeWardsOneSweeperCount: 0,
    visionScoreAdvantageLaneOpponent: 0,
    visionScorePerMinute: 0,
    // Non-Challenges
    assists: 0,
    visionScore: 0,
    // Split
    soloKills: 0,
    soloTurretsLategame: 0,
    teamBaronKills: 0,
    teamElderDragonKills: 0,
    // Non-Challenges
    damageDealtToBuildings: 0,
    // Farm
    alliedJungleMonsterKills: 0,
    buffsStolen: 0,
    elderDragonMultikills: 0,
    enemyJungleMonsterKills: 0,
    initialBuffCount: 0,
    initialCrabCount: 0,
    jungleCsBefore10Minutes: 0,
    scuttleCrabKills: 0,
    // Objectives
    baronTakedowns: 0,
    epicMonsterKillsNearEnemyJungler: 0,
    epicMonsterKillsWithin30SecondsOfSpawn: 0,
    epicMonsterSteals: 0,
    epicMonsterStolenWithoutSmite: 0,
    junglerTakedownsNearDamagedEpicMonster: 0,
    kTurretsDestroyedBeforePlatesFall: 0,
    multiTurretRiftHeraldCount: 0,
    outnumberedNexusKill: 0,
    perfectDragonSoulsTaken: 0,
    riftHeraldTakedowns: 0,
    soloBaronKills: 0,
    takedownOnFirstTurret: 0,
    turretTakedowns: 0,
    turretsTakenWithRiftHerald: 0,
  });
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
    var soloQ = 0;
    var earlyLaningPhaseGoldExpAdvantage = 0;
    var junglerKillsEarlyJungle = 0;
    var killAfterHiddenWithAlly = 0;
    var killsNearEnemyTurret = 0;
    var killsOnLanersEarlyJungleAsJungler = 0;
    var killsUnderOwnTurret = 0;
    var laneMinionsFirst10Minutes = 0;
    var laningPhaseGoldExpAdvantage = 0;
    var maxCsAdvantageOnLaneOpponent = 0;
    var maxKillDeficit = 0;
    var maxLevelLeadLaneOpponent = 0;
    var multikills = 0;
    var multikillsAfterAggressiveFlash = 0;
    var outnumberedKills = 0;
    var quickFirstTurret = 0;
    var quickSoloKills = 0;
    var takedownOnFirstTurret = 0;
    var takedownsAfterGainingLevelAdvantage = 0;
    var takedownsBeforeJungleMinionSpawn = 0;
    var takedownsFirstXMinutes = 0;
    var turretPlatesTaken = 0;

    //Damage
    var damagePerMinute = 0;
    var damageTakenOnTeamPercentage = 0;
    var teamDamagePercentage = 0;
    //Non-Challenges
    var totalDamageDealtToChampions = 0;
    var totalDamageTaken = 0;
    var totalHeal = 0;

    //Fight
    var enemyChampionImmobilizations = 0;
    var fullTeamTakedown = 0;
    var highestCrowdControlScore = 0;
    var immobilizeAndKillWithAlly = 0;
    var killedChampTookFullTeamDamageSurvived = 0;
    var knockEnemyIntoTeamAndKill = 0;
    var pickKillWithAlly = 0;
    var survivedThreeImmobilizesInFight = 0;
    var tookLargeDamageSurvived = 0;
    // Utility
    var completeSupportQuestInTime = 0;
    var controlWardTimeCoverageInRiverOrEnemyHalf = 0;
    var controlWardsPlaced = 0;
    var effectiveHealAndShielding = 0;
    var killParticipation = 0;
    var saveAllyFromDeath = 0;
    var stealthWardsPlaced = 0;
    var threeWardsOneSweeperCount = 0;
    var visionScoreAdvantageLaneOpponent = 0;
    var visionScorePerMinute = 0;
    // Non-Challenges
    var assists = 0;
    var visionScore = 0;
    //Split
    var soloKills = 0;
    var soloTurretsLategame = 0;
    var teamBaronKills = 0;
    var teamElderDragonKills = 0;
    var damageDealtToBuildings = 0;
    //Farm
  var  alliedJungleMonsterKills = 0
  var  buffsStolen = 0
  var  elderDragonMultikills = 0
  var  enemyJungleMonsterKills = 0
  var  initialBuffCount = 0
  var  initialCrabCount = 0
  var  jungleCsBefore10Minutes = 0
  var  scuttleCrabKills = 0

    var eloMultiplaier = 0.94;
    matchDataState.map((item) => {
      if (item.info.participants != undefined) {
        if (
          item.info.participants[getIndex(item)].challenges != undefined &&
          item.info.queueId == 420
        ) {
          soloQ += 1;
          soloKills += parseInt(
            item.info.participants[getIndex(item)].challenges.soloKills
          );

          if (junglerKillsEarlyJungle != 0) {
            junglerKillsEarlyJungle +=
              item.info.participants[getIndex(item)].challenges
                .junglerKillsEarlyJungle;
          }

          killAfterHiddenWithAlly += parseInt(
            item.info.participants[getIndex(item)].challenges
              .killAfterHiddenWithAlly
          );
          killsNearEnemyTurret += parseInt(
            item.info.participants[getIndex(item)].challenges
              .killsNearEnemyTurret
          );
          if (killsOnLanersEarlyJungleAsJungler != 0) {
            killsOnLanersEarlyJungleAsJungler += parseInt(
              item.info.participants[getIndex(item)].challenges
                .killsOnLanersEarlyJungleAsJungler
            );
          }

          killsUnderOwnTurret += parseInt(
            item.info.participants[getIndex(item)].challenges
              .killsUnderOwnTurret
          );
          laneMinionsFirst10Minutes += parseInt(
            item.info.participants[getIndex(item)].challenges
              .laneMinionsFirst10Minutes
          );
          if (laningPhaseGoldExpAdvantage != 0) {
            laningPhaseGoldExpAdvantage += parseInt(
              item.info.participants[getIndex(item)].challenges
                .laningPhaseGoldExpAdvantage
            );
          }
          if (maxCsAdvantageOnLaneOpponent != 0) {
            maxCsAdvantageOnLaneOpponent += parseInt(
              item.info.participants[getIndex(item)].challenges
                .maxCsAdvantageOnLaneOpponent
            );
          }

          maxKillDeficit += parseInt(
            item.info.participants[getIndex(item)].challenges.maxKillDeficit
          );
          if (maxLevelLeadLaneOpponent != 0) {
            maxLevelLeadLaneOpponent += parseInt(
              item.info.participants[getIndex(item)].challenges
                .maxLevelLeadLaneOpponent
            );
          }

          multikills += parseInt(
            item.info.participants[getIndex(item)].challenges.multikills
          );
          multikillsAfterAggressiveFlash += parseInt(
            item.info.participants[getIndex(item)].challenges
              .multikillsAfterAggressiveFlash
          );
          outnumberedKills += parseInt(
            item.info.participants[getIndex(item)].challenges.outnumberedKills
          );
          quickFirstTurret += parseInt(
            item.info.participants[getIndex(item)].challenges.quickFirstTurret
          );
          quickSoloKills += parseInt(
            item.info.participants[getIndex(item)].challenges.quickSoloKills
          );
          takedownOnFirstTurret += parseInt(
            item.info.participants[getIndex(item)].challenges
              .takedownOnFirstTurret
          );
          takedownsAfterGainingLevelAdvantage += parseInt(
            item.info.participants[getIndex(item)].challenges
              .takedownsAfterGainingLevelAdvantage
          );
          takedownsBeforeJungleMinionSpawn += parseInt(
            item.info.participants[getIndex(item)].challenges
              .takedownsBeforeJungleMinionSpawn
          );
          takedownsFirstXMinutes += parseInt(
            item.info.participants[getIndex(item)].challenges
              .takedownsFirstXMinutes
          );
          turretPlatesTaken += parseInt(
            item.info.participants[getIndex(item)].challenges.turretPlatesTaken
          );
          earlyLaningPhaseGoldExpAdvantage += parseInt(
            item.info.participants[getIndex(item)].challenges.turretPlatesTaken
          );
          damagePerMinute += parseInt(
            item.info.participants[getIndex(item)].challenges.damagePerMinute
          );
          damageTakenOnTeamPercentage +=
            item.info.participants[getIndex(item)].challenges
              .damageTakenOnTeamPercentage;
          teamDamagePercentage +=
            item.info.participants[getIndex(item)].challenges
              .teamDamagePercentage;
          totalDamageDealtToChampions += parseInt(
            item.info.participants[getIndex(item)].totalDamageDealtToChampions
          );
          totalDamageTaken += parseInt(
            item.info.participants[getIndex(item)].totalDamageTaken
          );
          totalHeal += parseInt(
            item.info.participants[getIndex(item)].totalHeal
          );

          if (
            item.info.participants[getIndex(item)].challenges
              .enemyChampionImmobilizations != 0
          ) {
            enemyChampionImmobilizations += parseInt(
              item.info.participants[getIndex(item)].challenges
                .enemyChampionImmobilizations
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .fullTeamTakedown != 0
          ) {
            fullTeamTakedown += parseInt(
              item.info.participants[getIndex(item)].challenges.fullTeamTakedown
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .highestCrowdControlScore >= 0
          ) {
            highestCrowdControlScore += parseFloat(
              item.info.participants[getIndex(item)].challenges
                .highestCrowdControlScore
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .immobilizeAndKillWithAlly != 0
          ) {
            immobilizeAndKillWithAlly += parseInt(
              item.info.participants[getIndex(item)].challenges
                .immobilizeAndKillWithAlly
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .killedChampTookFullTeamDamageSurvived != 0
          ) {
            killedChampTookFullTeamDamageSurvived += parseInt(
              item.info.participants[getIndex(item)].challenges
                .killedChampTookFullTeamDamageSurvived
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .knockEnemyIntoTeamAndKill != 0
          ) {
            knockEnemyIntoTeamAndKill += parseInt(
              item.info.participants[getIndex(item)].challenges
                .knockEnemyIntoTeamAndKill
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .pickKillWithAlly != 0
          ) {
            pickKillWithAlly += parseInt(
              item.info.participants[getIndex(item)].challenges.pickKillWithAlly
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .survivedThreeImmobilizesInFight != 0
          ) {
            survivedThreeImmobilizesInFight += parseInt(
              item.info.participants[getIndex(item)].challenges
                .survivedThreeImmobilizesInFight
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .tookLargeDamageSurvived != 0
          ) {
            tookLargeDamageSurvived += parseInt(
              item.info.participants[getIndex(item)].challenges
                .tookLargeDamageSurvived
            );
          }

          if (
            item.info.participants[getIndex(item)].challenges
              .completeSupportQuestInTime != 0
          ) {
            completeSupportQuestInTime += parseInt(
              item.info.participants[getIndex(item)].challenges
                .completeSupportQuestInTime
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .controlWardTimeCoverageInRiverOrEnemyHalf >= 0
          ) {
            controlWardTimeCoverageInRiverOrEnemyHalf += parseFloat(
              item.info.participants[getIndex(item)].challenges
                .controlWardTimeCoverageInRiverOrEnemyHalf
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .controlWardsPlaced != 0
          ) {
            controlWardsPlaced += parseFloat(
              item.info.participants[getIndex(item)].challenges
                .controlWardsPlaced
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .effectiveHealAndShielding != 0
          ) {
            effectiveHealAndShielding += parseInt(
              item.info.participants[getIndex(item)].challenges
                .effectiveHealAndShielding
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .killParticipation >= 0
          ) {
            killParticipation += parseFloat(
              item.info.participants[getIndex(item)].challenges
                .killParticipation
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .saveAllyFromDeath != 0
          ) {
            saveAllyFromDeath += parseInt(
              item.info.participants[getIndex(item)].challenges
                .saveAllyFromDeath
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .stealthWardsPlaced != 0
          ) {
            stealthWardsPlaced += parseInt(
              item.info.participants[getIndex(item)].challenges
                .stealthWardsPlaced
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .threeWardsOneSweeperCount != 0
          ) {
            threeWardsOneSweeperCount += parseInt(
              item.info.participants[getIndex(item)].challenges
                .threeWardsOneSweeperCount
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .visionScoreAdvantageLaneOpponent >= 0
          ) {
            visionScoreAdvantageLaneOpponent += parseFloat(
              item.info.participants[getIndex(item)].challenges
                .visionScoreAdvantageLaneOpponent
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .visionScorePerMinute >= 0
          ) {
            visionScorePerMinute += parseFloat(
              item.info.participants[getIndex(item)].challenges
                .visionScorePerMinute
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .visionScorePerMinute >= 0
          ) {
            visionScorePerMinute += parseInt(
              item.info.participants[getIndex(item)].challenges
                .visionScorePerMinute
            );
          }
          if (item.info.participants[getIndex(item)].assists >= 0) {
            assists += parseInt(item.info.participants[getIndex(item)].assists);
          }
          if (item.info.participants[getIndex(item)].visionScore >= 0) {
            visionScore += parseInt(
              item.info.participants[getIndex(item)].visionScore
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges.soloKills != 0
          ) {
            soloKills += parseInt(
              item.info.participants[getIndex(item)].challenges.soloKills
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges.soloTurretsLategame != 0
          ) {
            soloTurretsLategame += parseInt(
              item.info.participants[getIndex(item)].challenges.soloTurretsLategame
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges.teamBaronKills != 0
          ) {
            teamBaronKills += parseInt(
              item.info.participants[getIndex(item)].challenges.teamBaronKills
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges.teamElderDragonKills != 0
          ) {
            teamElderDragonKills += parseInt(
              item.info.participants[getIndex(item)].challenges.teamElderDragonKills
            );
          }
          if (
            item.info.participants[getIndex(item)].damageDealtToBuildings != 0
          ) {
            damageDealtToBuildings += parseInt(
              item.info.participants[getIndex(item)].damageDealtToBuildings
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges.alliedJungleMonsterKills != 0
          ) {
            alliedJungleMonsterKills += parseInt(
              item.info.participants[getIndex(item)].challenges.alliedJungleMonsterKills
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges.buffsStolen != 0
          ) {
            buffsStolen += parseInt(
              item.info.participants[getIndex(item)].challenges.buffsStolen
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges.enemyJungleMonsterKills != 0
          ) {
            enemyJungleMonsterKills += parseInt(
              item.info.participants[getIndex(item)].challenges.enemyJungleMonsterKills
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges.initialBuffCount != 0
          ) {
            initialBuffCount += parseInt(
              item.info.participants[getIndex(item)].challenges.initialBuffCount
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges.initialCrabCount != 0
          ) {
            initialCrabCount += parseInt(
              item.info.participants[getIndex(item)].challenges.initialCrabCount
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges.jungleCsBefore10Minutes != 0
          ) {
            jungleCsBefore10Minutes += parseInt(
              item.info.participants[getIndex(item)].challenges.jungleCsBefore10Minutes
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges.scuttleCrabKills != 0
          ) {
            scuttleCrabKills += parseInt(
              item.info.participants[getIndex(item)].challenges.scuttleCrabKills
            );
          }
        }
      }
    });
    if (rankedState.ranked != undefined) {
      var sq = rankedState.ranked[0];
      if (sq.queueType !== "RANKED_SOLO_5x5") {
        sq = rankedState.ranked[1];
      }
      if (sq.tier == "IRON" && sq.rank <= 2) {
        eloMultiplaier = 0.9;
      } else if (sq.tier == "IRON" && sq.rank >= 3) {
        eloMultiplaier = 0.94;
      } else if (sq.tier == "BRONZE" && sq.rank <= 2) {
        eloMultiplaier = 0.8;
      } else if (sq.tier == "BRONZE" && sq.rank >= 3) {
        eloMultiplaier = 0.84;
      } else if (sq.tier == "SILVER" && sq.rank <= 2) {
        eloMultiplaier = 0.7;
      } else if (sq.tier == "SIVER" && sq.rank >= 3) {
        eloMultiplaier = 0.74;
      } else if (sq.tier == "GOLD" && sq.rank <= 2) {
        eloMultiplaier = 0.6;
      } else if (sq.tier == "GOLD" && sq.rank >= 3) {
        eloMultiplaier = 0.64;
      } else if (sq.tier == "PLATINUM" && sq.rank <= 2) {
        eloMultiplaier = 0.5;
      } else if (sq.tier == "PLATINUM" && sq.rank >= 3) {
        eloMultiplaier = 0.54;
      } else if (sq.tier == "DIAMOND" && sq.rank <= 2) {
        eloMultiplaier = 0.4;
      } else if (sq.tier == "DIAMOND" && sq.rank >= 3) {
        eloMultiplaier = 0.44;
      } else if (sq.tier == "MASTER") {
        eloMultiplaier = 0.3;
      } else if (sq.tier == "GRANDMASTER") {
        eloMultiplaier = 0.2;
      } else if (sq.tier == "CHALLENGER") {
        eloMultiplaier = 0.1;
      }
    }

    var Lane =
      earlyLaningPhaseGoldExpAdvantage / (soloQ * eloMultiplaier) +
      junglerKillsEarlyJungle / (soloQ * eloMultiplaier) +
      killAfterHiddenWithAlly / (soloQ * eloMultiplaier) +
      killsNearEnemyTurret / (soloQ * eloMultiplaier) +
      killsOnLanersEarlyJungleAsJungler / (soloQ * eloMultiplaier) +
      killsUnderOwnTurret / (soloQ * eloMultiplaier) +
      (laneMinionsFirst10Minutes/1.653) / (soloQ * eloMultiplaier) +
      laningPhaseGoldExpAdvantage / (soloQ * eloMultiplaier) +
      maxCsAdvantageOnLaneOpponent / (soloQ * eloMultiplaier) -
      maxKillDeficit / (soloQ * eloMultiplaier) +
      maxLevelLeadLaneOpponent / (soloQ * eloMultiplaier) +
      multikills / (soloQ * eloMultiplaier) +
      multikillsAfterAggressiveFlash / (soloQ * eloMultiplaier) +
      outnumberedKills / (soloQ * eloMultiplaier) +
      quickFirstTurret / (soloQ * eloMultiplaier) +
      quickSoloKills / (soloQ * eloMultiplaier) +
      takedownOnFirstTurret / (soloQ * eloMultiplaier) +
      takedownsAfterGainingLevelAdvantage / (soloQ * eloMultiplaier) +
      takedownsBeforeJungleMinionSpawn / (soloQ * eloMultiplaier) +
      takedownsFirstXMinutes / (soloQ * eloMultiplaier) +
      turretPlatesTaken / (soloQ * eloMultiplaier);
    var Damage =
      damagePerMinute / (soloQ * eloMultiplaier) +
      damageTakenOnTeamPercentage / (soloQ * eloMultiplaier) +
      teamDamagePercentage / (soloQ * eloMultiplaier) +
      (totalDamageDealtToChampions/1.40) / (soloQ * eloMultiplaier) +
      totalDamageTaken / (soloQ * eloMultiplaier) +
      totalHeal / (soloQ * eloMultiplaier);

    var Fight =
      (enemyChampionImmobilizations/5) / (soloQ * eloMultiplaier) +
      fullTeamTakedown / (soloQ * eloMultiplaier) +
      highestCrowdControlScore / (soloQ * eloMultiplaier) +
      immobilizeAndKillWithAlly / (soloQ * eloMultiplaier) +
      killedChampTookFullTeamDamageSurvived / (soloQ * eloMultiplaier) +
      knockEnemyIntoTeamAndKill / (soloQ * eloMultiplaier) +
      (pickKillWithAlly) / (soloQ * eloMultiplaier) +
      survivedThreeImmobilizesInFight / (soloQ * eloMultiplaier) +
      tookLargeDamageSurvived / (soloQ * eloMultiplaier);

    var Utility =
      completeSupportQuestInTime / (soloQ * eloMultiplaier) +
      controlWardTimeCoverageInRiverOrEnemyHalf / (soloQ * eloMultiplaier) +
      (controlWardsPlaced/10) / (soloQ * eloMultiplaier) +
      (effectiveHealAndShielding/1000) /   (soloQ * eloMultiplaier) +
      killParticipation / (soloQ * eloMultiplaier) +
      saveAllyFromDeath / (soloQ * eloMultiplaier) +
      (stealthWardsPlaced/10) / (soloQ * eloMultiplaier) +
      threeWardsOneSweeperCount / (soloQ * eloMultiplaier) +
      visionScoreAdvantageLaneOpponent / (soloQ * eloMultiplaier) +
      (visionScorePerMinute/100) / (soloQ * eloMultiplaier) +
      (assists/100) / (soloQ * eloMultiplaier) +
      (visionScore/100) / (soloQ * eloMultiplaier);
    var Split = 
    soloKills  / (soloQ * eloMultiplaier) +
    soloTurretsLategame  / (soloQ * eloMultiplaier) +
    teamBaronKills  / (soloQ * eloMultiplaier) +
    teamElderDragonKills  / (soloQ * eloMultiplaier) +
    (damageDealtToBuildings/355)  / (soloQ * eloMultiplaier)
 
    ;
    var Farm = 
    (alliedJungleMonsterKills/650) / (soloQ * eloMultiplaier) +
    buffsStolen  / (soloQ * eloMultiplaier) +
    (enemyJungleMonsterKills/50)  / (soloQ * eloMultiplaier) +
    initialBuffCount  / (soloQ * eloMultiplaier) +
    initialCrabCount  / (soloQ * eloMultiplaier) +
    (jungleCsBefore10Minutes/1.162)  / (soloQ * eloMultiplaier) +
    scuttleCrabKills  / (soloQ * eloMultiplaier) +
    (laneMinionsFirst10Minutes/1.653) / (soloQ * eloMultiplaier) 
    ;
    var Objectives = 0;

    setHardData({
      soloQueues: soloQ,
      // Lane
      earlyLaningPhaseGoldExpAdvantage: earlyLaningPhaseGoldExpAdvantage,
      junglerKillsEarlyJungle: junglerKillsEarlyJungle,
      killAfterHiddenWithAlly: killAfterHiddenWithAlly,
      killsNearEnemyTurret: killsNearEnemyTurret,
      killsOnLanersEarlyJungleAsJungler: killsOnLanersEarlyJungleAsJungler,
      killsUnderOwnTurret: killsUnderOwnTurret,
      laneMinionsFirst10Minutes: laneMinionsFirst10Minutes,
      laningPhaseGoldExpAdvantage: laningPhaseGoldExpAdvantage,
      maxCsAdvantageOnLaneOpponent: maxCsAdvantageOnLaneOpponent,
      maxKillDeficit: maxKillDeficit,
      maxLevelLeadLaneOpponent: maxLevelLeadLaneOpponent,
      multikills: multikills,
      multikillsAfterAggressiveFlash: multikillsAfterAggressiveFlash,
      outnumberedKills: outnumberedKills,
      quickFirstTurret: quickFirstTurret,
      quickSoloKills: quickSoloKills,
      takedownOnFirstTurret: takedownOnFirstTurret,
      takedownsAfterGainingLevelAdvantage: takedownsAfterGainingLevelAdvantage,
      takedownsBeforeJungleMinionSpawn: takedownsBeforeJungleMinionSpawn,
      takedownsFirstXMinutes: takedownsFirstXMinutes,
      turretPlatesTaken: turretPlatesTaken,
      // Damage
      damagePerMinute: damagePerMinute,
      damageTakenOnTeamPercentage: damageTakenOnTeamPercentage.toFixed(1),
      teamDamagePercentage: teamDamagePercentage.toFixed(1),
      totalDamageDealtToChampions: totalDamageDealtToChampions,
      totalDamageTaken: totalDamageTaken,
      totalHeal: totalHeal,
      // Fight
      enemyChampionImmobilizations: enemyChampionImmobilizations,
      fullTeamTakedown: fullTeamTakedown,
      highestCrowdControlScore: highestCrowdControlScore,
      immobilizeAndKillWithAlly: immobilizeAndKillWithAlly,
      killedChampTookFullTeamDamageSurvived:
        killedChampTookFullTeamDamageSurvived,
      knockEnemyIntoTeamAndKill: knockEnemyIntoTeamAndKill,
      pickKillWithAlly: pickKillWithAlly,
      survivedThreeImmobilizesInFight: survivedThreeImmobilizesInFight,
      tookLargeDamageSurvived: tookLargeDamageSurvived,
      //Utility
      completeSupportQuestInTime: completeSupportQuestInTime,
      controlWardTimeCoverageInRiverOrEnemyHalf:
      controlWardTimeCoverageInRiverOrEnemyHalf.toFixed(0),
      controlWardsPlaced: controlWardsPlaced,
      effectiveHealAndShielding: effectiveHealAndShielding.toFixed(0),
      killParticipation: killParticipation,
      saveAllyFromDeath: saveAllyFromDeath,
      stealthWardsPlaced: stealthWardsPlaced,
      threeWardsOneSweeperCount: threeWardsOneSweeperCount,
      visionScoreAdvantageLaneOpponent: visionScorePerMinute,
      visionScorePerMinute: visionScore,
      assists: assists,
      visionScore: visionScore,
      //Split
      soloKills: soloKills,
      soloTurretsLategame:soloTurretsLategame,
      teamBaronKills:teamBaronKills,
      teamElderDragonKills:teamElderDragonKills,
      damageDealtToBuildings:damageDealtToBuildings,
      // Farm
      alliedJungleMonsterKills: alliedJungleMonsterKills,
      buffsStolen: buffsStolen,
      enemyJungleMonsterKills: enemyJungleMonsterKills,
      initialBuffCount: initialBuffCount,
      initialCrabCount: initialCrabCount,
      jungleCsBefore10Minutes: jungleCsBefore10Minutes,
      scuttleCrabKills: scuttleCrabKills,
    });

    return [
      (Lane/6.1).toFixed(0),
      (Damage / 5300).toFixed(0),
      (Fight / 3.355).toFixed(0),
      (Utility / 1.65).toFixed(0),
      (Split/2.6).toFixed(0),
      (Farm/5.8).toFixed(0),
      Objectives,
    ];
  };
  const call = () => {
    console.log(graph);
    console.log(hardData.maxCsAdvantageOnLaneOpponent);
  };
  useEffect(() => {
    setGraph(getChallenges());
  }, [matchDataState]);

  const dataTop = {
    labels: [
      "Lane",
      "Damage",
      "Fight",
      "Utility",
      "Split",
      "Farm",
      "Objectives",
    ],
    datasets: [
      {
        label: "Top Perfomace",
        data: [99, 99, 61, 26, 74, 99, 70],
        borderColor: "rgba(128, 0, 128, 1)",
        borderWidth: 1,
      },
    ],
  };
  const dataJungle = {
    labels: [
      "Fight",
      "Farm",
      "Invade",
      "Utility",
      "Objectives",
      "Steal",
      "Gank",
    ],
    datasets: [
      {
        label: "Jungle Peformace",
        //           top    farm jungle carry utility fight mid split
        data: [30, 30, 10, 10, 10, 10, 10],
        borderColor: "rgba(128, 0, 128, 1)",
        borderWidth: 1,
      },
    ],
  };
  const dataMid = {
    labels: ["Fight", "Lane", "Carry", "Utility", "Roaming", "Farm", "Split"],
    datasets: [
      {
        label: "Mid Peformace",
        //           top    farm jungle carry utility fight mid split
        data: [30, 30, 10, 10, 10, 10, 10],
        borderColor: "rgba(128, 0, 128, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scale: {
      ticks: {
        display: true,
        maxTicksLimit: 2,
      },
    },
  };
  const btnTop = () => {
    if (renderTop) {
      setRenderTop(false);
    } else {
      setRenderTop(true);
    }
  };
  const btnJg = () => {
    if (renderJungle) {
      setRenderJungle(false);
    } else {
      setRenderJungle(true);
    }
  };
  const btnMid = () => {
    if (renderMid) {
      setRenderMid(false);
    } else {
      setRenderMid(true);
    }
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
      <span>Hard Data</span>
      <S.HardData>
        <b>SoloQueues: {hardData.soloQueues}</b>
        <b>Lane</b>
        <p>
          earlyLaningPhaseGoldExpAdvantage:
          {hardData.earlyLaningPhaseGoldExpAdvantage}
        </p>
        <p>junglerKillsEarlyJungle:{hardData.junglerKillsEarlyJungle}</p>
        <p> killAfterHiddenWithAlly:{hardData.killAfterHiddenWithAlly}</p>
        <p> killsNearEnemyTurret:{hardData.killsNearEnemyTurret}</p>
        <p>
          killsOnLanersEarlyJungleAsJungler:
          {hardData.killsOnLanersEarlyJungleAsJungler}
        </p>
        <p> killsUnderOwnTurret:{hardData.killsUnderOwnTurret}</p>
        <p> laneMinionsFirst10Minutes:{hardData.laneMinionsFirst10Minutes}</p>
        <p>
          laningPhaseGoldExpAdvantage:{hardData.laningPhaseGoldExpAdvantage}
        </p>
        <p>
          maxCsAdvantageOnLaneOpponent:{hardData.maxCsAdvantageOnLaneOpponent}
        </p>
        <p> maxKillDeficit:{hardData.maxKillDeficit}</p>
        <p> maxLevelLeadLaneOpponent:{hardData.maxLevelLeadLaneOpponent}</p>

        <p> multikills:{hardData.multikills}</p>
        <p>
          multikillsAfterAggressiveFlash:
          {hardData.multikillsAfterAggressiveFlash}
        </p>
        <p> outnumberedKills:{hardData.outnumberedKills}</p>
        <p> quickFirstTurret:{hardData.quickFirstTurret}</p>
        <p> quickSoloKills:{hardData.quickSoloKills}</p>
        <p> takedownOnFirstTurret:{hardData.takedownOnFirstTurret}</p>
        <p>
          takedownsAfterGainingLevelAdvantage:
          {hardData.takedownsAfterGainingLevelAdvantage}
        </p>
        <p>
          takedownsBeforeJungleMinionSpawn:
          {hardData.takedownsBeforeJungleMinionSpawn}
        </p>
        <p> takedownsFirstXMinutes:{hardData.takedownsFirstXMinutes}</p>
        <p> turretPlatesTaken:{hardData.turretPlatesTaken}</p>
        <b>Damage</b>
        <p>damagePerMinute: {hardData.damagePerMinute}</p>
        <p>
          damageTakenOnTeamPercentage: {hardData.damageTakenOnTeamPercentage}
        </p>
        <p>teamDamagePercentage: {hardData.teamDamagePercentage}</p>
        <p>
          totalDamageDealtToChampions: {hardData.totalDamageDealtToChampions}
        </p>
        <p>totalDamageTaken: {hardData.totalDamageTaken}</p>
        <p>totalHeal: {hardData.totalHeal}</p>
        <b>Fight</b>
        <p>
          enemyChampionImmobilizations:{hardData.enemyChampionImmobilizations}
        </p>
        <p>fullTeamTakedown:{hardData.fullTeamTakedown}</p>
        <p>highestCrowdControlScore:{hardData.highestCrowdControlScore}</p>
        <p>immobilizeAndKillWithAlly:{hardData.immobilizeAndKillWithAlly}</p>
        <p>
          killedChampTookFullTeamDamageSurvived:
          {hardData.killedChampTookFullTeamDamageSurvived}
        </p>
        <p>knockEnemyIntoTeamAndKill:{hardData.knockEnemyIntoTeamAndKill}</p>
        <p>pickKillWithAlly:{hardData.pickKillWithAlly}</p>
        <p>
          survivedThreeImmobilizesInFight:
          {hardData.survivedThreeImmobilizesInFight}
        </p>
        <p>tookLargeDamageSurvived:{hardData.tookLargeDamageSurvived}</p>
        <b>Utility</b>
        <p>completeSupportQuestInTime:{hardData.completeSupportQuestInTime}</p>
        <p>
          controlWardTimeCoverageInRiverOrEnemyHalf:
          {hardData.controlWardTimeCoverageInRiverOrEnemyHalf}
        </p>
        <p>controlWardsPlaced:{hardData.controlWardsPlaced}</p>
        <p>effectiveHealAndShielding:{hardData.effectiveHealAndShielding}</p>
        <p>killParticipation:{hardData.killParticipation}</p>
        <p>saveAllyFromDeath:{hardData.saveAllyFromDeath}</p>
        <p>stealthWardsPlaced:{hardData.stealthWardsPlaced}</p>
        <p>threeWardsOneSweeperCount:{hardData.threeWardsOneSweeperCount}</p>
        <p>
          visionScoreAdvantageLaneOpponent:
          {hardData.visionScoreAdvantageLaneOpponent}
        </p>
        <p>visionScorePerMinute:{hardData.visionScorePerMinute}</p>
        <p>assists:{hardData.assists}</p>
        <p>visionScore:{hardData.visionScore}</p>
        <b>Split</b>
        <p>soloKills:{hardData.soloKills}</p>
        <p>soloTurretsLategame:{hardData.soloTurretsLategame}</p>
        <p>teamBaronKills:{hardData.teamBaronKills}</p>
        <p>teamElderDragonKills:{hardData.teamElderDragonKills}</p>
        <p>damageDealtToBuildings:{hardData.damageDealtToBuildings}</p>
        <b>Farm</b>
        <p> laneMinionsFirst10Minutes:{hardData.laneMinionsFirst10Minutes}</p>
        <p>alliedJungleMonsterKills:{hardData.alliedJungleMonsterKills}</p>
        <p>buffsStolen:{hardData.buffsStolen}</p>
        <p>enemyJungleMonsterKills:{hardData.enemyJungleMonsterKills}</p>
        <p>initialBuffCount:{hardData.initialBuffCount}</p>
        <p>initialCrabCount:{hardData.initialCrabCount}</p>
        <p>jungleCsBefore10Minutes:{hardData.jungleCsBefore10Minutes}</p>
        <p>scuttleCrabKills:{hardData.scuttleCrabKills}</p>
      </S.HardData>
      <span>Analyzer</span>
      <S.Roles>
        <button onClick={call}>Call</button>
        <button onClick={btnTop}>Top</button>
        <button onClick={btnJg}>Jungle</button>
        <button onClick={btnMid}>Mid</button>
      </S.Roles>
      <S.Graph>
        <div
          style={{
            position: "relative",
            margin: "auto",
            width: "350px",
          }}
        >
          {renderState ? (
            <>
              {renderTop ? (
                <>
                  <Radar data={dataTop} options={options} />
                </>
              ) : (
                <></>
              )}
              {renderJungle ? (
                <>
                  <Radar data={dataJungle} options={options} />
                </>
              ) : (
                <></>
              )}
              {renderMid ? (
                <>
                  <Radar data={dataMid} options={options} />
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </S.Graph>
    </S.Wrapper>
  );
};
export default Analyzer;
