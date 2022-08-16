import React from "react";
import Footer from "../components/Footer/Footer";
import axios from "axios";
import request from 'request'
import { useLocation } from "react-router-dom";


const GetOauthCallback = () => {
    const search = useLocation().search;
    const code =new URLSearchParams(search).get("code");

    


  return (
    <>
    <span>{id}</span>
      <button>test</button>
      <Footer />
    </>
  );
};
export default GetOauthCallback;
