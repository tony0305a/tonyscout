import React from "react";
import Footer from "../components/Footer/Footer";
import axios from "axios";
import request from 'request'
import { useLocation } from "react-router-dom";


const GetOauthCallback = () => {
    const search = useLocation().search;
    const code =new URLSearchParams(search).get("code");

    request.post({
        url: tokenUrl,
        auth: { // sets "Authorization: Basic ..." header
            user: clientId,
            pass: clientSecret
        },
        form: { // post information as x-www-form-urlencoded
            grant_type: "authorization_code",
            code: code, // accessCode should be url decoded before being set here
            redirect_uri: appCallbackUrl 
        }
    },  function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // parse the response to JSON
            var payload = JSON.parse(body);
            console.log(payload)
    
            // separate the tokens from the entire response body
            var tokens = {
                refresh_token:  payload.refresh_token,
                id_token:       payload.id_token,
                access_token:   payload.access_token
            };
    
            // legibly print out our tokens
           console.log(JSON.stringify(tokens, false, 4))
        } else {
            console.log("/token request failed");
        }
    });


  return (
    <>
    <span>{id}</span>
      <button>test</button>
      <Footer />
    </>
  );
};
export default GetOauthCallback;
