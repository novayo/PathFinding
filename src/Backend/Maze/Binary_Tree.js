import { position } from '../../Core';

function Binary_Tree() {
    var walls = []

    // 取得外圍
    var tmp = position.colSize - 1;
    for (var y = 0; y <= tmp; y++) {
        walls.push([0, y]);
        walls.push([0, tmp]);
        tmp--;
    }

    for (var x = 0; x < position.rowSize; x++) {
        walls.push([x, 0]);
        walls.push([x, position.colSize - 1]);
    }

    var tmp = position.colSize - 1;
    for (var y = 0; y <= tmp; y++) {
        walls.push([position.rowSize - 1, y]);
        walls.push([position.rowSize - 1, tmp]);
        tmp--;
    }

    // Binary Tree to get random maze
    // http://weblog.jamisbuck.org/2011/2/1/maze-generation-binary-tree-algorithm
    for (var x = 2; x <= position.rowSize; x += 2) {
        var tmp = position.colSize - 2;
        for (var y = 2; y <= tmp; y++) {
            var randomFace = Math.floor(Math.random() * 2) + 1;// 1=上，2=左
            switch (randomFace) {
                case 1:
                    walls.push([x - 1, y]);
                    break;
                case 2:
                    walls.push([x, y - 1]);
            }

            randomFace = Math.floor(Math.random() * 2) + 1;// 1=上，2=右
            switch (randomFace) {
                case 1:
                    walls.push([x - 1, tmp]);
                    break;
                case 2:
                    walls.push([x, tmp + 1]);
            }
            tmp--;
        }
    }

    return walls;
}

export default Binary_Tree;