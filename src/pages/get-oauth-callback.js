import React from "react";
import Footer from "../components/Footer/Footer";
import axios from "axios";
import { useLocation } from "react-router-dom";

const GetOauthCallback = () => {
  const search = useLocation().search;
  const codeQuery = new URLSearchParams(search).get("code");

  const options = {
    method: "GET",
    url: "https://the-one-who-searches.herokuapp.com/oauth-callback",
    data: { code: codeQuery },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });

  return (
    <>
      <button>test</button>
      <Footer />
    </>
  );
};
export default GetOauthCallback;
