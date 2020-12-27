import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from './Headers/Logo';
import DropdownAlgorithm from './Headers/DropdownAlgorithm';
import DropdownMaze from './Headers/DropdownMaze';
import NavLink from './Headers/NavLink';
import NavLink2 from './Headers/NavLink2';
import NavButton from './Headers/NavButton';
import DropdownSpeed from './Headers/DropdownSpeed';
import ButtonEvent from './TableHelper/ButtonEvent';

function Header() {
    const buttonEvent = ButtonEvent()

    return (
        <Navbar expand="xl" bg='dark' variant='dark'>
            <Logo />
            <Navbar.Toggle aria-controls="Collapse" />
            <Navbar.Collapse id="Collapse" className='nvbar-collapse'>
                <Nav className="nav-bar">
                    <DropdownAlgorithm />
                    <DropdownMaze />
                    {/* <NavLink2 names={["Add Bomb", "Remove Bomb"]} handlers={[() => { console.log("123") }, () => { console.log("456") }]} /> */}
                    <NavLink2 names={["Add Bomb", "Remove Bomb"]} handlers={[buttonEvent.Addbomb, buttonEvent.RemoveBomb]} />
                    <NavButton />
                    {/* <NavLink2 names={["Clear Board"]} handlers={[() => { console.log("789") }]} /> */}
                    <NavLink2 names={["Clear Board"]} handlers={[buttonEvent.ClearBoard]} />
                    <NavLink2 names={["Clear Walls & Weights"]} handlers={[buttonEvent.ClearWalls]} />
                    <NavLink2 names={["Clear Path"]} handlers={[() => alert('Clear Path !')]} />
                    <DropdownSpeed />
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}



export default Header
