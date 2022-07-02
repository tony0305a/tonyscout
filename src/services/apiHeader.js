import axios from "axios";

const apiHeader = axios.create({
    headers:{
     
        "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
        "X-Riot-Token": "RGAPI-3ff69f05-592c-43e4-b1d8-b6a1b5159f56"
    },
baseURL:'https://br1.api.riotgames.com/'
});

export default apiHeader;