import React, { useState, useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import { sysStatusContext } from '../../../Core';
import Colored from '../HeaderHepler/Colored';

function NavLink({ names, handlers }) {
    const [whichHandler, setWhichHandler] = useState(0);
    const sysStatus = useContext(sysStatusContext);
    const [className, toggleHandler] = Colored();

    const localHandler = () => {
        if (sysStatus.get !== "IDLE" && sysStatus.get !== "STOP") {
            return;
        }

        setWhichHandler(preWhichHandler => (preWhichHandler + 1) % handlers.length);
        handlers[whichHandler]();
    }

    return (
        <Nav.Item>
            <Nav.Link onClick={localHandler} className={className} onMouseEnter={toggleHandler} onMouseLeave={toggleHandler}>{names[whichHandler]}</Nav.Link>
        </Nav.Item>
    )
}

export default NavLink
