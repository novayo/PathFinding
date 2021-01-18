import { tableVar, componentKind, tableColor } from './TableIndex'
import { setTable, setbackground } from './SetTable'
import { WhichComponentType } from './WhichComp'
import { position } from '../../Core/index'


export function Animation(arr, speed, count, kind, myCallbackFunction = null) {
    var [id, newid] = [-1, -1]
    const arrAnimation = setInterval(() => {
        if (count === arr.length) {
            if(kind === componentKind.path){
                setTable(newid, componentKind.pathFinal)
            }
            if (myCallbackFunction !== null) {
                myCallbackFunction();
            }
            clearInterval(arrAnimation);
        }else {
            const index = arr[count][0] * tableVar.colSize + arr[count][1]
            if (WhichComponentType(index.toString()) !== 0) {
                if(kind === componentKind.path){
                    newid = index
                    setTable(id, componentKind.pathFinal)
                    setTable(newid, componentKind.pathHead)
                    id = newid
                }else{
                    setTable(index, kind)
                }
            }else{
                setbackground(index, tableColor.path)
            }
        }
        count += 1
    }, speed / 2)
}

export function SearchBombAnimation(search, bomb, path, speed, count, myCallbackFunction, sysStatusFunction) {
    var index = position.start[0] * tableVar.colSize + position.start[1]
    if(bomb.length === 0){
        setbackground(index, tableColor.search)
    }else{
        setbackground(index, tableColor.searchBomb)
    }
    const searchBombAnimation = setInterval(() => {
        if (count === search.length) {
            myCallbackFunction(bomb, path, speed, 0, PathAnimation, sysStatusFunction)
            clearInterval(searchBombAnimation)
        }else{
            for(var i = 0;i < search[count].length;i++){
                index = search[count][i][0] * tableVar.colSize + search[count][i][1]
                if (WhichComponentType(index.toString()) !== 0) {
                    if(bomb.length === 0){
                        setTable(index, componentKind.search)
                    }else{
                        setTable(index, componentKind.searchBomb)
                    }
                }else{
                    if(bomb.length === 0){
                        setbackground(index, tableColor.search)
                    }else{
                        setbackground(index, tableColor.searchBomb)
                    }
                }
            }
        }
        count += 1
    }, speed)
}

export function SearchAnimation(bomb, path, speed, count, myCallbackFunction, sysStatusFunction) {
    if(position.bomb !== false){
        const index = position.bomb[0] * tableVar.colSize + position.bomb[1]
        setbackground(index, tableColor.search)
    }
    const searchAnimation = setInterval(() => {
        if (count === bomb.length) {
            myCallbackFunction(path, speed, 0, sysStatusFunction)
            clearInterval(searchAnimation)
        }else{
            for(var i = 0;i < bomb[count].length;i++){
                const index = bomb[count][i][0] * tableVar.colSize + bomb[count][i][1]
                if (WhichComponentType(index.toString()) !== 0) {
                    setTable(index, componentKind.search)
                }else{
                    setbackground(index, tableColor.search)
                }
            }
        }
        count += 1
    }, speed)
}

export function PathAnimation(path, speed, count, myCallbackFunction = null) {
    Animation(path, speed, count, componentKind.path, myCallbackFunction)
}

export function MazeAnimation(maze, speed, count, myCallbackFunction = null) {
    Animation(maze, speed, count, componentKind.wall, myCallbackFunction)
}

export function FinalAnimation(search, path, bomb){
    var index = position.start[0] * tableVar.colSize + position.start[1]
    if(bomb.length === 0){
        setbackground(index, tableColor.search) 
    }else{
        setbackground(index, tableColor.searchBomb)
    }
    for (var i = 0; i < search.length; i++) {
        for (var j = 0; j < search[i].length; j++) {
            index = search[i][j][0] * tableVar.colSize + search[i][j][1]
            if (WhichComponentType(index.toString())) {
                if(bomb.length === 0){
                    setTable(index, componentKind.searchFinal)
                }else{
                    setTable(index, componentKind.searchBombFinal)
                }
            }else{
                if(bomb.length === 0){
                    setbackground(index, tableColor.search)
                }else{
                    setbackground(index, tableColor.searchBomb)
                }
            }
        }
    }
    if(position.bomb !== false){ //why can not bomb.length !== 0
        index = position.bomb[0] * tableVar.colSize + position.bomb[1]
        setbackground(index, tableColor.search)
    }
    for (i = 0; i < bomb.length; i++) {
        for (j = 0; j < bomb[i].length; j++) {
            index = bomb[i][j][0] * tableVar.colSize + bomb[i][j][1]
            if (WhichComponentType(index.toString())) {
                setTable(index, componentKind.searchFinal)
            }else{
                setbackground(index, tableColor.search)
            }
        }
    }
    for (i = 0; i < path.length; i++) {
        index = path[i][0] * tableVar.colSize + path[i][1]
        if (WhichComponentType(index.toString())) {
            setTable(index, componentKind.pathFinal)
        }else{
            setbackground(index, tableColor.path)
        }
    }
}