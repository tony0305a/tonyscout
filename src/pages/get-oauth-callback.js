import React from "react";
import Footer from "../components/Footer/Footer";
import { useLocation } from "react-router-dom";


const GetOauthCallback = () =>{


    const search = useLocation().search
    console.log('path',search)
    const id = new URLSearchParams(search).get('access_token')
    console.log(id)

    return(
        <>
        <p>Get oauth callback</p>
        <Footer/>
        </>
    )
}
export default GetOauthCallback