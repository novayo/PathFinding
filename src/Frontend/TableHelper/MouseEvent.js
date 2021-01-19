import { useContext, useEffect } from 'react'
import { sysStatusContext, algorithmContext, speedContext } from '../../Core/index'
import { tableVar, touchContext, moveContext, updateContext, componentKind, keyboardSupport } from './TableIndex'
import { setTable } from './SetTable'
import { UpdateTable } from './UpdateTable'
import { WhichComponent } from './WhichComp'
import { KeyboardEvent } from './KeyboardEvent'
import ButtonEvent from './ButtonEvent'

function MouseEvent() {
    const [touch, move, update] = [useContext(touchContext), useContext(moveContext), useContext(updateContext)]
    const [algorithm, speed, sysStatus] = [useContext(algorithmContext), useContext(speedContext), useContext(sysStatusContext)]
    const buttonEvent = ButtonEvent()

    useEffect(() => {
        document.addEventListener('keydown', function(event) {
            if(keyboardSupport.down){
                KeyboardEvent(event)
            }
        })
        document.addEventListener('keyup', function(event) {
            if(keyboardSupport.down === false){
                KeyboardEvent(event)
            }
        })
    })

    const MouseDownHandler = (e) => {
        // console.log("MouseDownHandler " + e.target.id)

        if (sysStatus.get !== "IDLE") {
            return
        }

        e.preventDefault()

        tableVar.id = parseInt(e.target.id)
        const whichComponent = WhichComponent(tableVar.id, touch)

        if(whichComponent.type){
            setTable(tableVar.id, whichComponent.rKind, true)
            move.set(componentKind.add)

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

        tableVar.newId = parseInt(e.target.id)
        const whichOldComponent = WhichComponent(tableVar.id, touch)
        const whichNewComponent = WhichComponent(tableVar.newId, touch)

        if(move.get === componentKind.add && whichNewComponent.type){
            setTable(tableVar.newId, whichNewComponent.rKind, true)
            tableVar.id = parseInt(tableVar.newId)

        }else if(move.get !== componentKind.add && move.get !== "" && whichNewComponent.type){
            setTable(tableVar.id, whichOldComponent.touch, true)
            touch.set({componentKind: whichOldComponent.kind, under: whichNewComponent.kind})
            setTable(tableVar.newId, whichOldComponent.kind, true)
            tableVar.id = parseInt(tableVar.newId)
        }

        if(update.get && move.get !== ""){
            UpdateTable(buttonEvent.Start, buttonEvent.ClearPath, algorithm, speed)
        }
    }

    return {MouseDownHandler, MouseUpHandler, OnMouseEnterHanlder}

}

export default MouseEvent