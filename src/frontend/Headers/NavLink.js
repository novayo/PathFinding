import React from 'react';
import Nav from 'react-bootstrap/Nav';

function NavLink({ name, handler, className }) {
    return (
        <Nav.Item xs={1} className={className}>
            <Nav.Link onClick={handler}>{name}</Nav.Link>
        </Nav.Item>
    )
}

export default NavLink
