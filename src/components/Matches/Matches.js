import React, { useEffect, useState } from "react"
import useScout from "../../hooks/riot-hook"
import matchApi from "../../services/matchs-api"
import Matchitem from "../MatchItem/Matchitem"
import * as S from './styled'
const Matches = () => {
    const { matchState, setMatchState, getVersion, version, scoutState } = useScout()
    const [matchData, setMatchData] = useState(
            [{
                metadata:{gameId:'0'},
                info:{queueId:'0', gameCreation:'0',participants:
                [
                    {kills:'0',deaths:'0',assists:'0',championId:'0',summonerId:scoutState.id},{kills:'0',deaths:'0',assists:'0',championId:'0',summonerId:scoutState.id},
                    {kills:'0',deaths:'0',assists:'0',championId:'0',summonerId:scoutState.id},{kills:'0',deaths:'0',assists:'0',championId:'0',summonerId:scoutState.id},
                    {kills:'0',deaths:'0',assists:'0',championId:'0',summonerId:scoutState.id},{kills:'0',deaths:'0',assists:'0',championId:'0',summonerId:scoutState.id},
                    {kills:'0',deaths:'0',assists:'0',championId:'0',summonerId:scoutState.id},{kills:'0',deaths:'0',assists:'0',championId:'0',summonerId:scoutState.id},
                    {kills:'0',deaths:'0',assists:'0',championId:'0',summonerId:scoutState.id},{kills:'0',deaths:'0',assists:'0',championId:'0',summonerId:scoutState.id},


                ],gameMode:'0'}
            
            }]
    )
    const [champion, setChampion] = useState()
    const [queue, setQueue] = useState()


    getVersion()
    fetch(`http://ddragon.leagueoflegends.com/cdn/12.10.1/data/pt_BR/champion.json`)
    .then((response) => response.text()).then((x) => setChampion(JSON.parse(x)))
    fetch('https://static.developer.riotgames.com/docs/lol/queues.json')
    .then((response) => response.text()).then((x) => setQueue(JSON.parse(x)))




    const getMatchData = (matchId) => {
        matchApi.get(`lol/match/v5/matches/${matchId}?api_key=RGAPI-3ff69f05-592c-43e4-b1d8-b6a1b5159f56`)
            .then((response) => setMatchData((prevState) => [...prevState, response.data]))
    }
    useEffect(() => {
       
        /*
        matchState.matches.map((item) => {
            getMatchData(item)
        })
        */

    }, [matchState])




    const getChampName = (cid) => {
        var hero = champion.data
        for(var i in hero){
            if(hero[i].key == cid){
                return hero[i].image.full
            }
        }
    }


    const getQueue = (id) => {
        for(var i in queue){
            if(queue[i].queueId == id){
                return queue[i].description
            }
        }
    }

    const check = () => {
        matchData.map((item) => {
            console.log(item.info.participants[0].championId)
        })
        console.log(matchData)
    }

    const getIndex = (item) => {
        for(var i in item.info.participants){
            if(item.info.participants[i].summonerId == scoutState.id){
                return i
            }
        }
    }


    return (
        <S.Wrapper>
            <button onClick={check}>check</button>
            {matchState.searchCompleted ? (
                <>
                    {matchData.map((item) => (
                        <Matchitem
                            creationTime={item.info.gameCreation}
                            gameMode={getQueue(item.info.queueId)}
                            id={item.metadata.matchId}
                            champPic={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${getChampName(item.info.participants[getIndex(item)].championId)}`}
                            player1={item.info.participants[0].summonerName}
                            player2={item.info.participants[1].summonerName}
                            player3={item.info.participants[2].summonerName}
                            player4={item.info.participants[3].summonerName}
                            player5={item.info.participants[4].summonerName}

                            player6={item.info.participants[5].summonerName}
                            player7={item.info.participants[6].summonerName}
                            player8={item.info.participants[7].summonerName}
                            player9={item.info.participants[8].summonerName}
                            player10={item.info.participants[9].summonerName}

                            kills={item.info.participants[getIndex(item)].kills}
                            deaths={item.info.participants[getIndex(item)].deaths}
                            assists={item.info.participants[getIndex(item)].assists}

                        >
                        </Matchitem>

                    ))}
                </>
                )
                :
                (
                    <>
                    </>
                )}



        </S.Wrapper>
    )

}
export default Matches