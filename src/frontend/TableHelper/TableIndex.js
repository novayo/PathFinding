import { createContext } from 'react'


export const tableVar = {
    rowSize: Math.floor(window.screen.height / 30) - 8, // Math.floor((window.screen.height - document.getElementById("navbar").clientHeight) / 30)
    colSize: Math.floor(window.screen.width / 30), 
    size: 30,
    id: "0",
    newId: "0"
}

export const componentKind =  {wall: "wall", bomb: "bomb", start: "start", end: "end", background: "background", search: "search", path: "path"}

// touch status
export const touchContext = createContext()
export const touchInitial = {start: componentKind.background, end: componentKind.background, bomb: componentKind.background}
export const touchReducer = (state, action) => {
    switch (action.componentKind) {
        case componentKind.start:
            return {...state, start: action.under}
        case componentKind.end:
            return {...state, end: action.under}
        case componentKind.bomb:
            return {...state, bomb: action.under}
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
            return action
        case componentKind.end:
            return action
        case componentKind.bomb:
            return action
        case componentKind.wall:
            return action
        default:
            return moveInitial
    }
}

export function setTable(index, componentKind){
    document.getElementById(index.toString()).className = componentKind
}
