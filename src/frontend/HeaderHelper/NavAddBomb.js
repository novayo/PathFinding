/* Links inteface */

import React, { useState, useContext, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import { bombContext, sysStatusContext } from '../../Core';

function NavAddBomb({ names, handlers, className }) {
    const [whichHandler, setWhichHandler] = useState(0);
    const bomb = useContext(bombContext);
    const sysStatus = useContext(sysStatusContext);

    useEffect(() => {

        if (bomb.get === true) {
            setWhichHandler(1);
        } else {
            setWhichHandler(0);
        }

        handlers[whichHandler]();
    }, [bomb])

    const localHandler = () => {

        if (sysStatus.get !== "IDLE") {
            return;
        }

        console.log(bomb.get)

        if (bomb.get === true) {
            // setWhichHandler(0);
            bomb.set("False");
            // bomb.status = false;
        } else {
            // setWhichHandler(1);
            bomb.set("True");
            // bomb.status = true;
        }
        // handlers[whichHandler]();
    }

    return (
        <Nav.Item xs={1}>
            <Nav.Link onClick={localHandler} className={className}>{names[whichHandler]}</Nav.Link>
        </Nav.Item>
    )
}

export default NavAddBomb
