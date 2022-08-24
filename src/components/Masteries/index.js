import React, { useEffect, useState } from 'react'
import useScout from '../../hooks/riot-hook'
import MasteryItem from '../MasteryItem/Masteryitem'
import * as S from './styled'
const MasteriesNew = ({masteries}) => {
    const {version} = useScout()
    const [champions,setChampions] = useState()

    useEffect(()=>{
        console.log('version',version)
        const getChampions = async () =>{
          const fet = await  fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/pt_BR/champion.json`)
          const fettxt = await fet.text()
          setChampions(JSON.parse(fettxt))
        }
        getChampions()
    },[version])
        const getChampName = (cid) => {
            var hero = champions.data
            for(var i in hero){
                if(hero[i].key == cid){
                    return hero[i].image.full
                }
            }
        }
    const slicedMasteries = masteries.slice(0,3)


  return (
    <S.Wrapper>
        {slicedMasteries.map((item,index)=>(
            <MasteryItem key={index}
                pic={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${getChampName(item.championId)}`}
                championLevel={item.championLevel}
                championPoints={item.championPoints}
                lastPlayTime={item.lastPlayTime}
            />
        ))}
    </S.Wrapper>
  )
}

export default MasteriesNew