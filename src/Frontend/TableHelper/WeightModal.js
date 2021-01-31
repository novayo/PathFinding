import { useEffect, useContext, useState } from 'react'
import { weightValueContext, updateContext, weightValueRange } from './TableIndex'
import { algorithmContext, speedContext, position } from '../../Core/index'
import { UpdateTable } from './UpdateTable'
import ButtonEvent from './ButtonEvent'
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProgressBar from 'react-bootstrap/ProgressBar';


function WeightModal() {
    // console.log("WeightModal")
    const [weightValue, update, algorithm, speed] = [useContext(weightValueContext), useContext(updateContext), useContext(algorithmContext), useContext(speedContext)]
    const [initShow, setInitShow] = useState(false)
    const [show, setShow] = useState(0)
    const buttonEvent = ButtonEvent()
    
    useEffect(() => {
        if(initShow){ // 一開始不能show weightModal
            setShow(show => show + 1) // show為waiting的人數
            setTimeout(() => {
                setShow(show => {
                    if(show === 0){
                        return 0
                    }else{
                        return show - 1
                    }
                })
            }, weightValueRange.waiting)

        }
        setInitShow(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [weightValue.get])

    useEffect(() => {
        if(show === 0 && update.get && Object.keys(position.weight).length !== 0){
            UpdateTable(buttonEvent.Start, buttonEvent.ClearPath, algorithm, speed)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show])

    const handleClose = () => {
        setShow(0)
    }

    return (
        <div>
            <Modal show = {show > 0} size = "sm" onHide = {handleClose} dialogClassName = "weightModal">
                <Modal.Body>
                    <Row>
                        <Col xs = {1}><div className = "weightImage"/></Col>
                        <Col><ProgressBar className = "progress" now={weightValue.get.value} label={weightValue.get.value} min = {weightValueRange.min} max = {weightValueRange.max} /></Col>
                    </Row>    
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default WeightModal
