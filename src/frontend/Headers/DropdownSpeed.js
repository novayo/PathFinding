import React, { useState } from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown';

function DropdownSpeed({ className }) {
    const [title, setTitle] = useState('Average');

    return (
        <NavDropdown xs={1} title={`Speed: ${title}`} id="DropdownSpeed" className={className}>
            <NavDropdown.Item onSelect={() => { setTitle("Fast"); alert('Speed Fast!') }}>Fast</NavDropdown.Item>
            <NavDropdown.Item onSelect={() => { setTitle("Average"); alert('Speed Average!') }}>Average</NavDropdown.Item>
            <NavDropdown.Item onSelect={() => { setTitle("Slow"); alert('Speed Slow!') }}>Slow</NavDropdown.Item>
        </NavDropdown>
    )
}

export default DropdownSpeed;