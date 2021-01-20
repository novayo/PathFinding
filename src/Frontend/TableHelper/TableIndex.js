import { createContext } from 'react'
import { position } from '../../Core/index'


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
    id: 0,
    newId: 0
}

export const weightValueRange = {
    max: 100,
    min: 0,
    init: 50,
    increase: 10,
    waiting: 2000
}

export const componentKind =  {
    add: "wall", 
    wall: "wall", 

    /*---------dynamic---------*/

    weight: "weight",
    weightSearchBomb: "weightSearchBomb",
    weightSearch: "weightSearch",
    weightPath: "weightPath",

    start: "start",
    startSearchBomb: "startSearchBomb",
    startSearch: "startSearch",
    startPath: "startPath",

    end: "end",
    endSearchBomb: "endSearchBomb",
    endSearch: "endSearch",
    endPath: "endPath",

    bomb: "bomb",
    bombSearchBomb: "bombSearchBomb",
    bombSearch: "bombSearch",
    bombPath: "bombPath",

    search: "search", 
    searchBomb: "searchBomb", 
    path: "path", 

    /*----------static-----------*/

    weightStatic: "weightStatic",
    weightSearchBombStatic: "weightSearchBombStatic",
    weightSearchStatic: "weightSearchStatic",
    weightPathStatic: "weightPathStatic",

    startStatic: "startStatic",
    startPathStatic: "startPathStatic",

    endStatic: "endStatic",
    endPathStatic: "endPathStatic",

    bombStatic: "bombStatic",
    bombPathStatic: "bombPathStatic",

    searchStatic: "searchStatic", 
    searchBombStatic: "searchBombStatic", 
    pathStatic: "pathStatic", 

    /*----------------------------*/

    pathHead: "pathHead",
    background: "background"
}

export const keyboardSupport = {   
    plus: "+", 
    sub: "-",

    w: "w",
    down: true

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

export const weightValueContext = createContext()
export const weightValueInitial = {value: weightValueRange.init, status: true}
export const weightValueReducer = (state, action) => {
    switch (action) {
        case "+":
            position.weightValue = state.value + weightValueRange.increase
            return {value: position.weightValue, status: true}
        case "-":
            position.weightValue = state.value - weightValueRange.increase
            return {value: position.weightValue, status: true}
        case true:
            return {value: position.weightValue, status: true}
        case false:
            return {value: position.weightValue, status: false}
        default:
            return weightValueInitial
    }
} 

