import React, { useContext } from 'react'
import MouseEvent from './MouseEvent'
import { tableContext } from './TableIndex'


function TableUI() {
    const tableVarContext = useContext(tableContext)
    const [rowSize, colSize, size] = [tableVarContext.rowSize, tableVarContext.colSize, tableVarContext.size]

    const row = Array.from(Array(rowSize).keys())
    const col = Array.from(Array(colSize).keys())

    const mouesEvent = MouseEvent()
    const [MouseDownHandler, MouseUpHandler, OnMouseEnterHanlder, OnMouseOutHanlder, tableColor] = [mouesEvent.MouseDownHandler, mouesEvent.MouseUpHandler, mouesEvent.OnMouseEnterHanlder, mouesEvent.OnMouseOutHanlder, mouesEvent.tableColor]

    const createTable = row.map((rowIndex, index) => {
        return ( 
            <tr key = {index} height={size}>
                {col.map((colIndex, index) => {
                    // console.log(rowIndex + " " + colIndex)
                    return (
                        <td id = {rowIndex * colSize + colIndex} key = {index} bgcolor = {tableColor[rowIndex * colSize + colIndex]} width={size} onMouseUp = {MouseUpHandler} onMouseDown = {MouseDownHandler} onMouseEnter = {OnMouseEnterHanlder} onMouseOut = {OnMouseOutHanlder}>
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
        </div>
    )
}

export default TableUI
