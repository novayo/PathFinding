import { position } from '../../Core';
import { CreateAround } from './Core';

function Binary_Tree() {
    var wallSet = new Set();
    var walls = CreateAround(wallSet);
    var x = 0;
    var y = 0;

    // Binary Tree to get random maze
    // http://weblog.jamisbuck.org/2011/2/1/maze-generation-binary-tree-algorithm
    for (x = 2; x <= position.rowSize - 2; x += 2) {
        for (y = 2; y <= position.colSize - 2; y += 2) {
            if (wallSet.has([x - 2, y].toString()) && wallSet.has([x, y - 2].toString())) {
                var randomFace = Math.floor(Math.random() * 2) + 1;// 1=上，2=左
                switch (randomFace) {
                    case 1:
                        walls.push([x - 1, y]);
                        wallSet.add([x - 1, y].toString());
                        break;
                    case 2:
                        walls.push([x, y - 1]);
                        wallSet.add([x, y - 1].toString());
                        break;
                    default:
                        break;
                }
            } else if (wallSet.has([x - 2, y].toString())) {
                walls.push([x - 1, y]);
                wallSet.add([x - 1, y].toString());
            } else if (wallSet.has([x, y - 2].toString())) {
                walls.push([x, y - 2]);
                wallSet.add([x, y - 1].toString());
            } else {
                console.log('Some Error in Binary_Tree_Maze()');
            }
            walls.push([x, y]);
            wallSet.add([x, y].toString());
        }
    }

    return walls;
}

export default Binary_Tree;