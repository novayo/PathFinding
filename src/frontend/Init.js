import React, {useState, useEffect} from 'react'
import {table, tbody, tr, td, Button} from 'react-bootstrap'


function Init(props) {
    const [rowSize, colSize, size] = [props.row, props.col, props.size]
    const row = Array.from(Array(rowSize).keys())
    const col = Array.from(Array(colSize).keys())

    const [wall, setWall] = useState(false)
    const [bomb, setBomb] = useState(false)
    const [move, setMove] = useState({bombComponent: false, startComponent: false, endComponent: false})
    const picture = {wall: "blue", bomb: "red", start: "green", end: "#F5F500", background: "white"}
    // const [thing, setThing] = useState("Wall")
    const initialTable = Array.from(Array(rowSize * colSize).keys(), index => {
        if(index === Math.floor(rowSize / 2) * colSize + Math.floor(colSize / 4)){
            return picture.start
        }else if(index === Math.floor(rowSize / 2 + 1) * colSize - Math.floor(colSize / 4)){
            return picture.end
        }else{
            return picture.background
        }
    })
    const [tableColor, setTableColor] = useState(initialTable)
    var temp = tableColor.slice()

    const AddBombHanlder = (e) => {
        if(bomb === false){
            setBomb(true)
            temp[Math.floor(rowSize / 2) * colSize + Math.floor(colSize / 2)] = picture.bomb
            setTableColor(temp)
        }
    }

    const ResetBoardHanlder = () => {
        setTableColor(initialTable)
        setBomb(false)
    }

    const ClearWallHanlder = () => {
        for(var i = 0; i < rowSize * colSize;i++){
            if(temp[i] === picture.wall){
                temp[i] = picture.background
            }
        }
        setTableColor(temp)
    }

    const ClickUpHandler = (e) => {
        console.log("ClickUpHandler " + e.target.id)
        if(wall){
            setWall(false)
        }else{
            if(temp[parseInt(e.target.id)] === picture.bomb){
                setMove({...move, bombComponent: false})
            }else if(temp[parseInt(e.target.id)] === picture.start){
                setMove({...move, startComponent: false})
            }else{
                setMove({...move, endComponent: false})
            }
        }
    }

    const ClickDownHandler = (e) => {
        e.preventDefault()
        console.log("ClickDownHandler " + e.target.id)
        if(temp[parseInt(e.target.id)] !== picture.bomb && temp[parseInt(e.target.id)] !== picture.start && temp[parseInt(e.target.id)] !== picture.end){
            setWall(true)
            if(temp[parseInt(e.target.id)] === picture.background){
                temp[parseInt(e.target.id)] = picture.wall
            }else{
                temp[parseInt(e.target.id)] = picture.background
            }
            setTableColor(temp)
        }else{
            if(temp[parseInt(e.target.id)] === picture.bomb){
                setMove({...move, bombComponent: true})
            }else if(temp[parseInt(e.target.id)] === picture.start){
                setMove({...move, startComponent: true})
            }else{
                setMove({...move, endComponent: true})
            }
        }
    }

    const OnMouseEnterHanlder = (e) => {
        console.log("OnMouseEnterHanlder " + e.target.id)
        if(wall && temp[parseInt(e.target.id)] !== picture.bomb && temp[parseInt(e.target.id)] !== picture.start && temp[parseInt(e.target.id)] !== picture.end){
            if(temp[parseInt(e.target.id)] === picture.background){
                temp[parseInt(e.target.id)] = picture.wall
            }else{
                temp[parseInt(e.target.id)] = picture.background
            }
            setTableColor(temp)
        }else{
            if(move.bombComponent && temp[parseInt(e.target.id)] !== picture.start && temp[parseInt(e.target.id)] !== picture.end){
                temp[parseInt(e.target.id)] = picture.bomb
                setTableColor(temp)
            }else if(move.startComponent && temp[parseInt(e.target.id)] !== picture.bomb){
                temp[parseInt(e.target.id)] = picture.start
                console.log(temp[parseInt(e.target.id)])
                setTableColor(temp)
            }else if(move.endComponent && temp[parseInt(e.target.id)] !== picture.bomb){
                temp[parseInt(e.target.id)] = picture.end
                setTableColor(temp)
            }
        }
    }

    const OnMouseOutHanlder = (e) => {
        console.log("OnMouseOutHanlder " + e.target.id)
        if(wall === false){
            if((move.bombComponent || move.startComponent || move.endComponent) && (temp[parseInt(e.target.id)] === picture.bomb || temp[parseInt(e.target.id)] === picture.start || temp[parseInt(e.target.id)] === picture.end)){
                temp[parseInt(e.target.id)] = picture.background
                setTableColor(temp)
            }
        }
    }

    const createTable = row.map((rowIndex, index) => {
        return ( 
            <tr key = {index} height={size}>
                {col.map((colIndex, index) => {
                    console.log(rowIndex + " " + colIndex)
                    return (
                        <td id = {rowIndex * colSize + colIndex} key = {index} bgcolor = {tableColor[rowIndex * colSize + colIndex]} width={size} onMouseUp = {ClickUpHandler} onMouseDown = {ClickDownHandler} onMouseEnter = {OnMouseEnterHanlder} onMouseOut = {OnMouseOutHanlder}>
                            {}
                        </td>)}
                    )}
            </tr>)}
        )

    return (
        <div>
            <table id = "board" border="1" cellSpacing="0" >
                <tbody>
                    {createTable}
                </tbody>
            </table>
            <Button id = "AddBomb" onClick = {AddBombHanlder}>AddBomb</Button>
            <Button id = "ClearWalls" onClick = {ClearWallHanlder}>ClearWalls</Button>
            <Button id = "Reset" onClick = {ResetBoardHanlder}>ResetBoard</Button>
        </div>
    )
}

export default Init