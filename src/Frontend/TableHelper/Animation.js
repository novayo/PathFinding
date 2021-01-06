import { tableVar, componentKind, setTable } from './TableIndex'


export function Animation(arr, speed, count, componentKind, myCallbackFunction = null) { 
    const arrAnimation = setInterval(() => {
        if(count === arr.length){
            if (myCallbackFunction !== null){
                myCallbackFunction();
            }
            clearInterval(arrAnimation);
        }else{
            setTable(arr[count][0] * tableVar.colSize + arr[count][1], componentKind)
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