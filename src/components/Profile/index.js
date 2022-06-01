import React from "react";
import useScout from "../../hooks/riot-hook";
import * as S from './styled'

const Profile = () => {

    const { scoutState } = useScout()

    console.log(scoutState)
    return(
        <S.Wrapper>
            <span>{scoutState.summonerName}</span>
        </S.Wrapper>
    )


}   
export default Profile