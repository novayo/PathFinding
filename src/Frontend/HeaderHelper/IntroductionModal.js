import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import data from '../../Resources/Data/Modalnfo.json';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

function IntroductionModal() {
    const [pages, setPages] = useState(1);
    const [show, setShow] = useState(true);
    const [language, setLanguage] = useState(0);
    const [checked, setChecked] = useState(true);
    const maxPages = data.length;

    const HandlePrevious = () => {
        setPages(prePage => prePage - 1 >= 1 ? prePage - 1 : prePage);
    }

    const HandleNext = () => {
        if (pages + 1 > maxPages) {
            setShow(false);
            return;
        }
        setPages(prePage => prePage + 1 <= maxPages ? prePage + 1 : prePage);
    }

    return (
        <Modal show={show} size='xl' backdrop="static" centered dialogClassName="Modal">
            <div className="ml-auto Modal-Page">{`${pages}/${maxPages}`}</div>
            <div className="Modal-Title">{data[pages - 1]["Title"][language]}</div>

            <Modal.Body className="Modal-Body">
                <p className="Modal-BodyText">{data[pages - 1]["Dialog"][language]}</p>
                <p className="Modal-BodyText1">{data[pages - 1]["Body"][language]}</p>
                {pages === 1 ? <div className="Logo"></div> : null}
                {pages === 2 ? <div className="ShortestPath"></div> : null}
                {pages === 3 ? <div className="Algorithm"></div> : null}
                {pages === 4 ? <div className="Maze"></div> : null}
                {pages === 5 ? <div className="WallWeight"></div> : null}
                {pages === 6 ? <div className="AddBomb"></div> : null}
                {pages === 7 ? <div className="StartDrag"></div> : null}
                {pages === 8 ? <div className="Other"></div> : null}
                {pages === 9 ? (language === 1 ? <p className="Modal-BodyText1">本專案由 <a href="https://github.com/novayo">novayo</a> 及 <a href="https://github.com/ChengTsungPao">ChengTsungPao</a> 共同製作</p> : <p className="Modal-BodyText1">This application made by <a href="https://github.com/novayo">novayo</a> and <a href="https://github.com/ChengTsungPao">ChengTsungPao</a>.</p>) : null}
            </Modal.Body>

            <Modal.Footer>
                <Button className="mr-auto Button" variant='outline-success' size="md" onClick={() => setShow(false)}>Skip Tutorial</Button>
                <BootstrapSwitchButton
                    checked={checked}
                    onlabel='En'
                    onstyle='outline-info'
                    offlabel='Ch'
                    offstyle='outline-success'
                    size="md" // eslint-disable-next-line 
                    style='mr-auto' // 這裡會有怪怪的warning，所以加上上面的註解去除warning
                    onChange={(checked) => {
                        if (checked) {
                            setLanguage(0);
                        } else {
                            setLanguage(1);
                        }
                        setChecked(pre => !pre);
                    }}
                />
                <Button className="Button" variant='outline-success' size="md" onClick={() => HandlePrevious()}>Previous</Button>
                <Button className="Button" variant='outline-success' size="md" onClick={() => HandleNext()}>Next</Button>
            </Modal.Footer>
        </Modal >
    )
}

export default IntroductionModal
