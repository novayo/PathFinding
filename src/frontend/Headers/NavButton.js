import React, { useState, useEffect, useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { algorithmContext } from '../../Core';

const NavButton = () => {

    const [buttonName, setButtonName] = useState("Visualize !");
    const [myVariant, setMyVariant] = useState("");
    const algoContext = useContext(algorithmContext);

    useEffect(() => {
        setMyVariant('success');
    }, [])

    const resetButton = () => {
        setMyVariant('success');
        setButtonName("Visualize !");
    }

    const handler = () => {
        if (algoContext.get === "") {
            setButtonName("Pick an Algorithm");
        } else {
            setMyVariant('danger');
            setButtonName(algoContext.get);
            setTimeout(() => resetButton(), 1000);
        }
    }

    return (
        <Nav.Item xs={1}>
            <Button id="navButton" variant={myVariant} size="lg" onClick={handler}>{buttonName}</Button>
        </Nav.Item>
    )
};

export default NavButton
