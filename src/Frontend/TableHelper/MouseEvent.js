import { useContext } from 'react'
import { sysStatusContext, algorithmContext, speedContext } from '../../Core/index'
import { tableVar, touchContext, moveContext, updateContext, componentKind } from './TableIndex'
import { setTable } from './SetTable'
import { UpdateTable } from './UpdateTable'
import { WhichComponent } from './WhichComp'
import ButtonEvent from './ButtonEvent'

function MouseEvent() {
    const [touch, move, update] = [useContext(touchContext), useContext(moveContext), useContext(updateContext)]
    const [algorithm, speed, sysStatus] = [useContext(algorithmContext), useContext(speedContext), useContext(sysStatusContext)]
    const buttonEvent = ButtonEvent()

    const MouseDownHandler = (e) => {
        // console.log("MouseDownHandler " + e.target.id)

        if (sysStatus.get !== "IDLE") {
            return
        }

        e.preventDefault()

        tableVar.id = e.target.id
        const whichComponent = WhichComponent(tableVar.id, touch)

        if(whichComponent.type){
            setTable(tableVar.id, whichComponent.rKind)
            move.set(componentKind.wall)

        }else{
            move.set(whichComponent.kind)
        }
    }

    const MouseUpHandler = (e) => {
        // console.log("MouseUpHandler " + e.target.id)

        if (sysStatus.get !== "IDLE") {
            return
        }

        move.set("")

        if(update.get && move.get !== ""){
            UpdateTable(buttonEvent.Start, buttonEvent.ClearPath, algorithm, speed)
        }
    }

    const OnMouseEnterHanlder = (e) => {
        // console.log("OnMouseEnterHanlder " + e.target.id)

        if (sysStatus.get !== "IDLE") {
            return
        }

        tableVar.newId = e.target.id
        const whichOldComponent = WhichComponent(tableVar.id, touch)
        const whichNewComponent = WhichComponent(tableVar.newId, touch)

        if(move.get === componentKind.wall && whichNewComponent.type){
            setTable(tableVar.newId, whichNewComponent.rKind)
            tableVar.id = tableVar.newId

        }else if(move.get !== componentKind.wall && move.get !== "" && whichNewComponent.type){
            setTable(tableVar.id, whichOldComponent.touch)
            touch.set({componentKind: whichOldComponent.kind, under: whichNewComponent.kind})
            setTable(tableVar.newId, whichOldComponent.kind)
            tableVar.id = tableVar.newId
        }

        if(update.get && move.get !== ""){
            UpdateTable(buttonEvent.Start, buttonEvent.ClearPath, algorithm, speed)
        }
    }

    return {MouseDownHandler, MouseUpHandler, OnMouseEnterHanlder}

}

export default MouseEvent