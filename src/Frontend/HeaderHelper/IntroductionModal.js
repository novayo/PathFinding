import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function IntroductionModal() {
    const [pages, setPages] = useState(1);
    const [show, setShow] = useState(true);
    const text = {
        1: [
            "1/3",
            "Test1",
            "Test1 Dialog"
        ],
        2: [
            "2/3",
            "Test2",
            "Test2 Dialog"
        ],
        3: [
            "3/3",
            "Test3",
            "Test3 Dialog"
        ],
    }

    const HandlePrevious = () => {
        setPages(prePage => prePage - 1 >= 1 ? prePage - 1 : prePage);
    }

    const HandleNext = () => {
        setPages(prePage => prePage + 1 <= 3 ? prePage + 1 : prePage);
    }

    return (
        <Modal show={show} size='lg' backdrop="static" centered>
            <div className="ml-auto Modal-Page">{text[pages][0]}</div>
            <div className="Modal-Title">{text[pages][1]}</div>

            <Modal.Body>
                <p>{text[pages][2]}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button className="mr-auto" variant='success' size="md" onClick={() => setShow(false)}>Skip Tutorial</Button>
                <Button variant='success' size="md" onClick={() => HandlePrevious()}>Previous</Button>
                <Button variant='success' size="md" onClick={() => HandleNext()}>Next</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default IntroductionModal
