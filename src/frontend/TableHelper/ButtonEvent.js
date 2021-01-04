import { useContext } from 'react'
import { tableVar, touchContext, picture, setTable } from './TableIndex'


function ButtonEvent() {
    const [rowSize, colSize, touch] = [tableVar.rowSize, tableVar.colSize ,useContext(touchContext)]

    function Animation(arr, speed, count, picture) { 
        const arrAnimation = setInterval(() => {
            if(count === arr.length){
                clearInterval(arrAnimation)
            }else{
                setTable(arr[count][0] * tableVar.colSize + arr[count][1], picture)
            }
            count += 1
        }, speed / arr.length)
    }

    function SearchAnimation(search, speed, count) { 
        const searchAnimation = setInterval(() => {
            if(count === search.length - 1){
                clearInterval(searchAnimation)
            }
            Animation(search[count], speed, 0, picture.search)
            count += 1
        }, speed)
        
    }

    function PathAnimation(path, speed, count) { 
        Animation(path, speed, count, picture.path)
    }

    const Start = (search, path, speed) => {
        console.log("Start")
        SearchAnimation(search, speed, 0)
        setTimeout(() => {PathAnimation(path, speed, 0)}, speed * (search.length + 1))
    }

    const Addbomb = () => {
        console.log("AddBomb")
        setTable(Math.floor(rowSize / 2) * colSize + Math.floor(colSize / 2), picture.bomb)
    }

    const RemoveBomb = () => {
        console.log("RemoveBomb")
        for(var i = 0; i < rowSize * colSize;i++){
            if(tableVar.table[i] === picture.bomb){
                setTable(i, picture.background)
                break
            }
        }
    }

    const ClearWalls = () => {
        console.log("ClearWall")
        for(var i = 0; i < rowSize * colSize;i++){
            if(tableVar.table[i] === picture.wall){
                setTable(i, picture.background)
            }
        }
        touch.set({componentKind: "", picture: ""})
    }

    const ClearPath = () => {
        console.log("ClearPath")
        for(var i = 0; i < rowSize * colSize;i++){
            if(tableVar.table[i] === picture.search || tableVar.table[i] === picture.path){
                setTable(i, picture.background)
            }
        }
    }

    const ClearBoard = () => {
        console.log("ClearBoard")
        for(var i = 0; i < rowSize * colSize;i++){
            setTable(i, picture.background)
        }
        setTable(Math.floor(tableVar.rowSize / 2) * tableVar.colSize + Math.floor(tableVar.colSize / 4), picture.start)
        setTable(Math.floor(tableVar.rowSize / 2 + 1) * tableVar.colSize - Math.floor(tableVar.colSize / 4), picture.end)
        touch.set({componentKind: "", picture: ""})
    }

    return { Addbomb, RemoveBomb, ClearWalls, ClearBoard, Start, ClearPath }
}

export default ButtonEvent



