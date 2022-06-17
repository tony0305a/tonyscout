import React from "react";
import App from "./App";
import { ResetCSS } from "./global/resetCSS";
import RiotProvider from "./providers/riot-provider";

const Provider = () => {

return(
    <>
    <RiotProvider>
    <ResetCSS/>
    <App/>
    </RiotProvider>
    </>
)
}
export default Provider