import React, { useEffect, useState } from "react";
import useScout from "../../hooks/riot-hook";
import MasteryItem from "../MasteryItem/Masteryitem";
import * as S from './styled'

const Masteries = () => {

    const {masteriesState, scoutState, championState, version} = useScout() 
    const [champion, setChampion] = useState()

            fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/pt_BR/champion.json`)
            .then((response)=>response.text()).then((x)=> setChampion(JSON.parse(x)))

      const check = () => {
          //

        //

        console.log(getChampName('266'))


      }
      const getChampName = (cid) => {
        var hero = champion.data
        for(var i in hero){
            if(hero[i].key == cid){
                return hero[i].image.full
            }
        }
    }




    return(
        <S.Wrapper>
        {masteriesState.hasSearch?(<> {masteriesState.maestrias.map((item,index)=>(
            <li key={index}>
            <MasteryItem
            pic={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${getChampName(item.championId)}`}
            championLevel={item.championLevel}
            championPoints={item.championPoints}
            lastPlayTime={item.lastPlayTime}
            >

            </MasteryItem>
            </li>
        ))}</>):(<></>)}
       
       </S.Wrapper>
    )

}
export default Masteries
