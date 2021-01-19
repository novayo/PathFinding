import { useContext } from 'react'
import { tableVar, touchContext, updateContext, componentKind } from './TableIndex'
import { SearchAnimation, SearchBombAnimation, MazeAnimation, FinalAnimation } from './Animation'
import { sysStatusContext, algorithmContext, bombContext, speedContext } from '../../Core'
import { setTable, backgroundReset } from './SetTable'
import { UpdateTable } from './UpdateTable'
import { WhichComponentSame } from './WhichComp'


function ButtonEvent() {
    const [touch, update] = [useContext(touchContext), useContext(updateContext)]
    const [algorithm, bomb, sysSpeed, sysStatus] = [useContext(algorithmContext), useContext(bombContext), useContext(speedContext), useContext(sysStatusContext)]
    var updateVar = true

    const Start = (search, path, speed, bomb = []) => {
        if (update.get && updateVar) {
            FinalAnimation(search, path, bomb)
        }else {
            // console.log("Start")
            sysStatus.set("RUNNING")
            update.set("True")
            updateVar = true
            speed = speed / (search.length + bomb.length + path.length * 0.5)
            SearchBombAnimation(search, bomb, path, speed, 0, SearchAnimation, () => sysStatus.set("IDLE"))
        }
    }

    const CreateMaze = (maze, speed) => {
        backgroundReset()
        sysStatus.set("RUNNING")
        if(sysSpeed.get[0] === "Average"){
            speed *= 10
        }else if(sysSpeed.get[0] === "Slow"){
            speed *= 10
        }
        speed = speed / maze.length * 0.5
        MazeAnimation(maze, speed, 0, () => sysStatus.set("IDLE"))
    }

    const Addbomb = () => {
        // console.log("AddBomb")
        const index = Math.floor(tableVar.rowSize / 2) * tableVar.colSize + Math.floor(tableVar.colSize / 2)

        if (WhichComponentSame(index) <= 2) {
            return
        }

        bomb.set("True")
        setTable(index, componentKind.bomb, true)

        if (update.get) {
            UpdateTable(Start, ClearPath, algorithm, sysSpeed)
        }
    }

    const RemoveBomb = () => {
        // console.log("RemoveBomb")
        for (var i = 0; i < tableVar.rowSize * tableVar.colSize; i++) {
            if (WhichComponentSame(i) === 2) {
                setTable(i, componentKind.background, true)
                break
            }
        }
        bomb.set("False")

        if (update.get) {
            UpdateTable(Start, ClearPath, algorithm, sysSpeed)
        }
    }

    const ClearWalls = () => {
        // console.log("ClearWall")
        for (var i = 0; i < tableVar.rowSize * tableVar.colSize; i++) {
            if (WhichComponentSame(i) === 3 || WhichComponentSame(i) === 4) {
                setTable(i, componentKind.background, true)
            }
        }
        touch.set("")
        ClearPath()
    }

    const ClearPath = (event = true) => {
        // console.log("ClearPath")
        backgroundReset()
        if (event) {
            update.set("False")
            updateVar = false
        }
        for (var i = 0; i < tableVar.rowSize * tableVar.colSize; i++) {
            if (WhichComponentSame(i) >= 5) {
                setTable(i, componentKind.background, true)
            }
        }
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
    }

    return { Start, Addbomb, RemoveBomb, ClearWalls, ClearPath, ClearBoard, CreateMaze }
}

export default ButtonEvent



