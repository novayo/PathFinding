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
        case componentKind.end:
            return {kind: componentKind.end, touch: touch.get.end, type: 0}
        case componentKind.bomb:
            return {kind: componentKind.bomb, touch: touch.get.bomb, type: 0}
        case componentKind.wall:
            return {kind: componentKind.wall, rKind: addComponentKind(componentKind.wall), type: 1}
        case componentKind.weight:
            return {kind: componentKind.weight, rKind: addComponentKind(componentKind.weight), type: 1}
        default:
            return {kind: componentKind.background, rKind: componentKind.add, type: 1}
    }

}

export function WhichComponentType(id){ // Animation

    const element = document.getElementById(id).className

    switch (element) {
        case componentKind.start:
            return 0
        case componentKind.end:
            return 0
        case componentKind.bomb:
            return 0
        case componentKind.wall:
            return 1
        case componentKind.weight:
            return 0
        default:
            return 1
    }

}

export function WhichComponentSame(kind){

    switch (kind) {
        case componentKind.start:
            return 0
        case componentKind.end:
            return 1
        case componentKind.bomb:
            return 2
        case componentKind.wall:
            return 3
        case componentKind.weight:
            return 4
        case componentKind.search:
            return 5
        case componentKind.searchFinal:
            return 5
        case componentKind.searchBomb:
            return 6
        case componentKind.searchBombFinal:
            return 6
        case componentKind.path:
            return 7
        case componentKind.pathFinal:
            return 7
        case componentKind.pathHead:
            return 8
        case componentKind.background:
            return 9
        default:
            return 10
    }

}