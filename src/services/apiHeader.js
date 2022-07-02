import axios from "axios";

const apiHeader = axios.create({
baseURL:'https://br1.api.riotgames.com/'
});

export default apiHeader;