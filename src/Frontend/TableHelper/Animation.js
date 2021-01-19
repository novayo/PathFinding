import { tableVar, componentKind, tableColor } from './TableIndex'
import { setTable, setbackground } from './SetTable'
import { WhichComponentSame, StartEndBombWeight } from './WhichComp'
import { position } from '../../Core/index'


export function Animation(arr, speed, count, kind, myCallbackFunction = null) {
    var [id, newid] = [-1, -1]
    const arrAnimation = setInterval(() => {
        if (count === arr.length) {
            if(kind === componentKind.path){
                setTable(newid, componentKind.path)
            }
            if (myCallbackFunction !== null) {
                myCallbackFunction();
            }
            clearInterval(arrAnimation);
        }else {
            if (WhichComponentSame(arr[count]) > 3) {
                if(kind === componentKind.path){
                    newid = arr[count]
                    setTable(id, componentKind.path)
                    setTable(newid, componentKind.pathHead)
                    id = newid
                }else{
                    setTable(arr[count], kind, true) // Maze
                }
            }else{
                if(kind === componentKind.path){
                    setTable(id, kind)
                    setTable(arr[count], StartEndBombWeight(WhichComponentSame(arr[count]), componentKind.startPath, componentKind.endPath, componentKind.bombPath, componentKind.weightPath))
                }
            }
        }
        count += 1
    }, speed / 2)
}

export function SearchBombAnimation(search, bomb, path, speed, count, myCallbackFunction, sysStatusFunction) {
    if(bomb.length === 0){
        setTable(position.start, componentKind.startSearch)
    }else{
        setTable(position.start, componentKind.startSearchBomb)
    }
    const searchBombAnimation = setInterval(() => {
        if (count === search.length) {
            myCallbackFunction(bomb, path, speed, 0, PathAnimation, sysStatusFunction)
            clearInterval(searchBombAnimation)
        }else{
            for(var i = 0;i < search[count].length;i++){
                if (WhichComponentSame(search[count][i]) > 3) {
                    if(bomb.length === 0){
                        setTable(search[count][i], componentKind.search)
                    }else{
                        setTable(search[count][i], componentKind.searchBomb)
                    }
                }else{
                    if(bomb.length === 0){
                        setTable(search[count][i], StartEndBombWeight(WhichComponentSame(search[count][i]), componentKind.startSearch, componentKind.endSearch, componentKind.bombSearch, componentKind.weightSearch))
                    }else{
                        setTable(search[count][i], StartEndBombWeight(WhichComponentSame(search[count][i]), componentKind.startSearchBomb, componentKind.endSearchBomb, componentKind.bombSearch, componentKind.weightSearchBomb))
                    }
                }
            }
        }
        count += 1
    }, speed)
}

export function SearchAnimation(bomb, path, speed, count, myCallbackFunction, sysStatusFunction) {
    const searchAnimation = setInterval(() => {
        if (count === bomb.length) {
            myCallbackFunction(path, speed, 0, sysStatusFunction)
            clearInterval(searchAnimation)
        }else{
            for(var i = 0;i < bomb[count].length;i++){
                if (WhichComponentSame(bomb[count][i]) > 3) {
                    setTable(bomb[count][i], componentKind.search)
                }else{
                    setTable(bomb[count][i], StartEndBombWeight(WhichComponentSame(bomb[count][i]), componentKind.startSearch, componentKind.endSearch, componentKind.bombSearch, componentKind.weightSearch))
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
            if(bomb.length === 0){
                setbackground(index, tableColor.search)
            }else{
                setbackground(index, tableColor.searchBomb)
            }
        }
    }
    for (i = 0; i < bomb.length; i++) {
        for (j = 0; j < bomb[i].length; j++) {
            index = bomb[i][j][0] * tableVar.colSize + bomb[i][j][1]
            setbackground(index, tableColor.search)
        }
    }
    for (i = 0; i < path.length; i++) {
        index = path[i][0] * tableVar.colSize + path[i][1]
        setbackground(index, tableColor.path)
    }
}