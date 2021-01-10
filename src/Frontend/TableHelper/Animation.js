import { tableVar, componentKind } from './TableIndex'
import { setTable } from './SetTable'


export function Animation(arr, speed, count, kind, myCallbackFunction = null) { 
    const arrAnimation = setInterval(() => {
        if(count === arr.length){
            if (myCallbackFunction !== null){
                myCallbackFunction();
            }
            clearInterval(arrAnimation);
        }else{
            const index = arr[count][0] * tableVar.colSize + arr[count][1]
            const name = document.getElementById(index.toString()).className
            if(name === componentKind.background || name === componentKind.search){
                setTable(index, kind)
            } 
        }
        count += 1
    }, speed / arr.length)
}

export function SearchAnimation(search, speed, count) { 
    const searchAnimation = setInterval(() => {
        if(count === search.length - 1){
            clearInterval(searchAnimation)
        }
        Animation(search[count], speed, 0, componentKind.search)
        count += 1
    }, speed)
    
}

export function PathAnimation(path, speed, count, myCallbackFunction = null) { 
    Animation(path, speed, count, componentKind.path, myCallbackFunction)
}