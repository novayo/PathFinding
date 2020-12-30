import React, { useState, useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import { sysStatusContext } from '../../Core';
import { bombContext } from '../../Core';
import Colored from '../../HOC/Colored';

function NavClearBoard({ names, handlers }) {
    const [whichHandler, setWhichHandler] = useState(0);
    const sysStatus = useContext(sysStatusContext);
    const bomb = useContext(bombContext);
    const [className, toggleHandler] = Colored();

    const localHandler = () => {
        if (sysStatus.get !== "IDLE") {
            return;
        }

        setWhichHandler(preWhichHandler => (preWhichHandler + 1) % handlers.length);
        handlers[whichHandler]();
        bomb.set("False");
    }

    return (
        <Nav.Item xs={1}>
            <Nav.Link onClick={localHandler} className={className} onMouseEnter={toggleHandler} onMouseLeave={toggleHandler}>{names[whichHandler]}</Nav.Link>
        </Nav.Item>
    )
}

export default NavClearBoard
