import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../Elements/Logo';
import DropdownAlgorithm from '../Elements/DropdownAlgorithm';
import DropdownMaze from '../Elements/DropdownMaze';
import NavLink from '../Elements/NavLink';
import NavAddBomb from '../Elements/NavAddBomb';
import NavButton from '../Elements/NavButton';
import DropdownSpeed from '../Elements/DropdownSpeed';
import ButtonEvent from '../../TableHelper/ButtonEvent';
import AlgorithmDescriptor from '../Elements/AlgorithmDescriptor';
import IntroductionModal from '../Elements/IntroductionModal';
// import Email from '../Elements/Email';

function Mobile() {
    const buttonEvent = ButtonEvent()

    return (
        <>
            <IntroductionModal />
            <Navbar collapseOnSelect expand="xl" className="navbar">
                <Logo />
                <Navbar.Toggle aria-controls="Collapse" />
                <Navbar.Collapse id="Collapse" className='navbar-collapse'>
                    <Nav className="nav-bar">
                        <DropdownAlgorithm />
                        <DropdownMaze />
                        <NavAddBomb names={["Add Gas", "Remove Gas"]} handlers={[buttonEvent.Addbomb, buttonEvent.RemoveBomb]} />
                        <NavLink names={["Clear Board"]} handlers={[buttonEvent.ClearBoard]} />
                        <NavLink names={["Clear Walls & Weights"]} handlers={[buttonEvent.ClearWalls]} />
                        <NavLink names={["Clear Path"]} handlers={[buttonEvent.ClearPath]} />
                        <DropdownSpeed />
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <NavButton />
            <AlgorithmDescriptor />
            {/* <Email /> */}
        </>
    )
}


export default Mobile
