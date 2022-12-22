import { componentKind } from './TableIndex'
import { setTable } from './SetTable'
import { WhichComponentSame, StartEndBombWeight } from './WhichComp'
import { position } from '../../Core/index'


export const stopStatus = { // 暫停時的狀態
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

export function setSearchAnimation(search, path, pathDirection, bomb, algorithm){
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
    stopStatus.searchResult = []
    stopStatus.pathResult = []
    stopStatus.pathDirectionResult = []
    stopStatus.bombResult = []

    stopStatus.maze = 0

    stopStatus.animationStatus = false
    stopStatus.complete = true
}

/* Search */

export function popitems(search, bomb, path, pathDirection) {
    var ret
    if(search.length > 0){
        ret = [search[0].shift(), 0]
        if(ret[0] === undefined) {search.shift()}
    } else if (bomb.length > 0){
        ret = [bomb[0].shift(), 1]
        if(ret[0] === undefined) {bomb.shift()}
    } else if (path.length > 0){
        ret = [path.shift(), pathDirection.shift(), 2]
    } else {
        ret = [undefined]
    }
    return ret
}

export function getClassName(id, type, d = undefined){
    var className1, className2
    if (WhichComponentSame(id) > 3) {
        switch (type) {
            case 0:
                className1 = componentKind.search
                className2 = componentKind.searchBomb
                return (position.bomb === false) ? className1 : className2
            case 1:
                className1 = componentKind.search
                return className1
            case 2:
                className1 = componentKind.path
                className2 = direction(d)
                return [className1, className2]
            default:
                return undefined
        }
    }else{
        switch (type) {
            case 0:
                className1 = StartEndBombWeight(WhichComponentSame(id), componentKind.startSearch, componentKind.endSearch, componentKind.bombSearch, componentKind.weightSearch)
                className2 = StartEndBombWeight(WhichComponentSame(id), componentKind.startSearchBomb, componentKind.endSearchBomb, componentKind.bombSearch, componentKind.weightSearchBomb)
                return (position.bomb === false) ? className1 : className2
            case 1:
                className1 = StartEndBombWeight(WhichComponentSame(id), componentKind.startSearch, componentKind.endSearch, componentKind.bombSearch, componentKind.weightSearch)
                return className1
            case 2:
                className1 = componentKind.path
                className2 = StartEndBombWeight(WhichComponentSame(id), direction(d), direction(d), componentKind.bombPath, componentKind.weightPath)
                return [className1, className2]
            default:
                return undefined
        }
    }

}

export function SearchAnimation(search, bomb, path, pathDirection, speed, sysStatusFunction, updateFunction) {
    if(stopStatus.complete){
        path.unshift(-1)
        pathDirection.unshift("")
    }
    
    stopStatus.complete = false

    const searchAnimation = setInterval(() => {
        var id, newid, d, type, items
        var className1, className2, className

        if (path.length === 0) {
            resetAnimation()
            updateFunction()
            clearInterval(searchAnimation)

        }else{
            while(true){
                if(stopStatus.animationStatus === false){
                    // I don't know why ???
                    // setSearchAnimation(search, path, pathDirection, bomb, "")
                    stopStatus.searchResult = search
                    stopStatus.pathResult = path
                    stopStatus.pathDirectionResult = pathDirection
                    stopStatus.bombResult = bomb
                    sysStatusFunction()
                    clearInterval(searchAnimation)
                    return
                }

                items = popitems(search, bomb, path, pathDirection)

                id = items[0]; type = items[items.length - 1];
                if(id === undefined || path.length === 0){
                    break
                }
                
                if(type <= 1){
                    className1 = getClassName(id, type)
                    setTable(id, className1)
                } else {
                    newid = path[0]
                    d = pathDirection[0]

                    className = getClassName(newid, type, d)
                    className1 = className[0]; className2 = className[1];
                    setTable((WhichComponentSame(id) >= 3) ? id : -1, className1)
                    setTable(newid, className2)
                    break
                }
                
            }
        }
    }, speed)
}

export function FinalAnimation(search, path, pathDirection, bomb){
    var id, d, type;
    var className1, className2
    for (var i = 0; i < search.length; i++) {
        for (var j = 0; j < search[i].length; j++) {
            id = search[i][j]; type = WhichComponentSame(id);
            className1 = (type > 3) ? componentKind.searchStatic : StartEndBombWeight(type, componentKind.startSearch, componentKind.endSearch, componentKind.bombSearch, componentKind.weightSearchStatic);
            className2 = (type > 3) ? componentKind.searchBombStatic : StartEndBombWeight(type, componentKind.startSearchBomb, componentKind.endSearchBomb, componentKind.bombSearchBomb, componentKind.weightSearchBombStatic);
            (position.bomb === false) ? setTable(id, className1) : setTable(id, className2);
        }
    }
    for (i = 0; i < bomb.length; i++) {
        for (j = 0; j < bomb[i].length; j++) {
            id = bomb[i][j]; type = WhichComponentSame(id);
            className1 = (type > 3) ? componentKind.searchStatic : StartEndBombWeight(WhichComponentSame(id), componentKind.startSearch, componentKind.endSearch, componentKind.bombSearch, componentKind.weightSearchStatic);
            setTable(id, className1);
        }
    }
    for (i = 0; i < path.length; i++) {
        id = path[i]; d = pathDirection[i]; type = WhichComponentSame(id);
        className1 = (type > 3) ? componentKind.pathStatic : StartEndBombWeight(WhichComponentSame(id), direction(d), direction(d), componentKind.bombPath, componentKind.weightPathStatic);
        setTable(id, className1);
    }
}

/* Maze */

export function MazeAnimation(maze, speed, sysStatusFunction, updateFunction) { // maze = [walls, weights]
    stopStatus.complete = false

    var id = -1;
    speed = speed / 2
    
    const mazeAnimation = setInterval(() => {
        
        if (id === undefined) {
            resetAnimation()
            updateFunction()
            clearInterval(mazeAnimation)

        }else {
            if (stopStatus.animationStatus === false){
                setMazeAnimation(maze)
                sysStatusFunction()
                clearInterval(mazeAnimation)
                return
            }

            id = maze[0].shift()
            if (WhichComponentSame(id) > 4) {
                setTable(id, componentKind.wall, true)
            }
        }
    }, speed)
}

export function FinalMazeAnimation(maze){ // maze = [walls, weights]
    var id;
    for(var i = 0; i < maze[0].length; i++){
        id = maze[0][i];
        setTable(id, componentKind.wall, true)
    }
    for(i = 0; i < maze[1].length; i++){
        id = maze[1][i];
        setTable(id, componentKind.weight, true)
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