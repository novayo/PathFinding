import { useContext } from 'react'
import { sysStatusContext } from '../../Core/index'
import { tableVar, touchContext, moveContext, componentKind, setTable } from './TableIndex'
import { WhichComponent } from './WhichComp'

function MouseEvent() {
    const [touch, move, sysStatus] = [useContext(touchContext), useContext(moveContext), useContext(sysStatusContext)]

    const MouseDownHandler = (e) => {
        // console.log("MouseDownHandler " + e.target.id)

        if (sysStatus.get !== "IDLE") {
            return
        }

        e.preventDefault()

        tableVar.id = parseInt(e.target.id)
        const whichComponent = WhichComponent(tableVar.table[tableVar.id], touch)

        if(whichComponent.type){
            setTable(tableVar.id, whichComponent.rPicture)
            move.set(whichComponent.rKind)
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

        tableVar.newId = parseInt(e.target.id)
        const whichOldComponent = WhichComponent(tableVar.table[tableVar.id], touch)
        const whichNewComponent = WhichComponent(tableVar.table[tableVar.newId], touch)

        if(move.get === componentKind.wall && whichNewComponent.type){
            setTable(tableVar.newId, whichNewComponent.rPicture)
            tableVar.id = tableVar.newId
        }else if(move.get !== componentKind.wall && move.get !== ""){
            if(whichNewComponent.type){
                setTable(tableVar.id, whichOldComponent.touch)
                touch.set({componentKind: whichOldComponent.kind, picture: whichNewComponent.picture})
                setTable(tableVar.newId, whichOldComponent.picture)
                tableVar.id = tableVar.newId
            }
        }
    }

    return {MouseDownHandler, MouseUpHandler, OnMouseEnterHanlder}

}

export default MouseEvent