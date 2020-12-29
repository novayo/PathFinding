/* Links inteface */

import React, { useState, useContext, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import { bombContext, sysStatusContext } from '../../Core';
import Colored from '../../HOC/Colored';

function NavAddBomb({ names, handlers }) {
    const [whichHandler, setWhichHandler] = useState(0);
    const bomb = useContext(bombContext);
    const sysStatus = useContext(sysStatusContext);
    const [className, toggleHandler] = Colored();


    useEffect(() => {

        if (bomb.get === true) {
            setWhichHandler(1);
        } else {
            setWhichHandler(0);
        }

        handlers[whichHandler]();
    }, [bomb, handlers, whichHandler])

    const localHandler = () => {

        if (sysStatus.get !== "IDLE") {
            return;
        }

        if (bomb.get === true) {
            bomb.set("False");
        } else {
            bomb.set("True");
        }
    }

    return (
        <Nav.Item xs={1}>
            <Nav.Link onClick={localHandler} className={className} onMouseEnter={toggleHandler} onMouseLeave={toggleHandler}>{names[whichHandler]}</Nav.Link>
        </Nav.Item>
    )
}

export default NavAddBomb
