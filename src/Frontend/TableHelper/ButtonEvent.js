import { useContext } from 'react'
import { tableVar, touchContext, updateContext, componentKind } from './TableIndex'
import { SearchAnimation, SearchBombAnimation, MazeAnimation } from './Animation'
import { sysStatusContext, algorithmContext, bombContext, speedContext } from '../../Core'
import { setTable } from './SetTable'
import { UpdateTable } from './UpdateTable'
import { WhichComponent } from './WhichComp'


function ButtonEvent() {
    const [touch, update] = [useContext(touchContext), useContext(updateContext)]
    const [algorithm, bomb, speed, sysStatus] = [useContext(algorithmContext), useContext(bombContext), useContext(speedContext), useContext(sysStatusContext)]
    var updateVar = true

    const Start = (search, path, speed, bomb = []) => {
        if (update.get && updateVar) {
            for (var i = 0; i < search.length; i++) {
                for (var j = 0; j < search[i].length; j++) {
                    const index = search[i][j][0] * tableVar.colSize + search[i][j][1]
                    if (WhichComponent(index.toString(), touch).type) {
                        if(bomb.length === 0){
                            setTable(index, componentKind.searchFinal)
                        }else{
                            setTable(index, componentKind.searchBombFinal)
                        }
                    }
                }
            }
            for (i = 0; i < bomb.length; i++) {
                for (j = 0; j < bomb[i].length; j++) {
                    const index = bomb[i][j][0] * tableVar.colSize + bomb[i][j][1]
                    if (WhichComponent(index.toString(), touch).type) {
                        setTable(index, componentKind.searchFinal)
                    }
                }
            }
            for (i = 0; i < path.length; i++) {
                const index = path[i][0] * tableVar.colSize + path[i][1]
                if (WhichComponent(index.toString(), touch).type) {
                    setTable(index, componentKind.pathFinal)
                }
            }

        }else {
            sysStatus.set("RUNNING")
            update.set("True")
            updateVar = true
            console.log("Start")
            SearchBombAnimation(search, bomb, path, speed, 0, SearchAnimation, () => sysStatus.set("IDLE"))
        }
    }

    const CreateMaze = (maze, speed) => {
        sysStatus.set("RUNNING");
        MazeAnimation(maze, speed, 0, () => sysStatus.set("IDLE"));
    }

    const Addbomb = () => {
        console.log("AddBomb" + update.get)
        const index = Math.floor(tableVar.rowSize / 2) * tableVar.colSize + Math.floor(tableVar.colSize / 2)

        if (WhichComponent(index.toString(), touch).type === 0) {
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
            if (document.getElementById(i.toString()).className === componentKind.bomb) {
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
            if (document.getElementById(i.toString()).className === componentKind.wall) {
                setTable(i, componentKind.background)
            }
        }
        touch.set("")
        update.set("False")
    }

    const ClearPath = (event = true) => {
        console.log("ClearPath")
        if (event) {
            update.set("False")
            updateVar = false
        }
        for (var i = 0; i < tableVar.rowSize * tableVar.colSize; i++) {
            const name = document.getElementById(i.toString()).className
            if (name === componentKind.search || name === componentKind.searchFinal || name === componentKind.searchBomb || name === componentKind.searchBombFinal || name === componentKind.path || name === componentKind.pathFinal) {
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



