import React from "react";
import Footer from "../components/Footer/Footer";
const OauthCallback = () =>{

    
    var appBaseUrl = "https://tonyscout.vercel.app"
    var appCallbackUrl = appBaseUrl+"/oauth-callback"
    var provider = "https://auth.riotgames.com"
    var autorizeUrl = provider+"/authorize"
    var clientId = "tonyscount"
    var link = autorizeUrl
    +"?redirect_uri="+appCallbackUrl
    +"&client_id="+clientId
    +"&response_type=code"
    +"&scope=openid";


    return(
        <>
        <p>oauth callback</p>
        <a href={link}>Sing In</a>
        <Footer/>
        </>
    )

}
export default OauthCallback