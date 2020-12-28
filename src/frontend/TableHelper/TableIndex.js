import { createContext } from 'react'


export const tableContext = createContext(
    {
        rowSize: Math.floor(window.screen.height / 30) - 7, 
        colSize: Math.floor(window.screen.width / 30), 
        size: 30,  
        picture: {wall: "blue", bomb: "red", start: "green", end: "#F5F500", background: "white"},
        clickButton: "init",
        buttonKind: {Init: "init", AddBomb: "AddBomb", RemoveBomb: "RemoveBomb", ClearWalls: "ClearWalls", ClearBoard: "ClearBoard"}
    }
)

  