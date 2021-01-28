import { useContext, useEffect } from 'react'
import { sysStatusContext, algorithmContext, speedContext, animationStatusContext } from '../../Core/index'
import { tableVar, touchContext, moveContext, updateContext, weightValueContext, componentKind, keyboardSupport, synchronize } from './TableIndex'
import { setTable } from './SetTable'
import { UpdateTable } from './UpdateTable'
import { WhichComponent } from './WhichComp'
import { KeyboardEvent } from './KeyboardEvent'
import ButtonEvent from './ButtonEvent'


function MouseEvent() {
    const [touch, move, update, weightValue, animation] = [useContext(touchContext), useContext(moveContext), useContext(updateContext), useContext(weightValueContext), useContext(animationStatusContext)]
    const [algorithm, speed, sysStatus] = [useContext(algorithmContext), useContext(speedContext), useContext(sysStatusContext)]
    const buttonEvent = ButtonEvent()

    useEffect(() => {
        synchronize.algorithm = algorithm
        synchronize.sysStatus = sysStatus
        // eslint-disable-next-line
    }, [algorithm.get, sysStatus.get])

    document.addEventListener('keydown', function(event) {
        if(synchronize.sysStatus.get !== "IDLE" && synchronize.sysStatus.get !== "STOP"){
            return
        }
        if(keyboardSupport.down){
            KeyboardEvent(event, synchronize.algorithm, weightValue)
        }
    })
    document.addEventListener('keyup', function(event) {
        if(keyboardSupport.down === false){
            KeyboardEvent(event, synchronize.algorithm)
        }
    })

    const CheckStopStatus = () => {
        if (sysStatus.get === "STOP"){
            if(animation.get === "Maze"){
                buttonEvent.ClearWalls(false)
                animation.set("Algorithm")
            } else {
                buttonEvent.ClearPath()
            }
            sysStatus.set("IDLE")
        }
    }

    const MouseDownHandler = (e) => {
        // console.log("MouseDownHandler " + e.target.id)

        if ((sysStatus.get !== "IDLE" && sysStatus.get !== "STOP") || componentKind.add === false) {
            return
        }

        e.preventDefault()

        tableVar.id = parseInt(e.target.id)
        const whichComponent = WhichComponent(tableVar.id, touch)

        if(whichComponent.type){
            CheckStopStatus()
            setTable(tableVar.id, whichComponent.rKind, true)
            move.set(componentKind.add)

        }else{
            move.set(whichComponent.kind)
        }
    }

    const MouseUpHandler = (e) => {
        // console.log("MouseUpHandler " + e.target.id)

        if ((sysStatus.get !== "IDLE" && sysStatus.get !== "STOP") || componentKind.add === false) {
            return
        }

        move.set("")

        if(update.get && move.get !== ""){
            UpdateTable(buttonEvent.Start, buttonEvent.ClearPath, algorithm, speed)
        }
    }

    const OnMouseEnterHanlder = (e) => {
        // console.log("OnMouseEnterHanlder " + e.target.id)

        if ((sysStatus.get !== "IDLE" && sysStatus.get !== "STOP") || componentKind.add === false) {
            return
        }

        tableVar.newId = parseInt(e.target.id)
        const whichOldComponent = WhichComponent(tableVar.id, touch)
        const whichNewComponent = WhichComponent(tableVar.newId, touch)

        if(move.get === componentKind.add && whichNewComponent.type){
            setTable(tableVar.newId, whichNewComponent.rKind, true)
            tableVar.id = parseInt(tableVar.newId)
            CheckStopStatus()

        }else if(move.get !== componentKind.add && move.get !== "" && whichNewComponent.type){
            setTable(tableVar.id, whichOldComponent.touch, true)
            touch.set({componentKind: whichOldComponent.kind, under: whichNewComponent.kind})
            setTable(tableVar.newId, whichOldComponent.kind, true)
            tableVar.id = parseInt(tableVar.newId)
            CheckStopStatus()
        }

        if(update.get && move.get !== ""){
            UpdateTable(buttonEvent.Start, buttonEvent.ClearPath, algorithm, speed)
        }
    }

    return {MouseDownHandler, MouseUpHandler, OnMouseEnterHanlder}

}

export default MouseEvent