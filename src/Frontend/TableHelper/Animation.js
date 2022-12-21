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

    var id, newid, d, type 
    var className1, className2
    
    stopStatus.complete = false

    const searchAnimationNew = setInterval(() => {
        if (path.length === 0) {
            sysStatusFunction()
            resetAnimation()
            updateFunction()
            clearInterval(searchAnimationNew)

        }else{
            while(true){
                var items = popitems(search, bomb, path, pathDirection)
                if(items[0] === undefined || path.length === 0){
                    break
                }
                
                if(stopStatus.animationStatus === false){
                    setAnimation(search, path, pathDirection, bomb, "")
                    clearInterval(searchAnimationNew)
                    return

                }else{
                    type = items[items.length - 1]
                    if(type <= 1){
                        [id, type] = items
                        className1 = getClassName(id, type)
                        setTable(id, className1)
                    } else {
                        [id, d, type] = items
                        // eslint-disable-next-line
                        [newid, d] = [path[0], pathDirection[0]]
                        // eslint-disable-next-line
                        [className1, className2] = getClassName(newid, type, d)
                        setTable(id, className1)
                        setTable(newid, className2)
                        break
                    }
                }
            }
        }
    }, speed)
}

export function FinalAnimation(search, path, pathDirection, bomb){
    var id, newid, d, type 
    var className1, className2

    while(true){
        var items = popitems(search, bomb, path, pathDirection)
        if(items[0] === undefined || path.length === 0){
            continue
        }
        
        type = items[items.length - 1]
        if(type <= 1){
            [id, type] = items
            className1 = getClassName(id, type)
            setTable(id, className1)
        } else {
            [id, d, type] = items
            // eslint-disable-next-line
            [newid, d] = [path[0], pathDirection[0]]
            // eslint-disable-next-line
            [className1, className2] = getClassName(newid, type, d)
            setTable(id, className1)
            setTable(newid, className2)
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