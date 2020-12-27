/* 按了會改變物件名稱與執行不同函數 */
import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';

function NavLink2({ names, handlers, className }) {
    const [whichHandler, setWhichHandler] = useState(0);

    const localHandler = () => {
        setWhichHandler(preWhichHandler => (preWhichHandler + 1) % handlers.length);
        handlers[whichHandler]();
    }

    return (
        <Nav.Item xs={1} className={className}>
            <Nav.Link onClick={localHandler}>{names[whichHandler]}</Nav.Link>
        </Nav.Item>
    )
}

export default NavLink2
