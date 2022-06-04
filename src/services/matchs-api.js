import axios from "axios";

const matchApi = axios.create({
    baseURL:'https://americas.api.riotgames.com/'
});
export default matchApi