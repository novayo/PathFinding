import { useContext } from 'react'
import { tableVar, touchContext, picture, setTable } from './TableIndex'
import { SearchAnimation, PathAnimation } from './Animation'
import { sysStatusContext, bombContext } from '../../Core';


function ButtonEvent() {
    const touch = useContext(touchContext)
    const sysStatus = useContext(sysStatusContext)
    const bomb = useContext(bombContext)

    const Start = (search, path, speed) => {
        sysStatus.set("RUNNING")
        console.log("Start")
        SearchAnimation(search, speed, 0)
        setTimeout(() => {PathAnimation(path, speed, 0); sysStatus.set("IDLE")}, speed * (search.length + 1))
    }

    const Addbomb = () => {
        bomb.set("True")
        console.log("AddBomb")
        setTable(Math.floor(tableVar.rowSize / 2) * tableVar.colSize + Math.floor(tableVar.colSize / 2), picture.bomb)
        bomb.set("False")
    }

    const RemoveBomb = () => {
        console.log("RemoveBomb")
        for(var i = 0; i < tableVar.rowSize * tableVar.colSize;i++){
            if(tableVar.table[i] === picture.bomb){
                setTable(i, picture.background)
                break
            }
        }
    }

    const ClearWalls = () => {
        console.log("ClearWall")
        for(var i = 0; i < tableVar.rowSize * tableVar.colSize;i++){
            if(tableVar.table[i] === picture.wall){
                setTable(i, picture.background)
            }
        }
        touch.set({componentKind: "", picture: ""})
    }

    const ClearPath = () => {
        console.log("ClearPath")
        for(var i = 0; i < tableVar.rowSize * tableVar.colSize;i++){
            if(tableVar.table[i] === picture.search || tableVar.table[i] === picture.path){
                setTable(i, picture.background)
            }
        }
    }

    const ClearBoard = () => {
        console.log("ClearBoard")
        for(var i = 0; i < tableVar.rowSize * tableVar.colSize;i++){
            setTable(i, picture.background)
        }
        setTable(Math.floor(tableVar.rowSize / 2) * tableVar.colSize + Math.floor(tableVar.colSize / 4), picture.start)
        setTable(Math.floor(tableVar.rowSize / 2 + 1) * tableVar.colSize - Math.floor(tableVar.colSize / 4), picture.end)
        touch.set({componentKind: "", picture: ""})
        bomb.set("False")
    }

    return { Start, Addbomb, RemoveBomb, ClearWalls, ClearPath, ClearBoard }
}

export default ButtonEvent



