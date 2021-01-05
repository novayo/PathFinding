import { tableVar, picture, setTable } from './TableIndex'


export function Animation(arr, speed, count, picture) { 
    const arrAnimation = setInterval(() => {
        if(count === arr.length){
            clearInterval(arrAnimation)
        }else{
            setTable(arr[count][0] * tableVar.colSize + arr[count][1], picture)
        }
        count += 1
    }, speed / arr.length)
}

export function SearchAnimation(search, speed, count) { 
    const searchAnimation = setInterval(() => {
        if(count === search.length - 1){
            clearInterval(searchAnimation)
        }
        Animation(search[count], speed, 0, picture.search)
        count += 1
    }, speed)
    
}

export function PathAnimation(path, speed, count) { 
    Animation(path, speed, count, picture.path)
}