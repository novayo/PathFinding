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

    useEffect(() => { // 因為第一次 addEventListener algorithm.get sysStatus.get 會是空白
        synchronize.algorithm = algorithm
        synchronize.sysStatus = sysStatus
        // eslint-disable-next-line
    }, [algorithm.get, sysStatus.get])

    document.addEventListener('keydown', function(event) {
        if(synchronize.sysStatus.get !== "IDLE" && synchronize.sysStatus.get !== "STOP"){ // sysStatus = "IDLE" & "STOP" lock keyboard
            return
        }
        if(keyboardSupport.down){ // 避免連續觸發
            KeyboardEvent(event, synchronize.algorithm, weightValue)
        }
    })
    document.addEventListener('keyup', function(event) {
        if(keyboardSupport.down === false){
            KeyboardEvent(event, synchronize.algorithm)
        }
    })
    document.addEventListener('mouseup', () => move.set(""));

    const CheckStopStatus = () => { // 當 sysStatus = "STOP" 時，Algorithm ==> ClearWalls & Maze ==> ClearPath
        if (sysStatus.get === "STOP"){
            if(animation.get === "Maze"){
                buttonEvent.ClearWalls(false) // false 避免形成遞迴
                animation.set("Algorithm")
            } else {
                buttonEvent.ClearPath()
            }
            sysStatus.set("IDLE")
        }
    }

    const MouseDownHandler = (e) => {
        // console.log("MouseDownHandler " + e.target.id)

        if ((sysStatus.get !== "IDLE" && sysStatus.get !== "STOP") || componentKind.add === false) { // sysStatus = "IDLE" & "STOP" lock Mouse
            return
        }

        e.preventDefault()

        tableVar.id = parseInt(e.target.id)
        const whichComponent = WhichComponent(tableVar.id, touch)

        if(whichComponent.type){ // 若是新增 wall weight 須立即新增
            CheckStopStatus()
            setTable(tableVar.id, whichComponent.rKind, true)
            move.set(componentKind.add)

        }else{
            move.set(whichComponent.kind)
        }
        
        if(update.get){
            UpdateTable(buttonEvent.Start, buttonEvent.ClearPath, algorithm, speed)
        }
    }

    const MouseUpHandler = (e) => {
        // console.log("MouseUpHandler " + e.target.id)

        if ((sysStatus.get !== "IDLE" && sysStatus.get !== "STOP") || componentKind.add === false) { // sysStatus = "IDLE" & "STOP" lock Mouse
            return
        }

        move.set("")
    }

    const OnMouseEnterHanlder = (e) => {
        // console.log("OnMouseEnterHanlder " + e.target.id)

        if ((sysStatus.get !== "IDLE" && sysStatus.get !== "STOP") || componentKind.add === false) { // sysStatus = "IDLE" & "STOP" lock Mouse
            return
        }

        tableVar.newId = parseInt(e.target.id)
        const whichOldComponent = WhichComponent(tableVar.id, touch)
        const whichNewComponent = WhichComponent(tableVar.newId, touch)

        if(move.get === componentKind.add && whichNewComponent.type && tableVar.id !== tableVar.newId){ // 若是新增 wall weight，不須清除舊id的物件
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

        if(update.get && move.get !== ""){ // 若 update = true 直接重新 UpdateTable
            UpdateTable(buttonEvent.Start, buttonEvent.ClearPath, algorithm, speed)
        }
    }

    return {MouseDownHandler, MouseUpHandler, OnMouseEnterHanlder}

}

export default MouseEvent