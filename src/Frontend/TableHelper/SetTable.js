import { componentKind, tableVar } from './TableIndex'
import { position } from '../../Core/index'


export function setTable(index, kind){
    document.getElementById(index.toString()).className = kind
    const pos = [Math.floor(index / tableVar.colSize), index % tableVar.colSize]

    if(kind === componentKind.wall){
        position.wall[pos] = true
    }else if(kind === componentKind.start){
        position.start = pos
    }else if(kind === componentKind.end){
        position.end = pos
    }else if(kind === componentKind.bomb){
        position.bomb = pos
    }else if(kind === componentKind.background){
        if(position.wall[pos]){
            delete position.wall[pos]
        }else if(position.bomb[0] === pos[0] && position.bomb[1] === pos[1]){
            position.bomb = false
        }
    }

    // console.log(position)

}