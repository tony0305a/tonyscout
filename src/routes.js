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
          <Route path="/oauth-callback" element={<GetOauthCallback/>}/>

        </Routes>
    )
}
export default MainRoutes