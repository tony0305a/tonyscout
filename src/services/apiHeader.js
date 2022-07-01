import axios from "axios";

const apiHeader = axios.create({
    headers:{
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.115 Safari/537.36 OPR/88.0.4412.53",
        "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Riot-Token": "RGAPI-3ff69f05-592c-43e4-b1d8-b6a1b5159f56"
    },
baseURL:'https://br1.api.riotgames.com/'
});

export default apiHeader;