import { componentKind } from './TableIndex'


function addComponentKind(kind) {
    switch (kind) {
        case componentKind.add:
            return componentKind.background
        default:
            return componentKind.add
    }
}

export function WhichComponent(id, touch){ // MouseEvent

    const element = document.getElementById(id).className

    switch (element) {
        case componentKind.start:
            return {kind: componentKind.start, touch: touch.get.start, type: 0}
        case componentKind.startSearchBomb:
            return {kind: componentKind.start, touch: touch.get.start, type: 0}
        case componentKind.startSearch:
            return {kind: componentKind.start, touch: touch.get.start, type: 0}
        case componentKind.startPath:
            return {kind: componentKind.start, touch: touch.get.start, type: 0}
        case componentKind.end:
            return {kind: componentKind.end, touch: touch.get.end, type: 0}
        case componentKind.endSearchBomb:
            return {kind: componentKind.end, touch: touch.get.end, type: 0}
        case componentKind.endSearch:
            return {kind: componentKind.end, touch: touch.get.end, type: 0}
        case componentKind.endPath:
            return {kind: componentKind.end, touch: touch.get.end, type: 0}
        case componentKind.bomb:
            return {kind: componentKind.bomb, touch: touch.get.bomb, type: 0}
        case componentKind.bombSearchBomb:
            return {kind: componentKind.bomb, touch: touch.get.bomb, type: 0}
        case componentKind.bombSearch:
            return {kind: componentKind.bomb, touch: touch.get.bomb, type: 0}
        case componentKind.bombPath:
            return {kind: componentKind.bomb, touch: touch.get.bomb, type: 0}
        case componentKind.wall:
            return {kind: componentKind.wall, rKind: addComponentKind(componentKind.wall), type: 1}
        case componentKind.weight:
            return {kind: componentKind.weight, rKind: addComponentKind(componentKind.weight), type: 1}
        case componentKind.weightSearchBomb:
            return {kind: componentKind.weight, rKind: addComponentKind(componentKind.weight), type: 1}
        case componentKind.weightSearch:
            return {kind: componentKind.weight, rKind: addComponentKind(componentKind.weight), type: 1}
        case componentKind.weightPath:
            return {kind: componentKind.weight, rKind: addComponentKind(componentKind.weight), type: 1}
        default:
            return {kind: componentKind.background, rKind: componentKind.add, type: 1}
    }

}


export function WhichComponentSame(kind){

    switch (kind) {
        case componentKind.start:
            return 0
        case componentKind.startSearchBomb:
            return 0
        case componentKind.startSearch:
            return 0
        case componentKind.startPath:
            return 0
        case componentKind.end:
            return 1
        case componentKind.endSearchBomb:
            return 1
        case componentKind.endSearch:
            return 1
        case componentKind.endPath:
            return 1
        case componentKind.bomb:
            return 2
        case componentKind.bombSearchBomb:
            return 2
        case componentKind.bombSearch:
            return 2
        case componentKind.bombPath:
            return 2
        case componentKind.weight:
            return 3
        case componentKind.weightSearchBomb:
            return 3
        case componentKind.weightSearch:
            return 3
        case componentKind.weightPath:
            return 3
        case componentKind.wall:
            return 4
        case componentKind.search:
            return 5
        case componentKind.searchBomb:
            return 6
        case componentKind.path:
            return 7
        case componentKind.pathHead:
            return 8
        case componentKind.background:
            return 9
        default:
            return 10
    }

}

export function StartEndBombWeight(type, start, end, bomb, weight){

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