import { componentKind, tableVar } from './TableIndex'
import { position } from '../../Core/index'


export function setTable(index, kind, setPosition = false){

    if(typeof index !== "number"){ // 讓 [posx, posy] 和 ID 都能作為此function的input
        index = parseInt(index[0]) * tableVar.colSize + parseInt(index[1])
    }

    if(index < 0){
        return
    }

    document.getElementById(index.toString()).className = kind

    if(setPosition){ // 有些場景調用setTable只是換CSS不須更新position

        const pos = [Math.floor(index / tableVar.colSize), index % tableVar.colSize]

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

    }

    // console.log(position)

}