import { useEffect } from 'react'
import MouseEvent from './MouseEvent'
import { tableVar, componentKind } from './TableIndex'


function TableUI() {
    const [rowSize, colSize, size] = [tableVar.rowSize, tableVar.colSize, tableVar.size]

    const row = Array.from(Array(rowSize).keys())
    const col = Array.from(Array(colSize).keys())

    const mouesEvent = MouseEvent()
    const [MouseDownHandler, MouseUpHandler, OnMouseEnterHanlder] = [mouesEvent.MouseDownHandler, mouesEvent.MouseUpHandler, mouesEvent.OnMouseEnterHanlder]

    const createTable = row.map((rowIndex, index) => {
        return ( 
            <tr key = {index} height={size}>
                {col.map((colIndex, index) => {
                    // console.log(rowIndex + " " + colIndex)
                    return (
                        <td id = {rowIndex * colSize + colIndex} key = {index} className = {componentKind.background} width={size} onMouseUp = {MouseUpHandler} onMouseDown = {MouseDownHandler} onMouseEnter = {OnMouseEnterHanlder}>
                            {}
                        </td>)}
                    )}
            </tr>)}
        )

    useEffect(() => {
        document.getElementById((Math.floor(tableVar.rowSize / 2) * tableVar.colSize + Math.floor(tableVar.colSize / 4)).toString()).className = "start"
        document.getElementById((Math.floor(tableVar.rowSize / 2 + 1) * tableVar.colSize - Math.floor(tableVar.colSize / 4)).toString()).className = "end"
    }, [])
    
    
      
    return (
        <div className = "tablePadding">
            <table id = "board" align="center" border="1" cellSpacing="0">
                <tbody>
                    {createTable}
                </tbody>
            </table>
        </div>
    )
}

export default TableUI
