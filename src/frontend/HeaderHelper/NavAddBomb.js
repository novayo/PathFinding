/* Links inteface */

import React, { useState, useContext, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import { bombContext, sysStatusContext } from '../../Core';

function NavAddBomb({ names, handlers, className }) {
    const [whichHandler, setWhichHandler] = useState(0);
    const bomb = useContext(bombContext);
    const sysStatus = useContext(sysStatusContext);

    // 為何不能這樣？
    // useEffect(() => {
    //     console.log(bomb.status)

    //     if (bomb.status === true) {
    //         setWhichHandler(1);
    //     } else {
    //         setWhichHandler(0);
    //     }

    //     handlers[whichHandler]();
    // }, [bomb.status])

    const localHandler = () => {

        if (sysStatus.get !== "IDLE") {
            return;
        }

        if (bomb.status === true) {
            setWhichHandler(0);
            bomb.status = false;
        } else {
            setWhichHandler(1);
            bomb.status = true;
        }
        handlers[whichHandler]();
    }

    return (
        <Nav.Item xs={1}>
            <Nav.Link onClick={localHandler} className={className}>{names[whichHandler]}</Nav.Link>
        </Nav.Item>
    )
}

export default NavAddBomb
