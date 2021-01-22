import { position } from '../../Core';

const probability = 0.35

function Basic_Weight_Maze(){
    const wall = []
    const weight = []

    const [height, width] = [position.rowSize, position.colSize]
    for(var i = 0; i < height; i++){
        for(var j = 0; j < width; j++){
            if(Math.random() < probability){
                if(i === position.start[0] && j === position.start[1]){
                    continue
                }else if(i === position.end[0] && j === position.end[1]){
                    continue
                }else if(position.bomb !== false && i === position.bomb[0] && j === position.bomb[1]){
                    continue
                }else{
                    weight.push([i, j])
                }
            }
        }
    }

    return [wall, weight]
}

export default Basic_Weight_Maze