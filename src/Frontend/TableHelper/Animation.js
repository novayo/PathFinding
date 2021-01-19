import { componentKind } from './TableIndex'
import { setTable } from './SetTable'
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
    if(bomb.length === 0){
        setTable(position.start, componentKind.searchStatic) 
    }else{
        setTable(position.start, componentKind.searchBombStatic)
    }
    for (var i = 0; i < search.length; i++) {
        for (var j = 0; j < search[i].length; j++) {
            if (WhichComponentSame(search[i][j]) >= 5) {
                if(bomb.length === 0){
                    setTable(search[i][j], componentKind.searchStatic)
                }else{
                    setTable(search[i][j], componentKind.searchBombStatic)
                }
            }else if(WhichComponentSame(search[i][j]) === 3){
                if(bomb.length === 0){
                    setTable(search[i][j], componentKind.weightSearchStatic)
                }else{
                    setTable(search[i][j], componentKind.weightSearchBombStatic)
                }
            }
        }
    }
    for (i = 0; i < bomb.length; i++) {
        for (j = 0; j < bomb[i].length; j++) {
            if (WhichComponentSame(bomb[i][j]) >= 5) {
                setTable(bomb[i][j], componentKind.searchStatic)
            }else if(WhichComponentSame(bomb[i][j]) === 3){
                setTable(bomb[i][j], componentKind.weightSearchStatic)
            }
        }
    }
    for (i = 0; i < path.length; i++) {
        if (WhichComponentSame(path[i]) > 3) {
            setTable(path[i], componentKind.pathStatic)
        }else{
            setTable(path[i], StartEndBombWeight(WhichComponentSame(path[i]), componentKind.startPathStatic, componentKind.endPathStatic, componentKind.bombPathStatic, componentKind.weightPathStatic))
        }
    }
}