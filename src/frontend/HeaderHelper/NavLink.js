/* Links inteface */

import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';

function NavLink({ names, handlers, className }) {
    const [whichHandler, setWhichHandler] = useState(0);

    const localHandler = () => {
        setWhichHandler(preWhichHandler => (preWhichHandler + 1) % handlers.length);
        handlers[whichHandler]();
    }

    // console.log(className)

    return (
        <Nav.Item xs={1}>
            <Nav.Link onClick={localHandler} className={className}>{names[whichHandler]}</Nav.Link>
        </Nav.Item>
    )
}

export default NavLink
