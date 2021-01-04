import { createContext } from 'react'

export const tableVar = {
    rowSize: Math.floor(window.screen.availHeight / 30) - 7, // Math.floor((window.screen.height - document.getElementById("navbar").clientHeight) / 30)
    colSize: Math.floor(window.screen.width / 30), 
    size: 30,
}

export const componentKind = {start: "start", end: "end", bomb: "bomb", wall: "wall"}
export const picture =  {wall: "#0000E6", bomb: "red", start: "#E69500", end: "#E000E0", background: "white", search: "#26FFFF", path: "#F0F000"}

// table status
export const tableContext = createContext()
export const initialTable = Array.from(Array(tableVar.rowSize * tableVar.colSize).keys(), index => {
    if(index === Math.floor(tableVar.rowSize / 2) * tableVar.colSize + Math.floor(tableVar.colSize / 4)){
        return picture.start
    }else if(index === Math.floor(tableVar.rowSize / 2 + 1) * tableVar.colSize - Math.floor(tableVar.colSize / 4)){
        return picture.end
    }else{
        return picture.background
    }
})
export const tableReducer = (state, action, target) => {
    switch (action, target) {
        case target:
            return action;
        default:
            return initialTable;
    }
}

// touch status
export const touchContext = createContext()
export const touchInitial = ""
export const touchReducer = (state, action) => {
    switch (action) {
        case componentKind.start:
            return componentKind.start
        case componentKind.end:
            return componentKind.end
        case componentKind.bomb:
            return componentKind.bomb
        default:
            return touchInitial
    }
}

// move component
export const moveContext = createContext()
export const moveInitial = ""
export const moveReducer = (state, action) => {
    switch (action) {
        case componentKind.start:
            return componentKind.start
        case componentKind.end:
            return componentKind.end
        case componentKind.bomb:
            return componentKind.bomb
        case componentKind.wall:
            return componentKind.wall
        default:
            return moveInitial
    }
}
