import { componentKind } from './TableIndex'
import { setTable } from './SetTable'
import { WhichComponentSame, StartEndBombWeight } from './WhichComp'
import { position } from '../../Core/index'


/* Search */

export function SearchBombAnimation(search, bomb, path, pathDirection, speed, count, myCallbackFunction, sysStatusFunction) {
    const searchBombAnimation = setInterval(() => {
        if (count === search.length) {
            myCallbackFunction(bomb, path, pathDirection, speed, 0, PathAnimation, sysStatusFunction)
            clearInterval(searchBombAnimation)
        }else{
            for(var i = 0;i < search[count].length;i++){
                if (WhichComponentSame(search[count][i]) > 3) {
                    if(position.bomb === false){
                        setTable(search[count][i], componentKind.search)
                    }else{
                        setTable(search[count][i], componentKind.searchBomb)
                    }
                }else{
                    if(position.bomb === false){
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

export function SearchAnimation(bomb, path, pathDirection, speed, count, myCallbackFunction, sysStatusFunction) {
    const searchAnimation = setInterval(() => {
        if (count === bomb.length) {
            myCallbackFunction(path, speed, pathDirection, 0, sysStatusFunction)
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

export function PathAnimation(path, speed, pathDirection, count, myCallbackFunction = null) {
    var [id, newid] = [-1, -1]

    const pathAnimation = setInterval(() => {
        if (count === path.length) {
            myCallbackFunction();
            clearInterval(pathAnimation);
        }else {
            if (WhichComponentSame(path[count]) > 3) {
                newid = path[count]
                setTable(id, componentKind.path)
                setTable(newid, direction(pathDirection[count]))
                id = newid
            }else{
                setTable(id, componentKind.path)
                setTable(path[count], StartEndBombWeight(WhichComponentSame(path[count]), direction(pathDirection[count]), direction(pathDirection[count]), componentKind.bombPath, componentKind.weightPath))
            }
        }
        count += 1
    }, speed)

}

export function FinalAnimation(search, path, pathDirection, bomb){
    for (var i = 0; i < search.length; i++) {
        for (var j = 0; j < search[i].length; j++) {
            if (WhichComponentSame(search[i][j]) > 3) {
                if(position.bomb === false){
                    setTable(search[i][j], componentKind.searchStatic)
                }else{
                    setTable(search[i][j], componentKind.searchBombStatic)
                }
            }else{
                if(position.bomb === false){
                    setTable(search[i][j], StartEndBombWeight(WhichComponentSame(search[i][j]), componentKind.startSearch, componentKind.endSearch, componentKind.bombSearch, componentKind.weightSearchStatic))
                }else{
                    setTable(search[i][j], StartEndBombWeight(WhichComponentSame(search[i][j]), componentKind.startSearchBomb, componentKind.endSearchBomb, componentKind.bombSearchBomb, componentKind.weightSearchBombStatic))
                }
            }
        }
    }
    for (i = 0; i < bomb.length; i++) {
        for (j = 0; j < bomb[i].length; j++) {
            if (WhichComponentSame(bomb[i][j]) > 3) {
                setTable(bomb[i][j], componentKind.searchStatic)
            }else{
                setTable(bomb[i][j], StartEndBombWeight(WhichComponentSame(bomb[i][j]), componentKind.startSearch, componentKind.endSearch, componentKind.bombSearch, componentKind.weightSearchStatic))
            }
        }
    }
    for (i = 0; i < path.length; i++) {
        if (WhichComponentSame(path[i]) > 3) {
            setTable(path[i], componentKind.pathStatic)
        }else{
            setTable(path[i], StartEndBombWeight(WhichComponentSame(path[i]), direction(pathDirection[i]), direction(pathDirection[i]), componentKind.bombPath, componentKind.weightPathStatic))
        }
    }
}


/* Maze */

export function MazeAnimation(maze, speed, count, myCallbackFunction) { // maze = [walls, weights]

    maze = maze[0]
    speed = speed / 2
    
    const mazeAnimation = setInterval(() => {
        if (count === maze.length) {
            myCallbackFunction();
            clearInterval(mazeAnimation);
        }else {
            if (WhichComponentSame(maze[count]) > 3) {
                setTable(maze[count], componentKind.wall, true)
            }
        }
        count += 1
    }, speed)
}

export function FinalMazeAnimation(maze){ // maze = [walls, weights]
    for(var i = 0; i < maze[0].length; i++){
        setTable(maze[0][i], componentKind.wall, true)
    }
    for(i = 0; i < maze[1].length; i++){
        setTable(maze[1][i], componentKind.weight, true)
    }
}


/* Rocket left right up down */

function direction(kind){

    switch (kind) {
        case "left":
            return componentKind.pathHeadLeft
        case "right":
            return componentKind.pathHeadRight
        case "up":
            return componentKind.pathHeadUp
        case "down":
            return componentKind.pathHeadDown
        default:
            return componentKind.path
    }

}