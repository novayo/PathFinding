import React, { useState, useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import { sysStatusContext } from '../../Core';

function NavLink({ names, handlers, className }) {
    const [whichHandler, setWhichHandler] = useState(0);
    const sysStatus = useContext(sysStatusContext);

    const localHandler = () => {
        if (sysStatus.get !== "IDLE") {
            return;
        }

        setWhichHandler(preWhichHandler => (preWhichHandler + 1) % handlers.length);
        handlers[whichHandler]();
    }

    return (
        <Nav.Item xs={1}>
            <Nav.Link onClick={localHandler} className={className}>{names[whichHandler]}</Nav.Link>
        </Nav.Item>
    )
}

export default NavLink
