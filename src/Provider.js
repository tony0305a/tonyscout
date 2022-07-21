import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ResetCSS } from "./global/resetCSS";
import RiotProvider from "./providers/riot-provider";
import Routes from './routes'

const Provider = () => {
  return (
    <>
      <BrowserRouter>
        <RiotProvider>
          <ResetCSS />
          <Routes/>
        </RiotProvider>
      </BrowserRouter>
    </>
  );
};
export default Provider;
