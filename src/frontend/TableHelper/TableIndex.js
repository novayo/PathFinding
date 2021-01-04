import { createContext } from 'react'


export const tableVar = {
    rowSize: Math.floor(window.screen.availHeight / 30) - 7, // Math.floor((window.screen.height - document.getElementById("navbar").clientHeight) / 30)
    colSize: Math.floor(window.screen.width / 30), 
    size: 30,
}

export const picture =  {wall: "#0000E6", bomb: "red", start: "#E69500", end: "#E000E0", background: "white", search: "#26FFFF", path: "#F0F000"}
export const componentKind = {start: 0, end: 1, bomb: 2, wall: 4}

export const initialTable = Array.from(Array(tableVar.rowSize * tableVar.colSize).keys(), index => {
    if(index === Math.floor(tableVar.rowSize / 2) * tableVar.colSize + Math.floor(tableVar.colSize / 4)){
        return picture.start
    }else if(index === Math.floor(tableVar.rowSize / 2 + 1) * tableVar.colSize - Math.floor(tableVar.colSize / 4)){
        return picture.end
    }else{
        return picture.background
    }
})

tableVar.table = initialTable

// touch status
export const touchContext = createContext()
export const touchInitial = {start: picture.background, end: picture.background, bomb: picture.background}
export const touchReducer = (state, action) => {
    switch (action.componentKind) {
        case componentKind.start:
            return {...state, start: action.picture}
        case componentKind.end:
            return {...state, end: action.picture}
        case componentKind.bomb:
            return {...state, bomb: action.picture}
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

export function setTable(index, picture){
    tableVar.table[index] = picture
    document.getElementById(index).bgColor = picture
}
