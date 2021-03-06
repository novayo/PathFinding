import React, { useState, useContext, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import { bombContext, sysStatusContext, algorithmContext } from '../../../Core';
import Colored from '../HeaderHepler/Colored_AddButton';
import { IsMount } from '../../../Core/IsMount.js'

function NavAddBomb({ names, handlers }) {
    const [whichHandler, setWhichHandler] = useState(0);
    const bomb = useContext(bombContext);
    const sysStatus = useContext(sysStatusContext);
    const algoContext = useContext(algorithmContext);
    const [className, toggleHandler] = Colored();
    const isMount = IsMount();

    useEffect(() => {
        if (isMount) return; // 防止第一次render也會跑進來執行

        if (bomb.get === true) {
            setWhichHandler(1);
        } else {
            setWhichHandler(0);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bomb.get])

    useEffect(() => {
        if (isMount) return;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [whichHandler])

    const localHandler = () => {
        if (isMount) return;

        if ((sysStatus.get !== "IDLE" && sysStatus.get !== "STOP") || algoContext.get === "" || algoContext.get === "Algorithm_Bidrectional_Swarm") {
            return;
        }

        handlers[whichHandler]();
    }


    return (
        <Nav.Item>
            <Nav.Link onClick={localHandler} className={className} onMouseEnter={toggleHandler} onMouseLeave={toggleHandler}>{names[whichHandler]}</Nav.Link>
        </Nav.Item>
    )
}

export default NavAddBomb
