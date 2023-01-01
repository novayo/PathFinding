import { tableVar, componentKind } from './TableIndex'
import { position } from '../../Core/index'


function addComponentKind(kind) {
    switch (kind) {
        case componentKind.add:
            return componentKind.background
        default:
            return componentKind.add
    }
}

export function WhichComponent(id, touch){ // MouseEvent 分類

    var pos = id

    if(typeof id === "number"){
        pos = [Math.floor(parseInt(id) / tableVar.colSize), parseInt(id) % tableVar.colSize]
    }

    if(position.start[0] === pos[0] && position.start[1] === pos[1]){
        return {kind: componentKind.start, touch: touch.get.start, type: 0}
    }else if(position.end[0] === pos[0] && position.end[1] === pos[1]){
        return {kind: componentKind.end, touch: touch.get.end, type: 0}
    }else if(position.bomb !== false && position.bomb[0] === pos[0] && position.bomb[1] === pos[1]){
        return {kind: componentKind.bomb, touch: touch.get.bomb, type: 0}
    }else if(position.wall[pos]){
        return {kind: componentKind.wall, rKind: addComponentKind(componentKind.wall), type: 1}
    }else if(position.weight[pos]){
        return {kind: componentKind.weight, rKind: addComponentKind(componentKind.weight), type: 1}
    }else{
        return {kind: componentKind.background, rKind: componentKind.add, type: 1}
    }

}

// meaning of return value: 0 => start, 1 => end, 2 => bomb (gas), 3 => weight, 4 => wall, 5 => other (empty)
export function WhichComponentSame(id){ // component 分類

    var pos = id

    if(typeof id === "string" || typeof id === "number"){
        pos = [Math.floor(parseInt(id) / tableVar.colSize), parseInt(id) % tableVar.colSize]
    }

    if(position.start[0] === pos[0] && position.start[1] === pos[1]){
        return 0
    }else if(position.end[0] === pos[0] && position.end[1] === pos[1]){
        return 1
    }else if(position.bomb !== false && position.bomb[0] === pos[0] && position.bomb[1] === pos[1]){
        return 2
    }else if(position.weight[pos]){
        return 3
    }else if(position.wall[pos]){
        return 4
    }else{
        return 5
    }

}

export function StartEndBombWeight(type, start, end, bomb, weight){ // 回傳該type為start end bomb weight何者

    switch (type) {
        case 0:
            return start
        case 1:
            return end
        case 2:
            return bomb
        case 3:
            return weight
        default:
            return null
    }

}