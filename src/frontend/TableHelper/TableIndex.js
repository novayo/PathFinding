import { createContext } from 'react'


export const tableContext = createContext(
    {rowSize: 21, 
     colSize: 50, 
     size: 30,  
     picture: {wall: "blue", bomb: "red", start: "green", end: "#F5F500", background: "white"},
     clickButton: "",
     buttonKind: {AddBomb: "AddBomb", RemoveBomb: "RemoveBomb", ClearWalls: "ClearWalls", ClearBoard: "ClearBoard"}
    }
)

  