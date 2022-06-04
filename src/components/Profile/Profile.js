import React from "react";
import { useEffect } from "react";
import useScout from "../../hooks/riot-hook";
import Masteries from "../Masteries/Masteries";
import * as S from './styled'

const Profile = () => {


    const { scoutState, getMasteries, masteriesState, version } = useScout()

    const profileIcon = `http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${scoutState.profileIconId}.png`


    return (
        <S.Wrapper>
            {scoutState.hasUser ?
                (<>
                    <S.SummonerInfo>
                        <span>{scoutState.name}</span>
                        <img src={profileIcon} width="112" />
                        <span>{scoutState.summonerLevel}</span>
                        <p>{scoutState.id}</p>
                        <p>{scoutState.puuid}</p>
                    </S.SummonerInfo>
                    <S.Mast>
                        <Masteries />
                    </S.Mast>

                </>)
                :
                (
                    <>
                        <span>Sem invocador</span>
                    </>)}


        </S.Wrapper>
    )


}
export default Profile