import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from './HeaderHelper/Logo';
import DropdownAlgorithm from './HeaderHelper/DropdownAlgorithm';
import DropdownMaze from './HeaderHelper/DropdownMaze';
import NavLink from './HeaderHelper/NavLink';
import NavAddBomb from './HeaderHelper/NavAddBomb';
import NavButton from './HeaderHelper/NavButton';
import NavClearBoard from './HeaderHelper/NavClearBoard';
import DropdownSpeed from './HeaderHelper/DropdownSpeed';
import ButtonEvent from './TableHelper/ButtonEvent';

function Header() {
    const buttonEvent = ButtonEvent()

    return (
        // <Navbar collapseOnSelect expand="xl" bg='dark' variant='dark'>
        <Navbar collapseOnSelect expand="xl" className="navbar">
            <Logo />
            <Navbar.Toggle aria-controls="Collapse" />
            <Navbar.Collapse id="Collapse" className='nvbar-collapse'>
                <Nav className="nav-bar">
                    <DropdownAlgorithm />
                    <DropdownMaze />
                    <NavAddBomb names={["Add Bomb", "Remove Bomb"]} handlers={[buttonEvent.Addbomb, buttonEvent.RemoveBomb]} />
                    <NavButton />
                    <NavClearBoard names={["Clear Board"]} handlers={[buttonEvent.ClearBoard]} />
                    <NavLink names={["Clear Walls & Weights"]} handlers={[buttonEvent.ClearWalls]} />
                    <NavLink names={["Clear Path"]} handlers={[buttonEvent.ClearPath]} />
                    <DropdownSpeed />
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}



export default Header
