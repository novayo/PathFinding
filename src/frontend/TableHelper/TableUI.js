import React, { useEffect } from 'react'
import MouseEvent from './MouseEvent'
import { tableVar } from './TableIndex'
import ReactDOM from 'react-dom'


function TableUI() {
    const [rowSize, colSize, size] = [tableVar.rowSize, tableVar.colSize, tableVar.size]

    const row = Array.from(Array(rowSize).keys())
    const col = Array.from(Array(colSize).keys())

    const mouesEvent = MouseEvent()
    const [MouseDownHandler, MouseUpHandler, OnMouseEnterHanlder, OnMouseOutHanlder, table] = [mouesEvent.MouseDownHandler, mouesEvent.MouseUpHandler, mouesEvent.OnMouseEnterHanlder, mouesEvent.OnMouseOutHanlder, mouesEvent.table.get]

    const createTable = row.map((rowIndex, index) => {
        return ( 
            <tr key = {index} height={size}>
                {col.map((colIndex, index) => {
                    // console.log(rowIndex + " " + colIndex)
                    return (
                        <td id = {rowIndex * colSize + colIndex} key = {index} bgcolor = {table[rowIndex * colSize + colIndex]} width={size} onMouseUp = {MouseUpHandler} onMouseDown = {MouseDownHandler} onMouseEnter = {OnMouseEnterHanlder} onMouseOut = {OnMouseOutHanlder}>
                            {}
                        </td>)}
                    )}
            </tr>)}
        )
      
    return (
        <div id = "change">
            <table id = "board" align="center" border="1" cellSpacing="0" >
                <tbody>
                    {createTable}
                </tbody>
            </table>
        </div>
    )
}

export default TableUI
