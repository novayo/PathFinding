import React, { useState, useContext } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { sysStatusContext } from '../../Core';

function DropdownSpeed({ className }) {
    const [title, setTitle] = useState('Average');
    const sysStatus = useContext(sysStatusContext);

    const DropdownSpeedHandler = (eventKey) => {
        if (sysStatus.get !== "IDLE") {
            return;
        }

        switch (eventKey) {
            case "Fast":
                setTitle("Fast");
                alert("Speed Fast!");
                break;
            case "Average":
                setTitle("Average");
                alert("Speed Average!");
                break;
            case "Slow":
                setTitle("Slow");
                alert("Speed Slow!");
                break;
            default:
                break;
        }
    }

    return (
        <NavDropdown xs={1} title={`Speed: ${title}`} id="DropdownSpeed" onSelect={DropdownSpeedHandler} className={className}>
            <NavDropdown.Item eventKey="Fast">Fast</NavDropdown.Item>
            <NavDropdown.Item eventKey="Average">Average</NavDropdown.Item>
            <NavDropdown.Item eventKey="Slow">Slow</NavDropdown.Item>
        </NavDropdown>
    )
}

export default DropdownSpeed;