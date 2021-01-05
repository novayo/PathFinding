import { componentKind } from './TableIndex'


export function WhichComponent(id, touch){

    const element = document.getElementById(id).className

    switch (element) {
        case componentKind.start:
            return {kind: componentKind.start, touch: touch.get.start, type: 0}
        case componentKind.end:
            return {kind: componentKind.end, touch: touch.get.end, type: 0}
        case componentKind.bomb:
            return {kind: componentKind.bomb, touch: touch.get.bomb, type: 0}
        case componentKind.wall:
            return {kind: componentKind.wall, rKind: componentKind.background, type: 1}
        default:
            return {kind: componentKind.background, rKind: componentKind.wall, type: 1}
    }

}