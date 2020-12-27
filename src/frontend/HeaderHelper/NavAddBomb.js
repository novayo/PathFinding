/* Links inteface */

import React, { useState, useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import { bombContext } from '../../Core';

function NavAddBomb({ names, handlers, className }) {
    const [whichHandler, setWhichHandler] = useState(0);
    const bomb = useContext(bombContext);

    const localHandler = () => {
        if (bomb.status === true) {
            setWhichHandler(0);
            bomb.status = false;
        } else {
            setWhichHandler(1);
            bomb.status = true;
        }
        handlers[whichHandler]();
        console.log('123123123' + bomb.status)
    }

    return (
        <Nav.Item xs={1}>
            <Nav.Link onClick={localHandler} className={className}>{names[whichHandler]}</Nav.Link>
        </Nav.Item>
    )
}

export default NavAddBomb
