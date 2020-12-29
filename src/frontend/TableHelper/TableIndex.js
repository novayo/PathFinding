import { createContext } from 'react'


export const tableContext = createContext(
    {
        rowSize: Math.floor(window.screen.height / 30) - 7, 
        colSize: Math.floor(window.screen.width / 30), 
        size: 30,
        startInit: "InitTable", 
        search: "init",
        path: "init",
        speed: 500,
        picture: {wall: "#0000E6", bomb: "red", start: "#E69500", end: "#E000E0", background: "white", search: "#26FFFF", path: "#F0F000"},
        clickButton: "init",
        buttonKind: {Init: "init", AddBomb: "AddBomb", RemoveBomb: "RemoveBomb", ClearWalls: "ClearWalls", ClearBoard: "ClearBoard", start: "start", ClearPath: "ClearPath"}
    }
)


  