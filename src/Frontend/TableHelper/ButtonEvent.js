import { useContext } from 'react'
import { tableVar, touchContext, updateContext, componentKind } from './TableIndex'
import { SearchAnimation, SearchBombAnimation, MazeAnimation, FinalAnimation } from './Animation'
import { sysStatusContext, algorithmContext, bombContext, speedContext } from '../../Core'
import { setTable, backgroundReset } from './SetTable'
import { UpdateTable } from './UpdateTable'
import { WhichComponentSame } from './WhichComp'


function ButtonEvent() {
    const [touch, update] = [useContext(touchContext), useContext(updateContext)]
    const [algorithm, bomb, speed, sysStatus] = [useContext(algorithmContext), useContext(bombContext), useContext(speedContext), useContext(sysStatusContext)]
    var updateVar = true

    const Start = (search, path, speed, bomb = []) => {
        if (update.get && updateVar) {
            FinalAnimation(search, path, bomb)
        }else {
            sysStatus.set("RUNNING")
            update.set("True")
            updateVar = true
            console.log("Start")
            SearchBombAnimation(search, bomb, path, speed, 0, SearchAnimation, () => sysStatus.set("IDLE"))
        }
    }

    const CreateMaze = (maze, speed) => {
        backgroundReset()
        sysStatus.set("RUNNING");
        MazeAnimation(maze, speed, 0, () => sysStatus.set("IDLE"));
    }

    const Addbomb = () => {
        console.log("AddBomb" + update.get)
        const index = Math.floor(tableVar.rowSize / 2) * tableVar.colSize + Math.floor(tableVar.colSize / 2)
        const name = document.getElementById(index.toString()).className

        if (WhichComponentSame(name) <= 2) {
            return
        }

        bomb.set("True")
        setTable(index.toString(), componentKind.bomb)

        if (update.get) {
            UpdateTable(Start, ClearPath, algorithm, speed)
        }
    }

    const RemoveBomb = () => {
        console.log("RemoveBomb")
        for (var i = 0; i < tableVar.rowSize * tableVar.colSize; i++) {
            const name = document.getElementById(i.toString()).className
            if (WhichComponentSame(name) === 2) {
                setTable(i, componentKind.background)
                break
            }
        }
        bomb.set("False")

        if (update.get) {
            UpdateTable(Start, ClearPath, algorithm, speed)
        }
    }

    const ClearWalls = () => {
        console.log("ClearWall")
        for (var i = 0; i < tableVar.rowSize * tableVar.colSize; i++) {
            const name = document.getElementById(i.toString()).className
            if (WhichComponentSame(name) === 3 || WhichComponentSame(name) === 4) {
                setTable(i, componentKind.background)
            }
        }
        touch.set("")
        ClearPath()
    }

    const ClearPath = (event = true) => {
        console.log("ClearPath")
        backgroundReset()
        if (event) {
            update.set("False")
            updateVar = false
        }
        for (var i = 0; i < tableVar.rowSize * tableVar.colSize; i++) {
            const name = document.getElementById(i.toString()).className
            if (WhichComponentSame(name) >= 5 && WhichComponentSame(name) <= 7) {
                setTable(i, componentKind.background)
            }
        }
    }

    const ClearBoard = () => {
        console.log("ClearBoard")
        update.set("False")
        for (var i = 0; i < tableVar.rowSize * tableVar.colSize; i++) {
            setTable(i, componentKind.background)
        }
        setTable(Math.floor(tableVar.rowSize / 2) * tableVar.colSize + Math.floor(tableVar.colSize / 4), componentKind.start)
        setTable(Math.floor(tableVar.rowSize / 2 + 1) * tableVar.colSize - Math.floor(tableVar.colSize / 4), componentKind.end)
        touch.set("")
        bomb.set("False")
    }

    return { Start, Addbomb, RemoveBomb, ClearWalls, ClearPath, ClearBoard, CreateMaze }
}

export default ButtonEvent



