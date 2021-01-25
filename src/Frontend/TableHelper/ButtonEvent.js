import { useContext } from 'react'
import { tableVar, touchContext, updateContext, componentKind, synchronize } from './TableIndex'
import { SearchAnimation, SearchBombAnimation, MazeAnimation, FinalAnimation, FinalMazeAnimation, stopStatus, resetAnimation, setAnimation } from './Animation'
import { sysStatusContext, algorithmContext, bombContext, speedContext, position } from '../../Core'
import { setTable } from './SetTable'
import { UpdateTable } from './UpdateTable'
import { WhichComponentSame } from './WhichComp'


function ButtonEvent() {
    const [touch, update] = [useContext(touchContext), useContext(updateContext)]
    const [algorithm, bomb, sysSpeed, sysStatus] = [useContext(algorithmContext), useContext(bombContext), useContext(speedContext), useContext(sysStatusContext)]

    const Start = (search = stopStatus.searchResult, path = stopStatus.pathResult, pathDirection = stopStatus.pathDirectionResult, speed = sysSpeed.get[1], bomb = stopStatus.bombResult) => {
        if(stopStatus.animationStatus){
            stopStatus.animationStatus = false
            return
        }

        if (sysStatus.get === "IDLE" || (sysStatus.get === "STOP" && algorithm.get !== stopStatus.algorithm)){
            setAnimation(search, path, pathDirection, bomb, algorithm.get)
            resetAnimation()
        }

        if (update.get && synchronize.update) {
            FinalAnimation(search, path, pathDirection, bomb)
        } else {
            // console.log("Start")
            sysStatus.set("RUNNING")
            stopStatus.animationStatus = true
            SearchBombAnimation(search, bomb, path, pathDirection, speed, SearchAnimation, 
                () => sysStatus.set("STOP"), 
                () => {
                    update.set("True")
                    synchronize.update = true
                    sysStatus.set("IDLE")
                }
            )
        }
    }

    const CreateMaze = (maze, speed) => {
        if (speed === 0) {
            FinalMazeAnimation(maze)
        } else {
            sysStatus.set("RUNNING")
            MazeAnimation(maze, speed, () => sysStatus.set("IDLE"))
        }
    }

    const CheckStopStatus = () => {
        if (sysStatus.get === "STOP"){
            ClearPath()
            sysStatus.set("IDLE")
        }
    }

    const Addbomb = () => {
        // console.log("AddBomb")
        const index = Math.floor(tableVar.rowSize / 2) * tableVar.colSize + Math.floor(tableVar.colSize / 2)

        if (WhichComponentSame(index) <= 2) {
            return
        }

        bomb.set("True")
        setTable(index, componentKind.bomb, true)

        CheckStopStatus()

        if (update.get) {
            UpdateTable(Start, ClearPath, algorithm, sysSpeed)
        }
    }

    const RemoveBomb = () => {
        // console.log("RemoveBomb")
        if(position.bomb !== false){
            setTable(position.bomb, componentKind.background, true)
        }  
        bomb.set("False")

        CheckStopStatus()

        if (update.get) {
            UpdateTable(Start, ClearPath, algorithm, sysSpeed)
        }
    }

    const ClearWalls = () => {
        // console.log("ClearWall")
        const wall = Object.keys(position.wall)
        for (var i = 0; i < wall.length; i++) {
            setTable(wall[i].split(","), componentKind.background, true)
        }
        ClearWeights()
        ClearPath()
        CheckStopStatus()
        touch.set("")
    }

    const ClearWeights = () => {
        // console.log("ClearWeights")
        const weight = Object.keys(position.weight)
        for (var i = 0; i < weight.length; i++) {
            setTable(weight[i].split(","), componentKind.background, true)
        }
        if(touch.get.start !== componentKind.wall){
            touch.set({componentKind: componentKind.start, under: componentKind.background})
        }
        if(touch.get.end !== componentKind.wall){
            touch.set({componentKind: componentKind.end, under: componentKind.background})
        }
        if(touch.get.bomb !== componentKind.wall){
            touch.set({componentKind: componentKind.bomb, under: componentKind.background})
        }
        CheckStopStatus()
    }

    const ClearPath = (event = true) => {
        // console.log("ClearPath")

        if (event) {
            update.set("False")
            synchronize.update = false
        }

        for (var i = 0; i < tableVar.rowSize * tableVar.colSize; i++) {
            if (WhichComponentSame(i) >= 5) {
                setTable(i, componentKind.background)
            } else if (WhichComponentSame(i) === 3) {
                setTable(i, componentKind.weightStatic)
            } else if (WhichComponentSame(i) === 2) {
                setTable(i, componentKind.bomb)
            } else if (WhichComponentSame(i) === 1) {
                setTable(i, componentKind.end)
            } else if (WhichComponentSame(i) === 0) {
                setTable(i, componentKind.start)
            }
        }
        resetAnimation()
    }

    const ClearBoard = () => {
        // console.log("ClearBoard")
        update.set("False")
        for (var i = 0; i < tableVar.rowSize * tableVar.colSize; i++) {
            setTable(i, componentKind.background, true)
        }
        setTable(Math.floor(tableVar.rowSize / 2) * tableVar.colSize + Math.floor(tableVar.colSize / 4), componentKind.start, true)
        setTable(Math.floor(tableVar.rowSize / 2 + 1) * tableVar.colSize - Math.floor(tableVar.colSize / 4), componentKind.end, true)
        touch.set("")
        bomb.set("False")
        CheckStopStatus()
    }

    return { Start, Addbomb, RemoveBomb, ClearWalls, ClearPath, ClearBoard, CreateMaze, ClearWeights }
}

export default ButtonEvent



