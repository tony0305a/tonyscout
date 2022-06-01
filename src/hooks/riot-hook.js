import { useContext } from "react";
import {RiotContext} from "../providers/riot-provider"

const useScout = () => {
const { scoutState, getSummoner, version, getVersion, masteriesState, getMasteries, championState, getChampionInfo } = useContext(RiotContext);


return { scoutState, getSummoner, version, getVersion, masteriesState, getMasteries, championState, getChampionInfo }

}
export default useScout