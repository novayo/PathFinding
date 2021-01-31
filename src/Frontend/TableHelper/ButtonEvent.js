import { useContext } from 'react'
import { tableVar, touchContext, updateContext, componentKind, synchronize, originPos } from './TableIndex'
import { SearchAnimation, SearchBombAnimation, MazeAnimation, FinalAnimation, FinalMazeAnimation, stopStatus, resetAnimation, setAnimation, setMazeAnimation } from './Animation'
import { sysStatusContext, algorithmContext, bombContext, speedContext, animationStatusContext, position } from '../../Core'
import { setTable } from './SetTable'
import { UpdateTable } from './UpdateTable'
import { WhichComponentSame } from './WhichComp'


function ButtonEvent() {
    const [touch, update] = [useContext(touchContext), useContext(updateContext)]
    const [algorithm, bomb, sysSpeed, sysStatus, animation] = [useContext(algorithmContext), useContext(bombContext), useContext(speedContext), useContext(sysStatusContext), useContext(animationStatusContext)]

    const Start = (search = stopStatus.searchResult, path = stopStatus.pathResult, pathDirection = stopStatus.pathDirectionResult, speed = sysSpeed.get[1], bomb = stopStatus.bombResult) => {
        if(stopStatus.animationStatus){
            stopStatus.animationStatus = false
            return
        }

        if (sysStatus.get === "IDLE" || (sysStatus.get === "STOP" && algorithm.get !== stopStatus.algorithm)){
            setAnimation(search, path, pathDirection, bomb, algorithm.get)
            // resetAnimation()  // 執行start之前都會call ClearPath()
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

    const CreateMaze = (maze = stopStatus.mazeResult, speed = sysSpeed.get[1]) => {
        if (sysStatus.get === "IDLE" || (sysStatus.get === "STOP" && (animation.get === "Algorithm" || synchronize.animation === "Algorithm"))){
            setMazeAnimation(maze)
            // resetAnimation()  // 執行start之前都會call ClearPath()
        }

        if (speed === 0) {
            FinalMazeAnimation(maze)
        } else {
            sysStatus.set("RUNNING")
            animation.set("Maze")
            synchronize.animation = "Maze"
            stopStatus.animationStatus = true
            MazeAnimation(maze, speed, () => sysStatus.set("STOP"), () => {sysStatus.set("IDLE"); animation.set("Algorithm"); synchronize.animation = "Algorithm"})
        }
    }

    const CheckStopStatus = () => {
        if (sysStatus.get === "STOP"){
            if(animation.get === "Maze"){
                ClearWalls(false)
                animation.set("Algorithm")
                synchronize.animation = "Algorithm"
            } else {
                ClearPath()
            }
            sysStatus.set("IDLE")
        }
    }

    const Addbomb = () => {
        // console.log("AddBomb")
        const index = originPos.origin_bomb[0] * tableVar.colSize + originPos.origin_bomb[1]

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

    const RemoveBomb = (checkStopStatus = true) => {
        // console.log("RemoveBomb")
        if(position.bomb !== false){
            setTable(position.bomb, componentKind.background, true)
        }  
        bomb.set("False")

        if(checkStopStatus){
            CheckStopStatus()
        }

        if (update.get) {
            UpdateTable(Start, ClearPath, algorithm, sysSpeed)
        }
    }

    const ClearWalls = (checkStopStatus = true) => {
        // console.log("ClearWall")
        const wall = Object.keys(position.wall)
        for (var i = 0; i < wall.length; i++) {
            setTable(wall[i].split(","), componentKind.background, true)
        }
        ClearWeights(false)
        ClearPath()
        
        touch.set("")

        if (checkStopStatus){
            CheckStopStatus()
        }
    }

    const ClearWeights = (checkStopStatus = true) => {
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

        if(checkStopStatus){
            CheckStopStatus()
        }
    }

    const ClearPath = (event = true, reset = false) => {
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

        if(animation.get === "Algorithm" || reset){
            resetAnimation()
        }
    }

    const ClearBoard = () => {
        // console.log("ClearBoard")
        update.set("False")
        for (var i = 0; i < tableVar.rowSize * tableVar.colSize; i++) {
            setTable(i, componentKind.background, true)
        }
        setTable(originPos.origin_start[0] * tableVar.colSize + originPos.origin_start[1], componentKind.start, true)
        setTable(originPos.origin_end[0] * tableVar.colSize + originPos.origin_end[1], componentKind.end, true)
        touch.set("")
        bomb.set("False")
        CheckStopStatus()
    }

    return { Start, Addbomb, RemoveBomb, ClearWalls, ClearPath, ClearBoard, CreateMaze, ClearWeights }
}

export default ButtonEvent



