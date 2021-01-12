import { tableVar, componentKind } from './TableIndex'
import { setTable } from './SetTable'


export function Animation(arr, speed, count, kind, myCallbackFunction = null) {
    const arrAnimation = setInterval(() => {
        if (count === arr.length) {
            if (myCallbackFunction !== null) {
                myCallbackFunction();
            }
            clearInterval(arrAnimation);
        }else {
            const index = arr[count][0] * tableVar.colSize + arr[count][1]
            const name = document.getElementById(index.toString()).className
            if (name === componentKind.background || name === componentKind.search || name === componentKind.searchBomb) {
                setTable(index, kind)
            }
        }
        count += 1
    }, speed / 3)
}

export function SearchBombAnimation(search, bomb, path, speed, count, myCallbackFunction, sysStatusFunction) {
    const searchBombAnimation = setInterval(() => {
        if (count === search.length) {
            myCallbackFunction(bomb, path, speed, 0, PathAnimation, sysStatusFunction)
            clearInterval(searchBombAnimation)
        }else{
            for(var i = 0;i < search[count].length;i++){
                const index = search[count][i][0] * tableVar.colSize + search[count][i][1]
                const name = document.getElementById(index.toString()).className
                if (name === componentKind.background || name === componentKind.search) {
                    if(bomb.length === 0){
                        setTable(index, componentKind.search)
                    }else{
                        setTable(index, componentKind.searchBomb)
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
            console.log("here")
            myCallbackFunction(path, speed, 0, sysStatusFunction)
            clearInterval(searchAnimation)
        }else{
            for(var i = 0;i < bomb[count].length;i++){
                const index = bomb[count][i][0] * tableVar.colSize + bomb[count][i][1]
                const name = document.getElementById(index.toString()).className
                if (name === componentKind.background || name === componentKind.searchBomb) {
                    setTable(index, componentKind.search)
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