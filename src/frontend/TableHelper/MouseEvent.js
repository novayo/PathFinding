import { useContext } from 'react'
import { sysStatusContext } from '../../Core/index'
import { tableVar, touchContext, moveContext, componentKind, picture, setTable } from './TableIndex'


function MouseEvent() {
    const [touch, move, sysStatus] = [useContext(touchContext), useContext(moveContext), useContext(sysStatusContext)]

    function WhichComponent(element){
        if(element === picture.start){
            return {kind: componentKind.start, picture: picture.start, touch: touch.get.start, type: 0}
        }else if(element === picture.end){
            return {kind: componentKind.end, picture: picture.end, touch: touch.get.end, type: 0}
        }else if(element === picture.bomb){
            return {kind: componentKind.bomb, picture: picture.bomb, touch: touch.get.bomb, type: 0}
        }else if(element === picture.wall){
            return {kind: componentKind.wall, rKind: componentKind.background, picture: picture.wall, rPicture: picture.background, type: 1}
        }else{
            return {kind: componentKind.background, rKind: componentKind.wall, picture: picture.background, rPicture: picture.wall, type: 1}
        }
    }

    const MouseDownHandler = (e) => {
        // console.log("MouseDownHandler " + e.target.id)

        if (sysStatus.get !== "IDLE") {
            return
        }

        e.preventDefault()

        tableVar.id = parseInt(e.target.id)
        const whichComponent = WhichComponent(tableVar.table[tableVar.id])

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
        const whichOldComponent = WhichComponent(tableVar.table[tableVar.id])
        const whichNewComponent = WhichComponent(tableVar.table[tableVar.newId])

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