import React, { useEffect, useState } from "react";
import useScout from "../../hooks/riot-hook";
import * as S from "./styled";
import { Radar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  ArcElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Analyzer = () => {
  const {
    matchDataState,
    scoutState,
    renderState,
    rankedState,
    graphState,
    setGraphs,
  } = useScout();
  const [graph, setGraph] = useState([]);
  const [roles, setRoles] = useState([]);
  const [renderTop, setRenderTop] = useState(false);
  const [eloMultiplaier, setEloMultiplaier] = useState(0.2);
  const [hardData, setHardData] = useState({
    soloQueues: 0,
    kills: 0,
    deaths: 0,
    assists: 0,
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
    turretTakedowns: 0,
    turretsTakenWithRiftHerald: 0,
  });
  const getIndex = (item) => {
    for (var i in item.info.participants) {
      if (item.info.participants[i].summonerId === scoutState.id) {
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
      if (item.info.queueId === 420) {
        if (
          item.info.participants[getIndex(item)].individualPosition === "TOP"
        ) {
          top += 1;
        } else if (
          item.info.participants[getIndex(item)].individualPosition === "JUNGLE"
        ) {
          jungle += 1;
        } else if (
          item.info.participants[getIndex(item)].individualPosition === "MIDDLE"
        ) {
          mid += 1;
        } else if (
          item.info.participants[getIndex(item)].individualPosition === "BOTTOM"
        ) {
          ad += 1;
        } else if (
          item.info.participants[getIndex(item)].individualPosition ===
          "UTILITY"
        ) {
          sup += 1;
        }
      }
    });
    setRoles([top, jungle, mid, ad, sup]);
  };
  const getChallenges = () => {
    var soloQ = 0;
    var kills = 0;
    var deaths = 0;
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
    var alliedJungleMonsterKills = 0;
    var buffsStolen = 0;
    var enemyJungleMonsterKills = 0;
    var initialBuffCount = 0;
    var initialCrabCount = 0;
    var jungleCsBefore10Minutes = 0;
    var scuttleCrabKills = 0;
    //Objectives
    var baronTakedowns = 0;
    var dragonTakedowns = 0;
    var epicMonsterKillsNearEnemyJungler = 0;
    var epicMonsterKillsWithin30SecondsOfSpawn = 0;
    var epicMonsterSteals = 0;
    var epicMonsterStolenWithoutSmite = 0;
    var junglerTakedownsNearDamagedEpicMonster = 0;
    var kTurretsDestroyedBeforePlatesFall = 0;
    var multiTurretRiftHeraldCount = 0;
    var outnumberedNexusKill = 0;
    var perfectDragonSoulsTaken = 0;
    var riftHeraldTakedowns = 0;
    var soloBaronKills = 0;
    var turretTakedowns = 0;
    var turretsTakenWithRiftHerald = 0;
    var neutralMinionsKilled = 0;
    var totalMinionsKilled = 0;
    var timePlayed = 0;
    if(matchDataState != undefined){
    matchDataState.map((item) => {
      if (item.info.participants !== undefined) {
        if (
          item.info.participants[getIndex(item)].challenges !== undefined &&
          item.info.queueId === 420
        ) {
          soloQ += 1;
          soloKills += parseInt(
            item.info.participants[getIndex(item)].challenges.soloKills
          );

          if (junglerKillsEarlyJungle !== 0) {
            junglerKillsEarlyJungle +=
              item.info.participants[getIndex(item)].challenges
                .junglerKillsEarlyJungle;
          }
          if (item.info.participants[getIndex(item)].timePlayed) {
            timePlayed += parseInt(
              item.info.participants[getIndex(item)].timePlayed
            );
          }
          if (item.info.participants[getIndex(item)].neutralMinionsKilled) {
            neutralMinionsKilled += parseInt(
              item.info.participants[getIndex(item)].neutralMinionsKilled
            );
          }
          if (item.info.participants[getIndex(item)].totalMinionsKilled) {
            totalMinionsKilled += parseInt(
              item.info.participants[getIndex(item)].totalMinionsKilled
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges.dragonTakedowns
          ) {
            dragonTakedowns += parseInt(
              item.info.participants[getIndex(item)].challenges.dragonTakedowns
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .riftHeraldTakedowns
          ) {
            riftHeraldTakedowns += parseInt(
              item.info.participants[getIndex(item)].challenges
                .riftHeraldTakedowns
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .killAfterHiddenWithAlly
          ) {
            killAfterHiddenWithAlly += parseInt(
              item.info.participants[getIndex(item)].challenges
                .killAfterHiddenWithAlly
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .killsNearEnemyTurret
          ) {
            killsNearEnemyTurret += parseInt(
              item.info.participants[getIndex(item)].challenges
                .killsNearEnemyTurret
            );
          }
          if (killsOnLanersEarlyJungleAsJungler) {
            killsOnLanersEarlyJungleAsJungler += parseInt(
              item.info.participants[getIndex(item)].challenges
                .killsOnLanersEarlyJungleAsJungler
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .killsUnderOwnTurret
          ) {
            killsUnderOwnTurret += parseInt(
              item.info.participants[getIndex(item)].challenges
                .killsUnderOwnTurret
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .laneMinionsFirst10Minutes
          ) {
            laneMinionsFirst10Minutes += parseInt(
              item.info.participants[getIndex(item)].challenges
                .laneMinionsFirst10Minutes
            );
          }
          if (laningPhaseGoldExpAdvantage) {
            laningPhaseGoldExpAdvantage += parseInt(
              item.info.participants[getIndex(item)].challenges
                .laningPhaseGoldExpAdvantage
            );
          }
          if (maxCsAdvantageOnLaneOpponent !== 0) {
            maxCsAdvantageOnLaneOpponent += parseInt(
              item.info.participants[getIndex(item)].challenges
                .maxCsAdvantageOnLaneOpponent
            );
          }

          maxKillDeficit += parseInt(
            item.info.participants[getIndex(item)].challenges.maxKillDeficit
          );
          if (maxLevelLeadLaneOpponent) {
            maxLevelLeadLaneOpponent += parseInt(
              item.info.participants[getIndex(item)].challenges
                .maxLevelLeadLaneOpponent
            );
          }
          if (item.info.participants[getIndex(item)].challenges.multikills) {
            multikills += parseInt(
              item.info.participants[getIndex(item)].challenges.multikills
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .multikillsAfterAggressiveFlash
          ) {
            multikillsAfterAggressiveFlash += parseInt(
              item.info.participants[getIndex(item)].challenges
                .multikillsAfterAggressiveFlash
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges.outnumberedKills
          ) {
            outnumberedKills += parseInt(
              item.info.participants[getIndex(item)].challenges.outnumberedKills
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges.quickFirstTurret
          ) {
            quickFirstTurret += parseInt(
              item.info.participants[getIndex(item)].challenges.quickFirstTurret
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges.quickSoloKills
          ) {
            quickSoloKills += parseInt(
              item.info.participants[getIndex(item)].challenges.quickSoloKills
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .takedownOnFirstTurret
          ) {
            takedownOnFirstTurret += parseInt(
              item.info.participants[getIndex(item)].challenges
                .takedownOnFirstTurret
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .takedownsAfterGainingLevelAdvantage
          ) {
            takedownsAfterGainingLevelAdvantage += parseInt(
              item.info.participants[getIndex(item)].challenges
                .takedownsAfterGainingLevelAdvantage
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .takedownsBeforeJungleMinionSpawn
          ) {
            takedownsBeforeJungleMinionSpawn += parseInt(
              item.info.participants[getIndex(item)].challenges
                .takedownsBeforeJungleMinionSpawn
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .takedownsFirstXMinutes
          ) {
            takedownsFirstXMinutes += parseInt(
              item.info.participants[getIndex(item)].challenges
                .takedownsFirstXMinutes
            );
          }
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
              .enemyChampionImmobilizations !== 0
          ) {
            enemyChampionImmobilizations += parseInt(
              item.info.participants[getIndex(item)].challenges
                .enemyChampionImmobilizations
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .fullTeamTakedown !== 0
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
              .immobilizeAndKillWithAlly
          ) {
            immobilizeAndKillWithAlly += parseInt(
              item.info.participants[getIndex(item)].challenges
                .immobilizeAndKillWithAlly
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .killedChampTookFullTeamDamageSurvived
          ) {
            killedChampTookFullTeamDamageSurvived += parseInt(
              item.info.participants[getIndex(item)].challenges
                .killedChampTookFullTeamDamageSurvived
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .knockEnemyIntoTeamAndKill
          ) {
            knockEnemyIntoTeamAndKill += parseInt(
              item.info.participants[getIndex(item)].challenges
                .knockEnemyIntoTeamAndKill
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges.pickKillWithAlly
          ) {
            pickKillWithAlly += parseInt(
              item.info.participants[getIndex(item)].challenges.pickKillWithAlly
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .survivedThreeImmobilizesInFight
          ) {
            survivedThreeImmobilizesInFight += parseInt(
              item.info.participants[getIndex(item)].challenges
                .survivedThreeImmobilizesInFight
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .tookLargeDamageSurvived
          ) {
            tookLargeDamageSurvived += parseInt(
              item.info.participants[getIndex(item)].challenges
                .tookLargeDamageSurvived
            );
          }

          if (
            item.info.participants[getIndex(item)].challenges
              .completeSupportQuestInTime
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
              .controlWardsPlaced
          ) {
            controlWardsPlaced += parseFloat(
              item.info.participants[getIndex(item)].challenges
                .controlWardsPlaced
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .effectiveHealAndShielding
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
            item.info.participants[getIndex(item)].challenges.saveAllyFromDeath
          ) {
            saveAllyFromDeath += parseInt(
              item.info.participants[getIndex(item)].challenges
                .saveAllyFromDeath
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .stealthWardsPlaced
          ) {
            stealthWardsPlaced += parseInt(
              item.info.participants[getIndex(item)].challenges
                .stealthWardsPlaced
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .threeWardsOneSweeperCount
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
            item.info.participants[getIndex(item)].challenges.soloKills
          ) {
            soloKills += parseInt(
              item.info.participants[getIndex(item)].challenges.soloKills
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .soloTurretsLategame
          ) {
            soloTurretsLategame += parseInt(
              item.info.participants[getIndex(item)].challenges
                .soloTurretsLategame
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges.teamBaronKills
            
          ) {
            teamBaronKills += parseInt(
              item.info.participants[getIndex(item)].challenges.teamBaronKills
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .teamElderDragonKills
          ) {
            teamElderDragonKills += parseInt(
              item.info.participants[getIndex(item)].challenges
                .teamElderDragonKills
            );
          }
          if (
            item.info.participants[getIndex(item)].damageDealtToBuildings
          ) {
            damageDealtToBuildings += parseInt(
              item.info.participants[getIndex(item)].damageDealtToBuildings
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .alliedJungleMonsterKills
          ) {
            alliedJungleMonsterKills += parseInt(
              item.info.participants[getIndex(item)].challenges
                .alliedJungleMonsterKills
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges.buffsStolen
          ) {
            buffsStolen += parseInt(
              item.info.participants[getIndex(item)].challenges.buffsStolen
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .enemyJungleMonsterKills
          ) {
            enemyJungleMonsterKills += parseInt(
              item.info.participants[getIndex(item)].challenges
                .enemyJungleMonsterKills
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .initialBuffCount
          ) {
            initialBuffCount += parseInt(
              item.info.participants[getIndex(item)].challenges.initialBuffCount
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .initialCrabCount
          ) {
            initialCrabCount += parseInt(
              item.info.participants[getIndex(item)].challenges.initialCrabCount
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .jungleCsBefore10Minutes
          ) {
            jungleCsBefore10Minutes += parseInt(
              item.info.participants[getIndex(item)].challenges
                .jungleCsBefore10Minutes
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .scuttleCrabKills
          ) {
            scuttleCrabKills += parseInt(
              item.info.participants[getIndex(item)].challenges.scuttleCrabKills
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges.baronTakedowns
          ) {
            baronTakedowns += parseInt(
              item.info.participants[getIndex(item)].challenges.baronTakedowns
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .epicMonsterKillsNearEnemyJungler
          ) {
            epicMonsterKillsNearEnemyJungler += parseInt(
              item.info.participants[getIndex(item)].challenges
                .epicMonsterKillsNearEnemyJungler
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .epicMonsterKillsWithin30SecondsOfSpawn
          ) {
            epicMonsterKillsWithin30SecondsOfSpawn += parseInt(
              item.info.participants[getIndex(item)].challenges
                .epicMonsterKillsWithin30SecondsOfSpawn
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .epicMonsterSteals
          ) {
            epicMonsterSteals += parseInt(
              item.info.participants[getIndex(item)].challenges
                .epicMonsterSteals
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .epicMonsterStolenWithoutSmite
          ) {
            epicMonsterStolenWithoutSmite += parseInt(
              item.info.participants[getIndex(item)].challenges
                .epicMonsterStolenWithoutSmite
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .junglerTakedownsNearDamagedEpicMonster
          ) {
            junglerTakedownsNearDamagedEpicMonster += parseInt(
              item.info.participants[getIndex(item)].challenges
                .junglerTakedownsNearDamagedEpicMonster
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .kTurretsDestroyedBeforePlatesFall
          ) {
            kTurretsDestroyedBeforePlatesFall += parseInt(
              item.info.participants[getIndex(item)].challenges
                .kTurretsDestroyedBeforePlatesFall
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .multiTurretRiftHeraldCount
          ) {
            multiTurretRiftHeraldCount += parseInt(
              item.info.participants[getIndex(item)].challenges
                .multiTurretRiftHeraldCount
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .outnumberedNexusKill
          ) {
            outnumberedNexusKill += parseInt(
              item.info.participants[getIndex(item)].challenges
                .outnumberedNexusKill
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .perfectDragonSoulsTaken
          ) {
            perfectDragonSoulsTaken += parseInt(
              item.info.participants[getIndex(item)].challenges
                .perfectDragonSoulsTaken
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges.soloBaronKills
          ) {
            soloBaronKills += parseInt(
              item.info.participants[getIndex(item)].challenges.soloBaronKills
            );
          }

          if (
            item.info.participants[getIndex(item)].challenges
              .takedownOnFirstTurret
          ) {
            takedownOnFirstTurret += parseInt(
              item.info.participants[getIndex(item)].challenges
                .takedownOnFirstTurret
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .turretTakedowns
          ) {
            turretTakedowns += parseInt(
              item.info.participants[getIndex(item)].challenges.turretTakedowns
            );
          }
          if (
            item.info.participants[getIndex(item)].challenges
              .turretsTakenWithRiftHerald
          ) {
            turretsTakenWithRiftHerald += parseInt(
              item.info.participants[getIndex(item)].challenges
                .turretsTakenWithRiftHerald
            );
          }
          if (item.info.participants[getIndex(item)].kills) {
            kills += parseInt(item.info.participants[getIndex(item)].kills);
          }
          if (item.info.participants[getIndex(item)].deaths) {
            deaths += parseInt(item.info.participants[getIndex(item)].deaths);
          }
        }
      }
    });
  }
    if (rankedState.searchCompleted) {
      if (rankedState.ranked[0] != undefined) {
        var sq = rankedState.ranked[0];
        if (sq.queueType !== "RANKED_SOLO_5x5") {
          sq = rankedState.ranked[1];
        }
        if (sq.tier === "IRON") {
          setEloMultiplaier(0.2);
        } else if (sq.tier === "BRONZE") {
          setEloMultiplaier(0.3);
        } else if (sq.tier === "SIVER") {
          setEloMultiplaier(0.4);
        } else if (sq.tier === "GOLD") {
          setEloMultiplaier(0.5);
        } else if (sq.tier === "PLATINUM") {
          setEloMultiplaier(0.6);
        } else if (sq.tier === "DIAMOND") {
          setEloMultiplaier(0.7);
        } else if (sq.tier === "MASTER") {
          setEloMultiplaier(0.8);
        } else if (sq.tier === "GRANDMASTER") {
          setEloMultiplaier(0.9);
        } else if (sq.tier === "CHALLENGER") {
          setEloMultiplaier(1);
        }
      }
    }

    var buildLaneSoloKills = 0;
    var buildLaneTurrent = 0;
    var buildLaneFarm = 0;
    var buildLaneMultiKills = 0;
    var buildLaneFirstTurrent = 0;
    var buildLaneTakedownsFirstXMinutes = 0;
    var buildLanePlates = 0;
    var buildLaneKda = 0;
    var buildLaneOutNumbered = 0;
    var buildLaneKillsAfterHide = 0;

    var buildFightEnemyChampionsImmo = 0;
    var buildFightFullTeamTakedown = 0;
    var buildFightHighestCrowdControlScore = 0;
    var buildFightImmobilizeAndKillWithAlly = 0;
    var buildFightKnockEnemyIntoTeamAndKill = 0;
    var buildFightPickKillWithAlly = 0;
    var buildFightSurvivedThreeImmobilizesInFight = 0;
    var buildFightTookLargeDamageSurvived = 0;
    var buildFightDamgeTankHeal = 0;

    var buildUtilityCompleteSupportQuestInTime = 0;
    var buildUtilityControlWardsPlaced = 0;
    var buildUtilityEffectiveHealAndShielding = 0;
    var buildUtilityKillParticipation = 0;
    var buildUtilitySaveAllyFromDeath = 0;
    var buildUtilityStealthWardsPlaced = 0;
    var buildUtilityVisionScoreAdvantageLaneOpponent = 0;
    var buildUtilityVisionScore = 0;
    var buildUtilityAssists = 0;

    var buildSplitSoloKills = 0;
    var buildSplitSoloTurrentsLateGame = 0;
    var buildSplitTeamBarons = 0;
    //   var buildSplitTeamElderDragons = 0;
    var buildSplitDamageDealtToBuildings = 0;

    var buildFarmXminCs = 0;
    var buildFarmConstant = 0;

    var buildObjectivesTakedowns = 0;
    var buildObjectivesBuildings = 0;
    var buildObjectivesSteals = 0;

    //Lane
    if (soloKills / soloQ >= 1) {
      buildLaneSoloKills = 1;
    } else {
      buildLaneSoloKills = soloKills / soloQ;
    }
    if ((killsNearEnemyTurret + killsUnderOwnTurret) / soloQ >= 1) {
      buildLaneTurrent = 1;
    } else {
      buildLaneTurrent = (killsNearEnemyTurret + killsUnderOwnTurret) / soloQ;
    }
    if (laneMinionsFirst10Minutes / soloQ / 100 >= 1) {
      buildLaneFarm = 1;
    } else {
      buildLaneFarm = laneMinionsFirst10Minutes / soloQ / 100;
    }
    if ((multikills + multikillsAfterAggressiveFlash) / soloQ >= 1) {
      buildLaneMultiKills = 1;
    } else {
      buildLaneMultiKills =
        (multikills + multikillsAfterAggressiveFlash) / soloQ;
    }
    if (takedownOnFirstTurret / 10 >= 1) {
      buildLaneFirstTurrent = 1;
    } else {
      buildLaneFirstTurrent = takedownOnFirstTurret / 10;
    }
    if (takedownsFirstXMinutes / 10 >= 1) {
      buildLaneTakedownsFirstXMinutes = 1;
    } else {
      buildLaneTakedownsFirstXMinutes = takedownsFirstXMinutes / 10;
    }
    if (turretPlatesTaken / 100 >= 1) {
      buildLanePlates = 1;
    } else {
      buildLanePlates = turretPlatesTaken / 100;
    }
    if ((kills + assists) / soloQ / 10 >= 1) {
      buildLaneKda = 1;
    } else {
      buildLaneKda = (kills + assists) / soloQ / 100;
    }
    if (outnumberedKills / soloQ >= 1) {
      buildLaneOutNumbered = 1;
    } else {
      buildLaneOutNumbered = outnumberedKills / soloQ;
    }
    if (killAfterHiddenWithAlly / (soloQ * 2) >= 1) {
      buildLaneKillsAfterHide = 1;
    } else {
      buildLaneKillsAfterHide = killAfterHiddenWithAlly / (soloQ * 2);
    }
    //Fight
    if (enemyChampionImmobilizations / soloQ / 20 >= 1) {
      buildFightEnemyChampionsImmo = 1;
    } else {
      buildFightEnemyChampionsImmo = enemyChampionImmobilizations / soloQ / 20;
    }
    if (fullTeamTakedown / soloQ >= 1) {
      buildFightFullTeamTakedown = 1;
    } else {
      buildFightFullTeamTakedown = fullTeamTakedown / soloQ;
    }
    if (highestCrowdControlScore / soloQ >= 1) {
      buildFightHighestCrowdControlScore = 1;
    } else {
      buildFightHighestCrowdControlScore = highestCrowdControlScore / soloQ;
    }
    if (immobilizeAndKillWithAlly / soloQ / 5 >= 1) {
      buildFightImmobilizeAndKillWithAlly = 1;
    } else {
      buildFightImmobilizeAndKillWithAlly =
        immobilizeAndKillWithAlly / soloQ / 5;
    }
    if (knockEnemyIntoTeamAndKill / soloQ / 5 >= 1) {
      buildFightKnockEnemyIntoTeamAndKill = 1;
    } else {
      buildFightKnockEnemyIntoTeamAndKill =
        knockEnemyIntoTeamAndKill / soloQ / 5;
    }
    if (pickKillWithAlly / soloQ / 10 >= 1) {
      buildFightPickKillWithAlly = 1;
    } else {
      buildFightPickKillWithAlly = pickKillWithAlly / soloQ / 10;
    }
    if (survivedThreeImmobilizesInFight / soloQ >= 2) {
      buildFightSurvivedThreeImmobilizesInFight = 2;
    } else {
      buildFightSurvivedThreeImmobilizesInFight =
        survivedThreeImmobilizesInFight / soloQ;
    }
    if (
      (totalDamageDealtToChampions + totalDamageTaken + totalHeal) /
        soloQ /
        50000 >=
      1
    ) {
      buildFightDamgeTankHeal = 1;
    } else {
      buildFightDamgeTankHeal =
        (totalDamageDealtToChampions + totalDamageTaken + totalHeal) /
        soloQ /
        50000;
    }
    if (completeSupportQuestInTime / soloQ >= 1) {
      buildUtilityCompleteSupportQuestInTime = 1;
    } else {
      buildUtilityCompleteSupportQuestInTime =
        completeSupportQuestInTime / soloQ;
    }
    if (
      (controlWardsPlaced + controlWardTimeCoverageInRiverOrEnemyHalf) /
        soloQ /
        5 >=
      1
    ) {
      buildUtilityControlWardsPlaced = 1;
    } else {
      buildUtilityControlWardsPlaced =
        (controlWardsPlaced + controlWardTimeCoverageInRiverOrEnemyHalf) /
        soloQ /
        5;
    }
    if (effectiveHealAndShielding / soloQ / 10000 >= 1) {
      buildUtilityEffectiveHealAndShielding = 1;
    } else {
      buildUtilityEffectiveHealAndShielding =
        effectiveHealAndShielding / soloQ / 10000;
    }
    if (killParticipation / soloQ >= 1) {
      buildUtilityKillParticipation = 1;
    } else {
      buildUtilityKillParticipation = killParticipation / soloQ;
    }
    if (saveAllyFromDeath / soloQ >= 1) {
      buildUtilitySaveAllyFromDeath = 1;
    } else {
      buildUtilitySaveAllyFromDeath = saveAllyFromDeath / soloQ;
    }
    if (stealthWardsPlaced / soloQ / 5 >= 1) {
      buildUtilityStealthWardsPlaced = 1;
    } else {
      buildUtilityStealthWardsPlaced = stealthWardsPlaced / soloQ / 5;
    }
    if (
      (threeWardsOneSweeperCount + visionScoreAdvantageLaneOpponent) / soloQ >=
      1
    ) {
      buildUtilityVisionScoreAdvantageLaneOpponent = 1;
    } else {
      buildUtilityVisionScoreAdvantageLaneOpponent =
        (threeWardsOneSweeperCount + visionScoreAdvantageLaneOpponent) / soloQ;
    }
    if (visionScore / soloQ / 20 >= 1) {
      buildUtilityVisionScore = 1;
    } else {
      buildUtilityVisionScore = visionScore / soloQ / 20;
    }
    if (assists / soloQ / 6 >= 2) {
      buildUtilityAssists = 2;
    } else {
      buildUtilityAssists = assists / soloQ / 6;
    }
    if (soloKills / soloQ >= 4) {
      buildSplitSoloKills = 4;
    } else {
      buildSplitSoloKills = soloKills / soloQ;
    }
    if (soloTurretsLategame / soloQ >= 2) {
      buildSplitSoloTurrentsLateGame = 2;
    } else {
      buildSplitSoloTurrentsLateGame = soloTurretsLategame / soloQ;
    }
    if ((teamBaronKills + teamElderDragonKills) / soloQ >= 1) {
      buildSplitTeamBarons = 1;
    } else {
      buildSplitTeamBarons = (teamBaronKills + teamElderDragonKills) / soloQ;
    }
    if (damageDealtToBuildings / soloQ / 1000 >= 3) {
      buildSplitDamageDealtToBuildings = 3;
    } else {
      buildSplitDamageDealtToBuildings = damageDealtToBuildings / soloQ / 1000;
    }
    if (
      (laneMinionsFirst10Minutes + jungleCsBefore10Minutes) / soloQ / 14 >=
      5
    ) {
      buildFarmXminCs = 5;
    } else {
      buildFarmXminCs =
        (laneMinionsFirst10Minutes + jungleCsBefore10Minutes) / soloQ / 14;
    }
    if ((totalMinionsKilled + neutralMinionsKilled) / (timePlayed / 60) >= 5) {
      buildFarmConstant = 5;
    } else {
      buildFarmConstant =
        (totalMinionsKilled + neutralMinionsKilled) / (timePlayed / 60);
    }
    if (
      (baronTakedowns +
        dragonTakedowns +
        riftHeraldTakedowns +
        soloBaronKills +
        perfectDragonSoulsTaken) /
        soloQ >=
      3
    ) {
      buildObjectivesTakedowns = 3;
    } else {
      buildObjectivesTakedowns =
        (baronTakedowns +
          dragonTakedowns +
          riftHeraldTakedowns +
          perfectDragonSoulsTaken) /
        soloQ;
    }
    if (
      (turretTakedowns +
        turretsTakenWithRiftHerald +
        kTurretsDestroyedBeforePlatesFall +
        outnumberedNexusKill +
        multiTurretRiftHeraldCount) /
        soloQ >=
      6
    ) {
      buildObjectivesBuildings = 6;
    } else {
      buildObjectivesBuildings =
        (turretTakedowns +
          turretsTakenWithRiftHerald +
          kTurretsDestroyedBeforePlatesFall +
          outnumberedNexusKill +
          multiTurretRiftHeraldCount) /
        soloQ;
    }
    if (
      (epicMonsterKillsNearEnemyJungler +
        epicMonsterSteals +
        epicMonsterStolenWithoutSmite) /
        soloQ >=
      1
    ) {
      buildObjectivesSteals = 1;
    } else {
      buildObjectivesSteals =
        (epicMonsterKillsNearEnemyJungler +
          epicMonsterSteals +
          epicMonsterStolenWithoutSmite) /
        soloQ;
    }

    var finalLane =
      buildLaneSoloKills +
      buildLaneTurrent +
      buildLaneFarm +
      buildLaneMultiKills +
      buildLaneFirstTurrent +
      buildLaneTakedownsFirstXMinutes +
      buildLanePlates +
      buildLaneKda +
      buildLaneOutNumbered +
      buildLaneKillsAfterHide;

    var finalFight =
      buildFightEnemyChampionsImmo +
      buildFightFullTeamTakedown +
      buildFightFullTeamTakedown +
      buildFightImmobilizeAndKillWithAlly +
      buildFightKnockEnemyIntoTeamAndKill +
      buildFightPickKillWithAlly +
      buildFightSurvivedThreeImmobilizesInFight +
      buildFightTookLargeDamageSurvived +
      buildFightDamgeTankHeal;

    var finalUtility =
      buildUtilityCompleteSupportQuestInTime +
      buildUtilityControlWardsPlaced +
      buildUtilityEffectiveHealAndShielding +
      buildUtilitySaveAllyFromDeath +
      buildUtilityKillParticipation +
      buildUtilityStealthWardsPlaced +
      buildUtilityVisionScoreAdvantageLaneOpponent +
      buildUtilityVisionScore +
      buildUtilityAssists;

    var finalSplit =
      buildSplitSoloKills +
      buildSplitSoloTurrentsLateGame +
      buildSplitTeamBarons +
      buildSplitDamageDealtToBuildings;

    var finalFarm = buildFarmXminCs + buildFarmConstant;
    var finalObjectives =
      buildObjectivesTakedowns +
      buildObjectivesBuildings +
      buildObjectivesSteals;

    var Lane = finalLane;

    var Fight = finalFight;

    var Utility = finalUtility;

    var Split = finalSplit;

    var Farm = finalFarm;

    var Objectives = finalObjectives;

    setHardData({
      soloQueues: soloQ,
      timePlayed: timePlayed,
      kills: kills,
      deaths: deaths,
      assists: assists,
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
      visionScore: visionScore,
      //Split
      soloKills: soloKills,
      soloTurretsLategame: soloTurretsLategame,
      teamBaronKills: teamBaronKills,
      teamElderDragonKills: teamElderDragonKills,
      damageDealtToBuildings: damageDealtToBuildings,
      // Farm
      alliedJungleMonsterKills: alliedJungleMonsterKills,
      buffsStolen: buffsStolen,
      enemyJungleMonsterKills: enemyJungleMonsterKills,
      initialBuffCount: initialBuffCount,
      initialCrabCount: initialCrabCount,
      jungleCsBefore10Minutes: jungleCsBefore10Minutes,
      scuttleCrabKills: scuttleCrabKills,
      neutralMinionsKilled: neutralMinionsKilled,
      totalMinionsKilled: totalMinionsKilled,
      //Objectives
      baronTakedowns: baronTakedowns,
      dragonTakedowns: dragonTakedowns,
      epicMonsterKillsNearEnemyJungler: epicMonsterKillsNearEnemyJungler,
      epicMonsterKillsWithin30SecondsOfSpawn:
        epicMonsterKillsWithin30SecondsOfSpawn,
      epicMonsterSteals: epicMonsterSteals,
      epicMonsterStolenWithoutSmite: epicMonsterStolenWithoutSmite,
      junglerTakedownsNearDamagedEpicMonster:
        junglerTakedownsNearDamagedEpicMonster,
      kTurretsDestroyedBeforePlatesFall: kTurretsDestroyedBeforePlatesFall,
      multiTurretRiftHeraldCount: multiTurretRiftHeraldCount,
      outnumberedNexusKill: outnumberedKills,
      perfectDragonSoulsTaken: perfectDragonSoulsTaken,
      riftHeraldTakedowns: riftHeraldTakedowns,
      soloBaronKills: soloBaronKills,
      turretTakedowns: turretTakedowns,
      turretsTakenWithRiftHerald: turretsTakenWithRiftHerald,
    });
    return setGraph([
      parseInt((Lane * 10 * eloMultiplaier).toFixed(0)),
      parseInt((Fight * 10 * eloMultiplaier).toFixed(0)),
      parseInt((Utility * 10 * eloMultiplaier).toFixed(0)),
      parseInt((Split * 10 * eloMultiplaier).toFixed(0)),
      parseInt((Farm * 10 * eloMultiplaier).toFixed(0)),
      parseInt((Objectives * 10 * eloMultiplaier).toFixed(0)),
    ]);
  };
  useEffect(() => {
    getChallenges();
    getRoles();
  }, [matchDataState]);
  useEffect(() => {
    setGraphs(graph);
    // console.log(graphState);
  }, [graph]);

  const dataTop = {
    labels: ["Lane", "Fight", "Utility", "Split", "Farm", "Objectives"],
    datasets: [
      {
        label: "Solo/Duo Perfomace",
        data: graph,
        borderColor: "rgba(128, 0, 128, 1)",
        backgroundColor: "rgba(128,0,128,0.4)",
        borderWidth: 1,
      },
    ],
  };
  const dataRoles = {
    labels: ["Top", "Jungle", "Mid", "Carry", "Utility"],
    datasets: [
      {
        label: "Roles",
        data: roles,
        backgroundColor: [
          "rgba(255, 0, 0, 1)",
          "rgba(0, 120, 0, 1)",
          "rgba(0, 0, 255, 1)",
          "rgba(255, 255, 0, 1)",
          "rgba(128, 0, 128, 1)",
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

  const options = {
    responsive: true,
    scale: {
      suggestedMax: 100,
      suggestedMin: 0,
      ticks: {
        display: true,
        maxTicksLimit: 2,
      },
    },
  };
  const optionsRoles = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Games played ${hardData.soloQueues}`,
      },
    },
  };

  return (
    <S.Wrapper>
      <S.GraphRoles>
      <div
          style={{
            position: "relative",
            margin: "0",
            width: "200px",
          }}
        >
        <Doughnut options={optionsRoles} data={dataRoles} />
        </div>
      </S.GraphRoles>

      <S.Roles></S.Roles>
      <S.Graph>
        <div
          style={{
            position: "relative",
            margin: "auto",
            width: "250px",
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
