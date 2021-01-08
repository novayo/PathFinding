import { useContext } from 'react'
import { sysStatusContext } from '../../Core/index'
import { tableVar, touchContext, moveContext, componentKind } from './TableIndex'
import { setTable } from './SetTable'
import { WhichComponent } from './WhichComp'

function MouseEvent() {
    const [touch, move, sysStatus] = [useContext(touchContext), useContext(moveContext), useContext(sysStatusContext)]

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
    }

    return {MouseDownHandler, MouseUpHandler, OnMouseEnterHanlder}

}

export default MouseEvent