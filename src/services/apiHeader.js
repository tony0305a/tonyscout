import axios from "axios";
const apiHeader = axios.create({
baseURL:'https://the-one-who-searches.herokuapp.com/'
});
export default apiHeader;