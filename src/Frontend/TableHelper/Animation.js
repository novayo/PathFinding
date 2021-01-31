import { componentKind } from './TableIndex'
import { setTable } from './SetTable'
import { WhichComponentSame, StartEndBombWeight } from './WhichComp'
import { position } from '../../Core/index'


export const stopStatus = { // 暫停時的狀態
    searchBomb: [0, 0],
    search: [0, 0],
    path: 0,
    pathID: [-1, -1],

    searchResult: [],
    bombResult: [],
    pathResult: [],
    pathDirectionResult: [],

    algorithm: "",

    maze: 0,
    mazeResult: [],

    animationStatus: false,
    complete: true
}

export function setAnimation(search, path, pathDirection, bomb, algorithm){
    stopStatus.searchResult = search
    stopStatus.pathResult = path
    stopStatus.pathDirectionResult = pathDirection
    stopStatus.bombResult = bomb
    stopStatus.algorithm = algorithm
}

export function setMazeAnimation(maze){
    stopStatus.mazeResult = maze
}

export function resetAnimation(){
    stopStatus.searchBomb = [0, 0]
    stopStatus.search = [0, 0]
    stopStatus.path = 0
    stopStatus.pathID = [-1, -1]

    stopStatus.maze = 0

    stopStatus.animationStatus = false
    stopStatus.complete = true
}


/* Search */

export function SearchBombAnimation(search, bomb, path, pathDirection, speed, searchFunction, sysStatusFunction, updateFunction) {
    stopStatus.complete = false
    var count = stopStatus.searchBomb[0]

    const searchBombAnimation = setInterval(() => {
        if (count === search.length) {
            stopStatus.searchBomb = [search.length, 0]
            searchFunction(bomb, path, pathDirection, speed, PathAnimation, sysStatusFunction, updateFunction)
            clearInterval(searchBombAnimation)

        }else{
            for(var i = (count === stopStatus.searchBomb[0]) * stopStatus.searchBomb[1];i < search[count].length;i++){

                if(stopStatus.animationStatus === false){
                    stopStatus.searchBomb = [count, i]
                    sysStatusFunction()
                    clearInterval(searchBombAnimation)
                    return

                }else{
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
        }
        count += 1
    }, speed)
}

export function SearchAnimation(bomb, path, pathDirection, speed, pathFunction, sysStatusFunction, updateFunction) {
    var count = stopStatus.search[0]

    const searchAnimation = setInterval(() => {
        if (count === bomb.length) {
            stopStatus.search = [bomb.length, 0]
            pathFunction(path, speed, pathDirection, sysStatusFunction, updateFunction)
            clearInterval(searchAnimation)

        }else{
            for(var i = (count === stopStatus.search[0]) * stopStatus.search[1];i < bomb[count].length;i++){

                if(stopStatus.animationStatus === false){
                    stopStatus.search = [count, i]
                    sysStatusFunction()
                    clearInterval(searchAnimation)
                    return

                }else{
                    if (WhichComponentSame(bomb[count][i]) > 3) {
                        setTable(bomb[count][i], componentKind.search)
                    }else{
                        setTable(bomb[count][i], StartEndBombWeight(WhichComponentSame(bomb[count][i]), componentKind.startSearch, componentKind.endSearch, componentKind.bombSearch, componentKind.weightSearch))
                    }

                }

            }
        }
        count += 1
    }, speed)
}

export function PathAnimation(path, speed, pathDirection, sysStatusFunction, updateFunction) {
    var [id, newid] = [stopStatus.pathID[0], stopStatus.pathID[1]]
    var count = stopStatus.path

    const pathAnimation = setInterval(() => {
        if (count === path.length) {
            resetAnimation()
            updateFunction()
            clearInterval(pathAnimation)

        }else {
            if(stopStatus.animationStatus === false){
                stopStatus.path = count
                stopStatus.pathID = [id, newid]
                sysStatusFunction()
                clearInterval(pathAnimation)
                return

            }else{
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

export function MazeAnimation(maze, speed, sysStatusFunction, updateFunction) { // maze = [walls, weights]
    stopStatus.complete = false

    maze = maze[0]
    speed = speed / 2

    var count = stopStatus.maze
    
    const mazeAnimation = setInterval(() => {
        if (count === maze.length) {
            resetAnimation()
            updateFunction()
            clearInterval(mazeAnimation)

        }else {
            if (stopStatus.animationStatus === false){
                stopStatus.maze = count
                sysStatusFunction()
                clearInterval(mazeAnimation)
                return

            }else{
                if (WhichComponentSame(maze[count]) > 4) {
                    setTable(maze[count], componentKind.wall, true)
                }

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