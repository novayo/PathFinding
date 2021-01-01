import { useState, useContext, useEffect } from 'react'
import { tableContext } from './TableIndex'
import ReactDOM from 'react-dom'
import TableUI from './TableUI';


function MouseEvent() {
    const tableVarContext = useContext(tableContext)
    const [rowSize, colSize] = [tableVarContext.rowSize, tableVarContext.colSize]
    const picture = tableVarContext.picture

    const [wall, setWall] = useState(false)
    const [bomb, setBomb] = useState(false)
    const [touch, setTouch] = useState({bombComponent: false, startComponent: false, endComponent: false})
    const [move, setMove] = useState({bombComponent: false, startComponent: false, endComponent: false})

    const initialTable = Array.from(Array(rowSize * colSize).keys(), index => {
        if(index === Math.floor(rowSize / 2) * colSize + Math.floor(colSize / 4)){
            return picture.start
        }else if(index === Math.floor(rowSize / 2 + 1) * colSize - Math.floor(colSize / 4)){
            return picture.end
        }else{
            return picture.background
        }
    })
    const [tableColor, setTableColor] = useState(initialTable)
    var temp = tableColor.slice()

    function SearchAnimation(search, speed, count) { 
        const SearchAnimation = setInterval(() => {
            if(count === search.length){
                clearInterval(SearchAnimation)
            }else{
                for(var i = 0;i < search[count].length;i++){
                    temp[search[count][i][0] * tableVarContext.colSize + search[count][i][1]] = picture.search
                }
                setTableColor(temp)
            }
            count += 1
            ReactDOM.render(
                <TableUI />,
                document.getElementById('UI')
            )
        }, speed)
    }

    function PathAnimation(path, speed, count) {         
        const PathAnimation = setInterval(() => {
            if(count === path.length){
                clearInterval(PathAnimation)
            }else{
                temp[path[count][0] * tableVarContext.colSize + path[count][1]] = picture.path
                setTableColor(temp)
            }
            count += 1
            ReactDOM.render(
                <TableUI />,
                document.getElementById('UI')
            )
        }, speed)
    }

    useEffect(() => {
        console.log("ButtonHanlder")
        if(bomb === false && tableVarContext.clickButton === tableVarContext.buttonKind.AddBomb){
            console.log("AddBomb")
            setBomb(true)
            temp[Math.floor(rowSize / 2) * colSize + Math.floor(colSize / 2)] = picture.bomb
            setTableColor(temp)
            tableVarContext.clickButton = ""

        }else if(bomb && tableVarContext.clickButton === tableVarContext.buttonKind.RemoveBomb){
            console.log("RemoveBomb")
            for(var i = 0; i < rowSize * colSize;i++){
                if(temp[i] === picture.bomb){
                    temp[i] = picture.background
                }
            }
            setBomb(false)
            setTableColor(temp)
            tableVarContext.clickButton = ""

        }else if(tableVarContext.clickButton === tableVarContext.buttonKind.ClearWalls){
            console.log("ClearWall")
            for(var i = 0; i < rowSize * colSize;i++){
                if(temp[i] === picture.wall){
                    temp[i] = picture.background
                }
            }
            setTableColor(temp)
            setTouch(false)
            tableVarContext.clickButton = ""

        }else if(tableVarContext.clickButton === tableVarContext.buttonKind.ClearBoard){
            console.log("ClearBoard")
            setTableColor(initialTable)
            setBomb(false)
            setTouch(false)
            tableVarContext.clickButton = ""

        }else if(tableVarContext.clickButton === tableVarContext.buttonKind.start){
            console.log("Start")
            const [search, path, speed] = [tableVarContext.search, tableVarContext.path, tableVarContext.speed]
            tableVarContext.startInit = temp.slice()
            var count = 0
            SearchAnimation(search, speed, count)
            setTimeout(() => {PathAnimation(path, speed, count);tableVarContext.clickButton = ""}, speed * (search.length + 1))

        }else if(tableVarContext.clickButton === tableVarContext.buttonKind.ClearPath){
            console.log("ClearPath")
            if(Array.isArray(tableVarContext.startInit)){
                setTableColor(tableVarContext.startInit)
            }
            tableVarContext.clickButton = ""

        }else if(tableVarContext.clickButton === tableVarContext.buttonKind.Init){
            tableVarContext.clickButton = ""
            ReactDOM.render(
                <TableUI />,
                document.getElementById('UI')
            )
        }
    }, [tableVarContext.clickButton])

    const MouseUpHandler = (e) => {
        console.log("MouseUpHandler " + e.target.id)
        if(wall){
            setWall(false)
        }else{
            if(temp[parseInt(e.target.id)] === picture.bomb){
                setMove({...move, bombComponent: false})
            }else if(temp[parseInt(e.target.id)] === picture.start){
                setMove({...move, startComponent: false})
            }else{
                setMove({...move, endComponent: false})
            }
        }
    }

    const MouseDownHandler = (e) => {
        e.preventDefault()
        console.log("ClickDownHandler " + e.target.id)
        if(temp[parseInt(e.target.id)] !== picture.bomb && temp[parseInt(e.target.id)] !== picture.start && temp[parseInt(e.target.id)] !== picture.end){
            setWall(true)
            if(temp[parseInt(e.target.id)] === picture.background){
                temp[parseInt(e.target.id)] = picture.wall
            }else{
                temp[parseInt(e.target.id)] = picture.background
            }
            setTableColor(temp)
        }else{
            if(temp[parseInt(e.target.id)] === picture.bomb){
                setMove({...move, bombComponent: true})
            }else if(temp[parseInt(e.target.id)] === picture.start){
                setMove({...move, startComponent: true})
            }else{
                setMove({...move, endComponent: true})
            }
        }
    }

    const OnMouseEnterHanlder = (e) => {
        console.log("OnMouseEnterHanlder " + e.target.id)
        if(wall && temp[parseInt(e.target.id)] !== picture.bomb && temp[parseInt(e.target.id)] !== picture.start && temp[parseInt(e.target.id)] !== picture.end){
            if(temp[parseInt(e.target.id)] === picture.wall){
                temp[parseInt(e.target.id)] = picture.background
            }else{
                temp[parseInt(e.target.id)] = picture.wall
            }
            setTableColor(temp)
        }else{
            if(move.bombComponent && temp[parseInt(e.target.id)] !== picture.start && temp[parseInt(e.target.id)] !== picture.end){
                if(temp[parseInt(e.target.id)] === picture.wall){
                    setTouch({...touch, bombComponent: true})
                }else{
                    setTouch({...touch, bombComponent: false})
                }
                temp[parseInt(e.target.id)] = picture.bomb
                setTableColor(temp)
            }else if(move.startComponent && temp[parseInt(e.target.id)] !== picture.bomb && temp[parseInt(e.target.id)] !== picture.end){
                if(temp[parseInt(e.target.id)] === picture.wall){
                    setTouch({...touch, startComponent: true})
                }else{
                    setTouch({...touch, startComponent: false})
                }
                temp[parseInt(e.target.id)] = picture.start
                setTableColor(temp)
            }else if(move.endComponent && temp[parseInt(e.target.id)] !== picture.bomb && temp[parseInt(e.target.id)] !== picture.start){
                if(temp[parseInt(e.target.id)] === picture.wall){
                    setTouch({...touch, endComponent: true})
                }else{
                    setTouch({...touch, endComponent: false})
                }
                temp[parseInt(e.target.id)] = picture.end
                setTableColor(temp)
            }
        }
    }

    const OnMouseOutHanlder = (e) => {
        console.log("OnMouseOutHanlder " + e.target.id)
        if(wall === false){
            if(move.bombComponent && temp[parseInt(e.target.id)] !== picture.start && temp[parseInt(e.target.id)] !== picture.end){
                if(touch.bombComponent){
                    temp[parseInt(e.target.id)] = picture.wall
                }else{
                    temp[parseInt(e.target.id)] = picture.background
                }
                setTableColor(temp)
            }else if(move.startComponent && temp[parseInt(e.target.id)] !== picture.bomb && temp[parseInt(e.target.id)] !== picture.end){
                if(touch.startComponent){
                    temp[parseInt(e.target.id)] = picture.wall
                }else{
                    temp[parseInt(e.target.id)] = picture.background
                }
                setTableColor(temp)
            }else if(move.endComponent && temp[parseInt(e.target.id)] !== picture.bomb && temp[parseInt(e.target.id)] !== picture.start){
                if(touch.endComponent){
                    temp[parseInt(e.target.id)] = picture.wall
                }else{
                    temp[parseInt(e.target.id)] = picture.background
                }
                setTableColor(temp)
            }
        }
    }

    return {MouseDownHandler, MouseUpHandler, OnMouseEnterHanlder, OnMouseOutHanlder, tableColor}

}

export default MouseEvent


