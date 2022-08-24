import axios from "axios";

var dev = true

if(dev){
  var url = 'http://localhost:1337/'
} else {
  url = 'https://the-one-who-searches.herokuapp.com/'
}

const apiHeader = axios.create({
  baseURL: url,
});
export default apiHeader;
// http://localhost:1337
