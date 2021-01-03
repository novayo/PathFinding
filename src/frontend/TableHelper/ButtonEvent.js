import { useContext } from 'react'
import TableUI from './TableUI';
import { tableContext } from './TableIndex'
import { sysStatusContext } from '../../Core'
import ReactDOM from 'react-dom'


function ButtonEvent() {
    // const tableVarContext = useContext(tableContext)
    const tableVarContext = tableContext
    const sysStatus = useContext(sysStatusContext)

    const Addbomb = () => {
        console.log('Add Bombingggggg')
        tableVarContext.clickButton = tableVarContext.buttonKind.AddBomb
        ReactDOM.render(
            <TableUI />,
            document.getElementById('UI')
        )
    }

    const RemoveBomb = () => {
        console.log('Remove Bombingggggg')
        tableVarContext.clickButton = tableVarContext.buttonKind.RemoveBomb
        ReactDOM.render(
            <TableUI />,
            document.getElementById('UI')
        )
    }

    const ClearWalls = () => {
        tableVarContext.clickButton = tableVarContext.buttonKind.ClearWalls
        ReactDOM.render(
            <TableUI />,
            document.getElementById('UI')
        )
    }

    const ClearBoard = () => {
        tableVarContext.clickButton = tableVarContext.buttonKind.ClearBoard
        ReactDOM.render(
            <TableUI />,
            document.getElementById('UI')
        )
    }

    const Start = (search, path, speed) => {
        tableVarContext.search = search
        tableVarContext.path = path
        tableVarContext.speed = speed
        tableVarContext.clickButton = tableVarContext.buttonKind.start
        ReactDOM.render(
            <TableUI />,
            document.getElementById('UI')
        )
    }

    const ClearPath = () => {
        tableVarContext.clickButton = tableVarContext.buttonKind.ClearPath
        ReactDOM.render(
            <TableUI />,
            document.getElementById('UI')
        )
    }

    return { Addbomb, RemoveBomb, ClearWalls, ClearBoard, Start, ClearPath }
}

export default ButtonEvent



