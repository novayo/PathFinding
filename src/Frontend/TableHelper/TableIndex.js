import { createContext } from 'react'
import { position } from '../../Core/index'


const size = () => {
    // console.log(navigator.userAgent)
    if (navigator.userAgent.match(/Mobile/i)) {
        return 15
    } else {
        return 23
    }
}

const objectHeight = () => {
    if (navigator.userAgent.match(/Mobile/i)) {
        return 120 + 0
    } else {
        return 162 + 100
    }
}

export const tableVar = {
    rowSize: adjust(Math.floor((window.innerHeight - objectHeight()) / size())),
    colSize: adjust(Math.floor(window.screen.availWidth / size())),
    size: size(),

    id: 0,     // MouseEvent ID
    newId: 0
}

export const originPos = {
    origin_start: [adjust(Math.floor(tableVar.rowSize / 2)), adjust(Math.floor(tableVar.colSize / 4))],
    origin_end: [adjust(Math.floor(tableVar.rowSize / 2)), adjust(tableVar.colSize - Math.floor(tableVar.colSize / 4))],
    origin_bomb: [adjust(Math.floor(tableVar.rowSize / 2)), adjust(Math.floor(tableVar.colSize / 2))]

}

export const weightValueRange = { // adjust weight range
    max: 20,
    min: 0,
    init: 20,
    increase: 5,
    waiting: 2000
}

// 所有的CSS
export const componentKind = {
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

    searchStatic: "searchStatic",
    searchBombStatic: "searchBombStatic",
    pathStatic: "pathStatic",

    /*----------------------------*/

    pathHead: "pathHead",
    pathHeadLeft: "pathHeadLeft",
    pathHeadRight: "pathHeadRight",
    pathHeadUp: "pathHeadUp",
    pathHeadDown: "pathHeadDown",

    background: "background"
}

// keyboard的種類
export const keyboardSupport = {
    plus: "+", // change weight value
    sub: "-",

    w: "w", // add weight
    down: true,
}

export const synchronize = {
    update: true,            // 因為reducer不同步而新增
    animation: "Algorithm",

    algorithm: "",           // 因為第一次 addEventListener reducer 會是空白
    sysStatus: "IDLE"
}

// touch status // 紀錄 start end bomb 與哪個component重疊
export const touchContext = createContext()
export const touchInitial = { start: componentKind.background, end: componentKind.background, bomb: componentKind.background }
export const touchReducer = (state, action) => {
    switch (action.componentKind) {
        case componentKind.start:
            return { ...state, start: action.under }
        case componentKind.end:
            return { ...state, end: action.under }
        case componentKind.bomb:
            return { ...state, bomb: action.under }
        default:
            return touchInitial
    }
}

// move component // 紀錄目前滑鼠目前是抓住哪個component
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

// result update status // 判斷是否要直接顯示演算法的結果
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

// weightValue // 更新weightValue，當weightValue = Max or Min時，可以true和false切換讓weightModal出現
export const weightValueContext = createContext()
export const weightValueInitial = { value: weightValueRange.init, status: true }
export const weightValueReducer = (state, action) => {
    switch (action) {
        case "+":
            position.weightValue = state.value + weightValueRange.increase
            return { value: position.weightValue, status: true }
        case "-":
            position.weightValue = state.value - weightValueRange.increase
            return { value: position.weightValue, status: true }
        case true:
            return { value: position.weightValue, status: true }
        case false:
            return { value: position.weightValue, status: false }
        default:
            return weightValueInitial
    }
}

// 保證奇數
export function adjust(size) {
    if (size % 2 === 0) {
        return size - 1
    } else {
        return size
    }

}

