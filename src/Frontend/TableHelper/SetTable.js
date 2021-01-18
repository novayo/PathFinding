import { componentKind, tableVar, tableColor } from './TableIndex'
import { WhichComponentSame } from './WhichComp'
import { position } from '../../Core/index'


export function setTable(index, kind){
    if(index < 0){
        return
    }

    document.getElementById(index.toString()).className = kind
    const pos = [Math.floor(index / tableVar.colSize), index % tableVar.colSize]

    if(WhichComponentSame(kind) >= 3){
        document.getElementById(index.toString()).style = ""
    }

    if(position.wall[pos]){
        delete position.wall[pos]
    }else if(position.weight[pos]){
        delete position.weight[pos]
    }

    if(kind === componentKind.wall){
        position.wall[pos] = true
    }else if(kind === componentKind.weight){
        position.weight[pos] = true
    }else if(kind === componentKind.start){
        position.start = pos
    }else if(kind === componentKind.end){
        position.end = pos
    }else if(kind === componentKind.bomb){
        position.bomb = pos
    }else if(kind === componentKind.background){
        if(position.bomb[0] === pos[0] && position.bomb[1] === pos[1]){
            position.bomb = false
        }
    }

    // console.log(position)

}

export function setbackground(index, color){
    document.getElementById(index.toString()).style.backgroundColor = color
    if(color === tableColor.path){
        document.getElementById(index.toString()).style.border = 0
    }
}

export function backgroundReset(){
    for (var i = 0; i < tableVar.rowSize * tableVar.colSize; i++) {
        document.getElementById(i.toString()).style = ""
    }
}