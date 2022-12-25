import { componentKind } from './TableIndex'
import { setTable } from './SetTable'
import { WhichComponentSame, StartEndBombWeight } from './WhichComp'
import { position } from '../../Core/index'


export const stopStatus = { // 暫停時的狀態
    search: [],
    bomb: [],
    path: [],
    pathDirection: [],

    algorithm: "",

    maze: 0,
    mazeResult: [],

    animationStatus: false,
    complete: true
}

export function resetAnimation(){
    stopStatus.search = []
    stopStatus.bomb = []
    stopStatus.path = []
    stopStatus.pathDirection = []
    stopStatus.maze = 0

    stopStatus.animationStatus = false
    stopStatus.complete = true
}

/* Search */

class searchAnimation{
    getItems(){};
    getClassName(){};
    runAnimation(){};
}

class searchAnimation_search extends searchAnimation{
    getItems(container){
        var ret;
        if(container.length > 0){
            ret = [container[0].shift(), 0]
            if(ret[0] === undefined) {container.shift()}
        } else {
            ret = [undefined]
        }
        return ret
    }

    getClassName(id){
        var className1, className2
        if (WhichComponentSame(id) > 3){
            className1 = componentKind.search
            className2 = componentKind.searchBomb
        } else {
            className1 = StartEndBombWeight(WhichComponentSame(id), componentKind.startSearch, componentKind.endSearch, componentKind.bombSearch, componentKind.weightSearch)
            className2 = StartEndBombWeight(WhichComponentSame(id), componentKind.startSearchBomb, componentKind.endSearchBomb, componentKind.bombSearch, componentKind.weightSearchBomb)
        }
        return (position.bomb === false) ? className1 : className2
    }

    runAnimation(container){
        var id, items
        var className1

        items = this.getItems(container)

        id = items[0]
        if(id === undefined || container.length === 0){
            return false
        }
        
        className1 = this.getClassName(id)
        setTable(id, className1)
        return true
    }
    
}

class searchAnimation_bomb extends searchAnimation{
    getItems(container){
        var ret;
        if(container.length > 0){
            ret = [container[0].shift(), 0]
            if(ret[0] === undefined) {container.shift()}
        } else {
            ret = [undefined]
        }
        return ret
    }

    getClassName(id){
        var className1
        if (WhichComponentSame(id) > 3){
            className1 = componentKind.search
        } else {
            className1 = StartEndBombWeight(WhichComponentSame(id), componentKind.startSearch, componentKind.endSearch, componentKind.bombSearch, componentKind.weightSearch)
        }
        return className1
    }

    runAnimation(container){
        var id, items
        var className1

        items = this.getItems(container)

        id = items[0]
        if(id === undefined || container.length === 0){
            return false
        }
        
        className1 = this.getClassName(id)
        setTable(id, className1)
        return true
    }
    
}

class searchAnimation_path extends searchAnimation{
    getItems(path, pathDirection){
        return (path.length > 0) ? [path.shift(), pathDirection.shift()] : [undefined]
    }

    getClassName(id, d){
        var className1, className2
        if (WhichComponentSame(id) > 3){
            className1 = componentKind.path
            className2 = direction(d)
        } else {
            className1 = componentKind.path
            className2 = StartEndBombWeight(WhichComponentSame(id), direction(d), direction(d), componentKind.bombPath, componentKind.weightPath)
        }
        return [className1, className2]
    }

    runAnimation(container){
        var newid, id, items, d
        var className1, className2, className
        var path = container[0];
        var pathDirection = container[1];

        items = this.getItems(path, pathDirection)

        id = items[0]
        if(id === undefined || path.length === 0){
            return false
        }
        
        newid = path[0]
        d = pathDirection[0]

        className = this.getClassName(newid, d)
        className1 = className[0]; className2 = className[1];
        setTable((WhichComponentSame(id) >= 3) ? id : -1, className1)
        setTable(newid, className2)
        return false
    }
    
}

function getAnimationObj(){
    var animationObj
    if(stopStatus.search.length > 0){
        animationObj = [new searchAnimation_search(), stopStatus.search];
    } else if (stopStatus.bomb.length > 0){
        animationObj = [new searchAnimation_bomb(), stopStatus.bomb];
    } else if (stopStatus.path.length > 0){
        animationObj = [new searchAnimation_path(), [stopStatus.path, stopStatus.pathDirection]];
    } else {
        animationObj = [undefined, undefined];
    }
    return animationObj
}

export function SearchAnimation(search, bomb, path, pathDirection, speed, sysStatusFunction, updateFunction) {
    if(stopStatus.complete){
        path.unshift(-1)
        pathDirection.unshift("")
    
        // I don't know why ???
        // setSearchAnimation(search, path, pathDirection, bomb, "")
        stopStatus.search = search
        stopStatus.path = path
        stopStatus.pathDirection = pathDirection
        stopStatus.bomb = bomb
    } else {
        stopStatus.complete = false
    }

    var items, animationObj, positions;

    const searchAnimation = setInterval(() => {
        items = getAnimationObj()
        animationObj = items[0]
        positions = items[1]

        if (animationObj === undefined) {
            updateFunction()
            clearInterval(searchAnimation)

        }else{
            while(animationObj.runAnimation(positions)){
                if(stopStatus.animationStatus === false){
                    sysStatusFunction()
                    clearInterval(searchAnimation)
                    return false
                } 
            }     
            if(stopStatus.animationStatus === false){
                sysStatusFunction()
                clearInterval(searchAnimation)
                return false
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
    if(stopStatus.complete){    
        stopStatus.maze = maze
    } else {
        stopStatus.complete = false
    }

    var id = -1;
    speed = speed / 2
    
    const mazeAnimation = setInterval(() => {
        if (id === undefined) {
            updateFunction()
            clearInterval(mazeAnimation)

        }else {
            if (stopStatus.animationStatus === false){
                sysStatusFunction()
                clearInterval(mazeAnimation)
                return
            }

            id = stopStatus.maze[0].shift()
            if (id !== undefined && WhichComponentSame(id) > 4) {
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