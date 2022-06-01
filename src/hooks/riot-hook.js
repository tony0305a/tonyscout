import { useContext } from "react";
import {RiotContext} from "../providers/riot-provider"

const useScout = () => {
const { scoutState, getSummoner } = useContext(RiotContext);


return { scoutState, getSummoner }

}
export default useScout