import React, { useState, useEffect, useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import { algorithmContext, sysStatusContext, speedContext, animationStatusContext } from '../../../Core';
import ButtonEvent from '../../TableHelper/ButtonEvent';
import { stopStatus } from '../../TableHelper/Animation'
import BFS from '../../../Backend/Algorithms/BFS';
import DFS from '../../../Backend/Algorithms/DFS';
import Dijkstra from '../../../Backend/Algorithms/Dijkstra';
import Dijkstra_old from '../../../Backend/Algorithms/Dijkstra_old';

const NavButton = () => {

    const [buttonName, setButtonName] = useState("Visualize !");
    const [myVariant, setMyVariant] = useState("");
    const algoContext = useContext(algorithmContext);
    const sysStatus = useContext(sysStatusContext);
    const animationStatus = useContext(animationStatusContext);
    const speed = useContext(speedContext);
    const animation = useContext(animationStatusContext)
    const buttonEvent = ButtonEvent();

    useEffect(() => {
        setMyVariant('buttonEnable');
    }, []);

    useEffect(() => {
        if (animationStatus.get === "Algorithm") {
            var name = "";
            switch (algoContext.get) {
                case "Algorithm_Dijkstra":
                    name = "Dijkstra's";
                    break;
                case 'Algorithm_AStar':
                    name = "A*";
                    break;
                case "Algorithm_Greedy_Best_First":
                    name = "Greedy";
                    break;
                case "Algorithm_Swarm":
                    name = "Swarm";
                    break;
                case "Algorithm_Convergent_Swarm":
                    name = "Convergent Swarm";
                    break;
                case "Algorithm_Bidrectional_Swarm":
                    name = "Bidrectional Swarm";
                    break;
                case "Algorithm_Breadth_First":
                    name = "BFS";
                    break;
                case "Algorithm_Depth_First":
                    name = "DFS";
                    break;
                case "Algorithm_Dijkstra_old":
                    name = "Dijkstra's";
                    break;
                default:
                    name = "";
                    break;
            }
        } else if (animationStatus.get === "Maze") {
            name = "Maze";
        }
        setButtonName(`Visualize ${name}!`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [algoContext.get, animationStatus.get])

    useEffect(() => {
        if (sysStatus.get === 'RUNNING') {
            setMyVariant('buttonDisable');
        } else {
            setMyVariant('buttonEnable');
        }
    }, [sysStatus.get])

    const callback = (func1, func2) => {
        func1();
        func2();
    }

    const handler = () => {
        // 改變系統狀態
        if (sysStatus.get === "RUNNING") {
            buttonEvent.Start() // 暫停狀態改變在此function內
            return

        } else if (sysStatus.get === "STOP") {
            if (animation.get === "Maze") {
                buttonEvent.CreateMaze()
                return

            } else if (algoContext.get === stopStatus.algorithm) {
                buttonEvent.Start()
                return

            }
        }

        if (algoContext.get === "") {
            setButtonName("Pick an Algorithm");
        } else {
            callback(
                () => buttonEvent.ClearPath(),
                () => {
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
            )
        }
    }

    return (
        <Nav.Item>
            <button className={myVariant} onClick={handler}>{buttonName}</button>
        </Nav.Item>
    )
};

export default NavButton
