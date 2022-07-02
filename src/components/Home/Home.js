import React from "react";
import apiHeader from "../../services/apiHeader";
import { Tracker } from "../Tracker/Tracker";
import * as S from './styled';
import axios from "axios";
export const Home = () =>{
    const options = {
        method: 'GET',
        url: 'https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/TonyLee',
        headers: {'X-Riot-Token': 'RGAPI-3ff69f05-592c-43e4-b1d8-b6a1b5159f56'}
      };

    const call = () =>{
        axios.request(options).then(function (response) {
            console.log(response.data);
          }).catch(function (error) {
            console.error(error);
          });

        /*
        apiHeader.get('lol/summoner/v4/summoners/by-name/TonyLee')
        .then((res)=>console.log(res))
        */
    }

    return(
        <>
        <S.Wrapper>
            <span>Bem-Vindos(a)s</span>
            <button onClick={call}>Call</button>
        </S.Wrapper>
        </>
    )
}