import React from "react";
import Footer from "../components/Footer/Footer";
import api from "../services/api";
import qs from 'qs'
import axios from "axios";
const GetOauthCallback = () => {
  function test() {


    var appBaseUrl = "https://tonyscout.vercel.app";
    var appCallbackUrl = appBaseUrl + "/oauth-callback";

    var provider = "https://auth.riotgames.com";
    var autorizeUrl = provider + "/authorize";
    var tokenUrl = provider + "/token";

    var clientId = "tonyscount";
    var clientSecret = "ZbqAImVYIuKWfbw11YA0Ylt9ZDDBtGZbXtRP-y0U9Ek";

    var code =
      "dWUxOjVGN2VKckZnR3ZweFZZVlNBM1BqN3cuR3o2dzQxVTl0SnJHRFFZeVJfQmJqUQ";

      const data = {
        'grant_type': "authorization_code",
        'code': code, // accessCode should be url decoded before being set here
        'redirect_uri': appCallbackUrl,
        }
    const opts = {
    url: tokenUrl,
      method: "POST",
      headers:{
        'content-type': 'application/x-www-form-urlencoded',
        'auth':{
            'user':clientId,
            'pass':clientSecret
        }
      },
      data:qs.stringify(data)
    };

    axios(opts)
  }

  return (
    <>
      <button onClick={test}>test</button>
      <Footer />
    </>
  );
};
export default GetOauthCallback;
