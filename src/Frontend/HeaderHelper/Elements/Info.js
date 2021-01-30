import { useState, useContext, useEffect } from 'react';
import { algorithmContext } from '../../../Core';

function Info() {
	const [bannedBomb, setBannedBomb] = useState("");
	const [bannedBFSDFS, setBannedBFSDFS] = useState("");
	const algoContext = useContext(algorithmContext);

	useEffect(() => {
		if (algoContext.get === "Algorithm_Bidrectional_Swarm") {
			setBannedBomb("banned");
		} else {
			setBannedBomb("");
		}

		if (algoContext.get === "Algorithm_Breadth_First" || algoContext.get === "Algorithm_Depth_First") {
			setBannedBFSDFS("banned");
		} else {
			setBannedBFSDFS("");
		}
	}, [algoContext.get])

	return (
		<div id="mainInfo">
			<ul>
				<li> <div className="Info-Start-Node"></div>Start Node </li>
				<li> <div className="Info-End-Node"></div>Target Node </li>
				<li className={bannedBomb}> <div className="Info-Bomb-Node"></div>Gas Node </li>
				<li className={bannedBFSDFS}> <div className="Info-Weight-Node"></div>Weight Node </li>
				<li> <div className="Info-Unvisited-Node"></div>Unvisited Node </li>
				<li> <div className="Info-Visited-Node"></div><div className="Info-Visited1-Node"></div>Visited Node </li>
				<li> <div className="Info-ShortestPathNode-Node"></div>Shortest-Path Node </li>
				<li> <div className="Info-WallNode-Node"></div>Wall Node </li>
			</ul>
		</div>
	)
}

export default Info;