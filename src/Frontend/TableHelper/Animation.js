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

class searchAnimation_pos{
    constructor(){
        this.className = undefined;
        this.className1 = undefined;
        this.className2 = undefined;

        this.id = undefined;
        this.newid = undefined;
        this.d = undefined;
        this.items = undefined;
    }

    getItems(container){
        if(container.length > 0){
            this.items = [container[0].shift()]
            if(this.items[0] === undefined) {container.shift()}
        } else {
            this.items = [undefined]
        }
    }

    getClassName(){};
    runAnimation(){};
}

class searchAnimation_search extends searchAnimation_pos{
    getClassName(id){
        this.className1 = (isWall(id) || isPath(id)) ? componentKind.search : StartEndBombWeight(WhichComponentSame(id), componentKind.startSearch, componentKind.endSearch, componentKind.bombSearch, componentKind.weightSearch)
        this.className2 = (isWall(id) || isPath(id)) ? componentKind.searchBomb : StartEndBombWeight(WhichComponentSame(id), componentKind.startSearchBomb, componentKind.endSearchBomb, componentKind.bombSearch, componentKind.weightSearchBomb)
        return this.className = (position.bomb === false) ? this.className1 : this.className2
    }

    runAnimation(container){
        this.getItems(container)

        this.id = this.items[0]
        if(this.id === undefined || container.length === 0){
            return false
        }
        
        this.getClassName(this.id)
        setTable(this.id, this.className)
        return true
    }
    
}

class searchAnimation_bomb extends searchAnimation_pos{
    getClassName(id){
        this.className = (isWall(id) || isPath(id)) ? componentKind.search : StartEndBombWeight(WhichComponentSame(id), componentKind.startSearch, componentKind.endSearch, componentKind.bombSearch, componentKind.weightSearch)
    }

    runAnimation(container){
        this.getItems(container)

        this.id = this.items[0]
        if(this.id === undefined || container.length === 0){
            return false
        }
        
        this.getClassName(this.id)
        setTable(this.id, this.className)
        return true
    }
    
}

class searchAnimation_path extends searchAnimation_pos{
    getItems(path, pathDirection){
        this.items =  (path.length > 0) ? [path.shift(), pathDirection.shift()] : [undefined]
    }

    getClassName(id, d){
        this.className1 = componentKind.path
        this.className2 = (isWall(id) || isPath(id)) ? direction(d) : StartEndBombWeight(WhichComponentSame(id), direction(d), direction(d), componentKind.bombPath, componentKind.weightPath)
    }

    runAnimation(container){
        var path = container[0];
        var pathDirection = container[1];

        this.getItems(path, pathDirection)

        this.id = this.items[0]
        if(this.id === undefined || path.length === 0){
            return false
        }
        
        this.newid = path[0]
        this.d = pathDirection[0]

        this.getClassName(this.newid, this.d)
        setTable((isWeight(this.id) || isWall(this.id) || isPath(this.id)) ? this.id : -1, this.className1)
        setTable(this.newid, this.className2)
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
    
        stopStatus.search = search
        stopStatus.path = path
        stopStatus.pathDirection = pathDirection
        stopStatus.bomb = bomb
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
            className1 = (isWall(id) || isPath(id)) ? componentKind.searchStatic : StartEndBombWeight(type, componentKind.startSearch, componentKind.endSearch, componentKind.bombSearch, componentKind.weightSearchStatic);
            className2 = (isWall(id) || isPath(id)) ? componentKind.searchBombStatic : StartEndBombWeight(type, componentKind.startSearchBomb, componentKind.endSearchBomb, componentKind.bombSearchBomb, componentKind.weightSearchBombStatic);
            (position.bomb === false) ? setTable(id, className1) : setTable(id, className2);
        }
    }
    for (i = 0; i < bomb.length; i++) {
        for (j = 0; j < bomb[i].length; j++) {
            id = bomb[i][j]; type = WhichComponentSame(id);
            className1 = (isWall(id) || isPath(id)) ? componentKind.searchStatic : StartEndBombWeight(WhichComponentSame(id), componentKind.startSearch, componentKind.endSearch, componentKind.bombSearch, componentKind.weightSearchStatic);
            setTable(id, className1);
        }
    }
    for (i = 0; i < path.length; i++) {
        id = path[i]; d = pathDirection[i]; type = WhichComponentSame(id);
        className1 = (isWall(id) || isPath(id)) ? componentKind.pathStatic : StartEndBombWeight(WhichComponentSame(id), direction(d), direction(d), componentKind.bombPath, componentKind.weightPathStatic);
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
            if (id !== undefined && isPath(id)) {
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

function isWeight(id) {
    return WhichComponentSame(id) === 3;
}

function isWall(id) {
    return WhichComponentSame(id) === 4;
}

function isPath(id) {
    return WhichComponentSame(id) === 5;
}