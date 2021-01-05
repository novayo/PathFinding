import React, { useState, useEffect, useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { algorithmContext, sysStatusContext } from '../../Core';
import ButtonEvent from '../TableHelper/ButtonEvent';
import { TestAlgorithm } from '../../Backend/TestAlgorithm';

const NavButton = () => {

    const [buttonName, setButtonName] = useState("Visualize !");
    const [myVariant, setMyVariant] = useState("");
    const algoContext = useContext(algorithmContext);
    const sysStatus = useContext(sysStatusContext);
    const buttonEvent = ButtonEvent();
    const [search, path, speed] = TestAlgorithm();

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
    }, [algoContext.get])

    useEffect(()=>{
        console.log(sysStatus.get);
        if (sysStatus.get === 'RUNNING'){
            setMyVariant('danger');
        } else{
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
            buttonEvent.Start(search, path, speed);
        }
    }

    return (
        <Nav.Item xs={1}>
            <Button id="navButton" variant={myVariant} size="lg" onClick={handler}>{buttonName}</Button>
        </Nav.Item>
    )
};

export default NavButton
