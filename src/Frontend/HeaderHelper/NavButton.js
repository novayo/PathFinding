import React, { useState, useEffect, useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import { algorithmContext, sysStatusContext, speedContext } from '../../Core';
import ButtonEvent from '../TableHelper/ButtonEvent';
import { stopStatus } from '../TableHelper/Animation'
import BFS from '../../Backend/Algorithms/BFS';
import DFS from '../../Backend/Algorithms/DFS';
import Dijkstra from '../../Backend/Algorithms/Dijkstra';
import Dijkstra_old from '../../Backend/Algorithms/Dijkstra_old';

const NavButton = () => {

    const [buttonName, setButtonName] = useState("Visualize !");
    const [myVariant, setMyVariant] = useState("");
    const algoContext = useContext(algorithmContext);
    const sysStatus = useContext(sysStatusContext);
    const speed = useContext(speedContext);
    const buttonEvent = ButtonEvent();

    useEffect(() => {
        setMyVariant('buttonEnable');
    }, [])

    useEffect(() => {
        var algoName = "";
        switch (algoContext.get) {
            case "Algorithm_Dijkstra":
                algoName = "Dijkstra's";
                break;
            case 'Algorithm_AStar':
                algoName = "A*";
                break;
            case "Algorithm_Greedy_Best_First":
                algoName = "Greedy";
                break;
            case "Algorithm_Swarm":
                algoName = "Swarm";
                break;
            case "Algorithm_Convergent_Swarm":
                algoName = "Convergent Swarm";
                break;
            case "Algorithm_Bidrectional_Swarm":
                algoName = "Bidrectional Swarm";
                break;
            case "Algorithm_Breadth_First":
                algoName = "BFS";
                break;
            case "Algorithm_Depth_First":
                algoName = "DFS";
                break;
            case "Algorithm_Dijkstra_old":
                algoName = "Dijkstra's";
                break;
            default:
                algoName = "";
                break;
        }
        setButtonName(`Visualize ${algoName}!`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [algoContext.get])

    useEffect(() => {
        if (sysStatus.get === 'RUNNING') {
            setMyVariant('buttonDisable');
        } else {
            setMyVariant('buttonEnable');
        }
    }, [sysStatus.get])


    const handler = () => {
        if (sysStatus.get === "RUNNING" || (sysStatus.get === "STOP" && algoContext.get === stopStatus.algorithm)) {
            buttonEvent.Start()
            return
        }

        if (algoContext.get === "") {
            setButtonName("Pick an Algorithm");
        } else {
            buttonEvent.ClearPath();
            switch (algoContext.get) {
                case "Algorithm_Dijkstra":
                    Dijkstra("Dijkstra", buttonEvent.Start, speed.get[1]);
                    break;
                case 'Algorithm_AStar':
                    Dijkstra("Astar", buttonEvent.Start, speed.get[1]);
                    break;
                case "Algorithm_Greedy_Best_First":
                    Dijkstra("GreedyBestFirstSearch", buttonEvent.Start, speed.get[1]);
                    break;
                case "Algorithm_Swarm":
                    Dijkstra("Swarm", buttonEvent.Start, speed.get[1]);
                    break;
                case "Algorithm_Convergent_Swarm":
                    Dijkstra("ConvergentSwarm", buttonEvent.Start, speed.get[1]);
                    break;
                case "Algorithm_Bidrectional_Swarm":
                    Dijkstra("BidirectionSwarm", buttonEvent.Start, speed.get[1]);
                    break;
                case "Algorithm_Breadth_First":
                    BFS(buttonEvent.Start, speed.get[1]);
                    break;
                case "Algorithm_Depth_First":
                    DFS(buttonEvent.Start, speed.get[1]);
                    break;
                case "Algorithm_Dijkstra_old":
                    Dijkstra_old("Dijkstra", buttonEvent.Start, speed.get[1]);
                    break;
                default:
                    break;
            }
        }
    }

    return (
        <Nav.Item>
            <button className={myVariant} onClick={handler}>{buttonName}</button>
        </Nav.Item>
    )
};

export default NavButton
