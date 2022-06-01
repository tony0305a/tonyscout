import { useContext } from "react";
import {RiotContext} from "../providers/riot-provider"

const useScout = () => {
const { scoutState } = useContext(RiotContext);


return { scoutState }

}
export default useScout