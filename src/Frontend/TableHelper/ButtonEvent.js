import { useContext } from 'react'
import { tableVar, touchContext, updateContext, componentKind } from './TableIndex'
import { SearchAnimation, PathAnimation, MazeAnimation } from './Animation'
import { sysStatusContext, bombContext } from '../../Core'
import { setTable } from './SetTable'
import { WhichComponent } from './WhichComp'


function ButtonEvent() {
    const touch = useContext(touchContext)
    const sysStatus = useContext(sysStatusContext)
    const bomb = useContext(bombContext)
    const update = useContext(updateContext)

    const Start = (search, path, speed) => {
        if(update.get){
            for(var i = 0;i < search.length;i++){
                for(var j = 0;j < search[i].length;j++){
                    const index = search[i][j][0] * tableVar.colSize + search[i][j][1]
                    if(WhichComponent(index.toString(), touch).type){
                        setTable(index, componentKind.searchFinal)
                    }
                }
            }
            for(i = 0;i < path.length;i++){
                const index = path[i][0] * tableVar.colSize + path[i][1]
                if(WhichComponent(index.toString(), touch).type){
                    setTable(index, componentKind.pathFinal)
                }
            }

        }else{
            sysStatus.set("RUNNING")
            update.set("True")
            console.log("Start")
            SearchAnimation(search, speed, 0)
            setTimeout(() => PathAnimation(path, speed, 0, () => sysStatus.set("IDLE")), speed * (search.length + 1))
        }
    }

    const CreateMaze = (maze, speed) {
        MazeAnimation(maze, speed, 0)
    }

    const Addbomb = () => {
        console.log("AddBomb")
        const index = Math.floor(tableVar.rowSize / 2) * tableVar.colSize + Math.floor(tableVar.colSize / 2)

        if (WhichComponent(index.toString(), touch).type === 0) {
            return
        }

        bomb.set("True")
        setTable(index.toString(), componentKind.bomb)
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
    }

    const ClearWalls = () => {
        console.log("ClearWall")
        for (var i = 0; i < tableVar.rowSize * tableVar.colSize; i++) {
            if (document.getElementById(i.toString()).className === componentKind.wall) {
                setTable(i, componentKind.background)
            }
        }
        touch.set("")
    }

    const ClearPathMouseEvent = () => {
        for (var i = 0; i < tableVar.rowSize * tableVar.colSize; i++) {
            const name = document.getElementById(i.toString()).className
            if (name === componentKind.search || name === componentKind.searchFinal || name === componentKind.searchBomb || name === componentKind.path || name === componentKind.pathFinal) {
                setTable(i, componentKind.background)
            }
        }
    }

    const ClearPath = () => {
        console.log("ClearPath")
        ClearPathMouseEvent()
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

    return { Start, Addbomb, RemoveBomb, ClearWalls, ClearPath, ClearBoard }
}

export default ButtonEvent



