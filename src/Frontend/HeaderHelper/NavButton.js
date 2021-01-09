import React, { useState, useEffect, useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { algorithmContext, sysStatusContext, speedContext } from '../../Core';
import ButtonEvent from '../TableHelper/ButtonEvent';
import BFS from '../../Backend/Bfs';

const NavButton = () => {

    const [buttonName, setButtonName] = useState("Visualize !");
    const [myVariant, setMyVariant] = useState("");
    const algoContext = useContext(algorithmContext);
    const sysStatus = useContext(sysStatusContext);
    const speed = useContext(speedContext);
    const buttonEvent = ButtonEvent();

    useEffect(() => {
        setMyVariant('success');
    }, [])

    useEffect(() => {
        var algoName = "";
        switch (algoContext.get) {
            case "Algorithm_Dijkstra":
                algoName = "Dijkstra's";
                break;
            case 'Algorithm_APlus':
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
            default:
                algoName = "";
                break;
        }
        setButtonName(`Visualize ${algoName}!`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [algoContext.get])

    useEffect(() => {
        if (sysStatus.get === 'RUNNING') {
            setMyVariant('danger');
        } else {
            setMyVariant('success');
        }
    }, [sysStatus.get])


    const handler = () => {
        if (sysStatus.get !== "IDLE") {
            return;
        }

        if (algoContext.get === "") {
            setButtonName("Pick an Algorithm");
        } else {
            buttonEvent.ClearPath();
            switch (algoContext.get) {
                case "Algorithm_Dijkstra":
                    break;
                case 'Algorithm_APlus':
                    break;
                case "Algorithm_Greedy_Best_First":
                    break;
                case "Algorithm_Swarm":
                    break;
                case "Algorithm_Convergent_Swarm":
                    break;
                case "Algorithm_Bidrectional_Swarm":
                    break;
                case "Algorithm_Breadth_First":
                    BFS(buttonEvent.Start, speed.get[1]);
                    break;
                case "Algorithm_Depth_First":
                    break;
                default:
                    break;
            }
        }
    }

    return (
        <Nav.Item xs={1}>
            <Button id="navButton" variant={myVariant} size="lg" onClick={handler}>{buttonName}</Button>
        </Nav.Item>
    )
};

export default NavButton
