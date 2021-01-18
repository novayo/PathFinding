import { createContext } from 'react'


const size = 23

function adjustSize(size) {
    if(size % 2 === 0){
        size -= 1
    }
    return size
}

export const tableVar = {
    rowSize: adjustSize(Math.floor(window.screen.availHeight / size) - 16),
    colSize: adjustSize(Math.floor(window.screen.availWidth / size)), 
    size: size,
    id: "0",
    newId: "0"
}

export const componentKind =  {
    add: "wall", 
    wall: "wall", 
    weight: "weight",

    start: "start",
    end: "end",
    bomb: "bomb",

    search: "search", 
    searchFinal: "searchFinal", 
    searchBomb: "searchBomb", 
    searchBombFinal: "searchBombFinal", 
    path: "path", 
    pathFinal: "pathFinal", 
    pathHead: "pathHead",

    background: "background"
}

export const keyboardSupport = {   
    plus: "+", 
    sub: "-",

    w: "w",
    down: true

}

export const tableColor = {
    searchBomb: "#e403e4",
    search: "#26FFFF",
    path: "#F0F000",
    background: "white"

}

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
        case componentKind.weight:
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

