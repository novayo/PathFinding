import { useContext } from 'react'
import TableUI from './TableUI';
import { tableVar, tableContext, touchContext, moveContext, componentKind, initialTable, picture } from './TableIndex'
import ReactDOM from 'react-dom'
import MouseEvent from './MouseEvent'


function ButtonEvent() {
    const [rowSize, colSize] = [tableVar.rowSize, tableVar.colSize]
    const [table, touch, move] = [useContext(tableContext), useContext(touchContext), useContext(moveContext)]
    var temp = table.get.slice()
    const mouesEvent = MouseEvent()
    const [MouseDownHandler, MouseUpHandler, OnMouseEnterHanlder, OnMouseOutHanlder] = [mouesEvent.MouseDownHandler, mouesEvent.MouseUpHandler, mouesEvent.OnMouseEnterHanlder, mouesEvent.OnMouseOutHanlder]

    function SearchAnimation(search, speed, count) { 
        const SearchAnimation = setInterval(() => {
            for(var i = 0;i < search[count].length;i++){
                temp[search[count][i][0] * colSize + search[count][i][1]] = picture.search
            }
            table.set(temp, true)
            count += 1
        }, speed)
        clearInterval(SearchAnimation)
    }

    function PathAnimation(path, speed, count) { 
        const PathAnimation = setInterval(() => {
            console.log(count)
            if(count === path.length){
                clearInterval(PathAnimation)
            }else{
                temp[path[count][0] * tableVar.colSize + path[count][1]] = picture.path
                table.set(temp, true)
            }
            count += 1
        }, speed)
    }

    const Start = (search, path, speed) => {
        console.log("Start")
        tableVar.init = temp.slice()
        PathAnimation(path, speed, 0)
        // setTimeout(() => {PathAnimation(path, speed, count)}, speed * (search.length + 1))
    }

    const Addbomb = () => {
        console.log("AddBomb")
        temp[Math.floor(rowSize / 2) * colSize + Math.floor(colSize / 2)] = picture.bomb
        table.set(temp, true)
    }

    const RemoveBomb = () => {
        console.log("RemoveBomb")
        for(var i = 0; i < rowSize * colSize;i++){
            if(temp[i] === picture.bomb){
                temp[i] = picture.background
            }
        }
        table.set(temp, true)
    }

    const ClearWalls = () => {
        console.log("ClearWall")
        for(var i = 0; i < rowSize * colSize;i++){
            if(temp[i] === picture.wall){
                temp[i] = picture.background
            }
        }
        table.set(temp, true)
        touch.set(false)
    }

    const ClearPath = () => {
        console.log("ClearPath")
        console.log(Array.isArray(tableVar.init))
        if(Array.isArray(tableVar.init)){
            table.set(tableVar.init, true)
            tableVar.init = ""
        }
    }

    const ClearBoard = () => {
        console.log("ClearBoard")
        table.set(initialTable, true)
        touch.set(false)
    }

    return { Addbomb, RemoveBomb, ClearWalls, ClearBoard, Start, ClearPath }
}

export default ButtonEvent



