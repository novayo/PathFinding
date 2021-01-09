import { useContext } from 'react'
import { tableVar, touchContext, componentKind } from './TableIndex'
import { SearchAnimation, PathAnimation } from './Animation'
import { sysStatusContext, bombContext } from '../../Core'
import { setTable } from './SetTable'
import { WhichComponent } from './WhichComp'


function ButtonEvent() {
    const touch = useContext(touchContext)
    const sysStatus = useContext(sysStatusContext)
    const bomb = useContext(bombContext)

    const Start = (search, path, speed) => {
        console.log(search, path)
        sysStatus.set("RUNNING")
        console.log("Start")
        SearchAnimation(search, speed, 0)
        setTimeout(() => PathAnimation(path, speed, 0, () => sysStatus.set("IDLE")), speed * (search.length + 1))
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

    const ClearPath = () => {
        console.log("ClearPath")
        for (var i = 0; i < tableVar.rowSize * tableVar.colSize; i++) {
            if (document.getElementById(i.toString()).className === componentKind.search || document.getElementById(i.toString()).className === componentKind.path) {
                setTable(i, componentKind.background)
            }
        }
    }

    const ClearBoard = () => {
        console.log("ClearBoard")
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



