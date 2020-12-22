import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

function logo() {
    return (
        <Navbar.Brand href="/Pathing-Finding/" className='Navbar-logo'>
            <img
                src='./logo.png'
                width="50"
                height="50"
                className='d-inline-block'
                variant='test'
                alt='Logo'
            /> {' '}
                    Path-Finding
        </Navbar.Brand>
    )
}

export default logo
