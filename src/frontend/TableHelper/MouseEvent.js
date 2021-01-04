import { useContext } from 'react'
import { tableVar, tableContext, touchContext, moveContext, componentKind, picture } from './TableIndex'


function MouseEvent() {
    const [table, touch, move] = [useContext(tableContext), useContext(touchContext), useContext(moveContext)]
    var temp = table.get.slice()

    const MouseUpHandler = (e) => {
        console.log("MouseUpHandler " + e.target.id)
        if(move.get === componentKind.wall){
            move.set()
        }else{
            if(temp[parseInt(e.target.id)] === picture.bomb){
                move.set()
            }else if(temp[parseInt(e.target.id)] === picture.start){
                move.set()
            }else{
                move.set()
            }
        }
        tableVar.init = temp
    }

    const MouseDownHandler = (e) => {
        e.preventDefault()
        console.log("ClickDownHandler " + e.target.id)
        if(temp[parseInt(e.target.id)] !== picture.bomb && temp[parseInt(e.target.id)] !== picture.start && temp[parseInt(e.target.id)] !== picture.end){
            move.set(componentKind.wall)
            if(temp[parseInt(e.target.id)] === picture.background){
                temp[parseInt(e.target.id)] = picture.wall
            }else{
                temp[parseInt(e.target.id)] = picture.background
            }
            table.set(temp, true)
        }else{
            if(temp[parseInt(e.target.id)] === picture.bomb){
                move.set(componentKind.bomb)
            }else if(temp[parseInt(e.target.id)] === picture.start){
                move.set(componentKind.start)
            }else{
                move.set(componentKind.end)
            }
        }
    }

    const OnMouseEnterHanlder = (e) => {
        console.log("OnMouseEnterHanlder " + e.target.id)
        if(move.get === componentKind.wall && temp[parseInt(e.target.id)] !== picture.bomb && temp[parseInt(e.target.id)] !== picture.start && temp[parseInt(e.target.id)] !== picture.end){
            if(temp[parseInt(e.target.id)] === picture.wall){
                temp[parseInt(e.target.id)] = picture.background
            }else{
                temp[parseInt(e.target.id)] = picture.wall
            }
            table.set(temp, true)
        }else{
            if(move.get === componentKind.bomb && temp[parseInt(e.target.id)] !== picture.start && temp[parseInt(e.target.id)] !== picture.end){
                if(temp[parseInt(e.target.id)] === picture.wall){
                    touch.set(componentKind.bomb)
                }else{
                    touch.set()
                }
                temp[parseInt(e.target.id)] = picture.bomb
                table.set(temp, true)
            }else if(move.get === componentKind.start && temp[parseInt(e.target.id)] !== picture.bomb && temp[parseInt(e.target.id)] !== picture.end){
                if(temp[parseInt(e.target.id)] === picture.wall){
                    touch.set(componentKind.start)
                }else{
                    touch.set()
                }
                temp[parseInt(e.target.id)] = picture.start
                table.set(temp, true)
            }else if(move.get === componentKind.end && temp[parseInt(e.target.id)] !== picture.bomb && temp[parseInt(e.target.id)] !== picture.start){
                if(temp[parseInt(e.target.id)] === picture.wall){
                    touch.set(componentKind.end)
                }else{
                    touch.set()
                }
                temp[parseInt(e.target.id)] = picture.end
                table.set(temp, true)
            }
        }
    }

    const OnMouseOutHanlder = (e) => {
        console.log("OnMouseOutHanlder " + e.target.id)
        if(move.get !== componentKind.wall){
            if(move.get === componentKind.bomb && temp[parseInt(e.target.id)] !== picture.start && temp[parseInt(e.target.id)] !== picture.end){
                if(touch.get === componentKind.bomb){
                    temp[parseInt(e.target.id)] = picture.wall
                }else{
                    temp[parseInt(e.target.id)] = picture.background
                }
                table.set(temp, true)
            }else if(move.get === componentKind.start && temp[parseInt(e.target.id)] !== picture.bomb && temp[parseInt(e.target.id)] !== picture.end){
                if(touch.get === componentKind.start){
                    temp[parseInt(e.target.id)] = picture.wall
                }else{
                    temp[parseInt(e.target.id)] = picture.background
                }
                table.set(temp, true)
            }else if(move.get === componentKind.end && temp[parseInt(e.target.id)] !== picture.bomb && temp[parseInt(e.target.id)] !== picture.start){
                if(touch.get === componentKind.end){
                    temp[parseInt(e.target.id)] = picture.wall
                }else{
                    temp[parseInt(e.target.id)] = picture.background
                }
                table.set(temp, true)
            }
        }
    }

    return {MouseDownHandler, MouseUpHandler, OnMouseEnterHanlder, OnMouseOutHanlder, table}

}

export default MouseEvent


