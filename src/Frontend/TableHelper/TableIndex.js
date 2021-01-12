import { createContext } from 'react'


const size = 23

export const tableVar = {
    rowSize: Math.floor(window.screen.availHeight / size) - 16, // Math.floor((window.screen.height - document.getElementById("navbar").clientHeight) / 30)
    colSize: Math.floor(window.screen.availWidth / size), 
    size: size,
    id: "0",
    newId: "0"
}

export const componentKind =  {wall: "wall", bomb: "bomb", start: "start", end: "end", background: "background", search: "search", searchFinal: "searchFinal", searchBomb: "searchBomb", searchBombFinal: "searchBombFinal", path: "path", pathFinal: "pathFinal"}

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

// result update status
export const updateContext = createContext()
export const updateInitial = false
export const updateReducer = (state, action) => {
    switch (action) {
        case "True":
            return true
        case "False":
            return false
        default:
            return updateInitial
    }
} 

