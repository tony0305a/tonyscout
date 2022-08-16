import React from "react";
import { Routes, Route } from 'react-router-dom'
import PrivacyPolicy from "./pages/privacy-policy";
import ServiceTerms from "./pages/terms-of-service";
import App from "./App";
import OauthCallback from "./pages/oauth-callback";
import GetOauthCallback from "./pages/get-oauth-callback";


const MainRoutes = () =>{
    return(
        <Routes>
            <Route path="/privacypolicy" element={<PrivacyPolicy/>}/>
          <Route path="/termsofservice" element={<ServiceTerms/>}/>
          <Route path="/" element={<App/>}/>
          <Route path="/account/connect/riotgames/oauth-callback" element={<OauthCallback/>}/>
          <Route path="/oauth-callback/:query" element={<GetOauthCallback/>}/>

        </Routes>
    )
}
export default MainRoutes

 // https://tonyscout.vercel.app/oauth-callback?code=dWUxOjVGN2VKckZnR3ZweFZZVlNBM1BqN3cuR3o2dzQxVTl0SnJHRFFZeVJfQmJqUQ%3D%3D&iss=https%3A%2F%2Fauth.riotgames.com&session_state=aRFNjVgNn6M5_XW3UicKBVEXzEw6puhq_5gaW9jMzwM.SPObScCQZ1ItRDsU7NJJ-g

 /*
 
          <Route path="/account/connect/riotgames/oauth-callback" element={<OauthCallback/>}/>
          <Route path="/oauth-callback" element={<GetOauthCallback/>}/>
*/