import { useContext } from 'react'
import TableUI from './TableUI';
import { tableContext } from './TableIndex'
import ReactDOM from 'react-dom'


function ButtonEvent() {
    const tableVarContext = useContext(tableContext)

    const Addbomb = () => {
        tableVarContext.clickButton = tableVarContext.buttonKind.AddBomb
        ReactDOM.render(
            <TableUI />,
            document.getElementById('UI')
        )
    }

    const RemoveBomb = () => {
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

    return {Addbomb, RemoveBomb, ClearWalls, ClearBoard}
}

export default ButtonEvent



