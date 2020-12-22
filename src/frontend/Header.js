import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from './Headers/Logo';
import DropdownAlgorithm from './Headers/DropdownAlgorithm';
import DropdownMaze from './Headers/DropdownMaze';
import NavLink from './Headers/NavLink';
import NavButton from './Headers/NavButton';
import DropdownSpeed from './Headers/DropdownSpeed';

function Header() {

    return (
        <Navbar expand="xl" bg='dark' variant='dark'>
            <Logo />
            <Navbar.Toggle aria-controls="Collapse" />
            <Navbar.Collapse id="Collapse" className='nvbar-collapse'>
                <Nav className="nav-bar">
                    <DropdownAlgorithm />
                    <DropdownMaze />
                    <NavLink name="Add Bomb" handler={() => alert('Add 1 Bomb !')} />
                    <NavButton />
                    <NavLink name="Clear Board" handler={() => alert('Clear Board !')} />
                    <NavLink name="Clear Walls & Weights" handler={() => alert('Clear Walls & Weights !')} />
                    <NavLink name="Clear Path" handler={() => alert('Clear Path !')} />
                    <DropdownSpeed />
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}



export default Header
