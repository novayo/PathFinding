import { position } from '../Core';
import Queue from '../Core/Queue';
import Distance from '../Core/Distance';

// 卡在seatch應該要三層array，不應該只有兩層，第三層要是用level分類
async function BFS(callback) {
    var searchPath = [];
    const visited = new Set();
    const queue = new Queue();
    var distance = new Distance();

    queue.append([position.start, 0]); // [pos, 距離]
    visited.add(position.start.toString());
    while (queue.getLength() > 0) {
        var node = queue.popleft();
        var x = node[0][0];
        var y = node[0][1];
        var nextD = node[1] + 1;

        if (nextD > searchPath.length) searchPath.push([]);

        if ([x, y].toString() === position.end.toString()) break;

        // up
        if (x - 1 >= 0 && !([x - 1, y] in position.wall) && !(visited.has([x - 1, y].toString()))) {
            queue.append([[x - 1, y], nextD]);
            searchPath[nextD - 1].push([x - 1, y]);
            distance.set([x - 1, y], nextD);
            visited.add([x - 1, y].toString());
        }

        // right
        // 這裡的position.rowSize怪怪的
        if (y + 1 < position.rowSize && !([x, y + 1] in position.wall) && !(visited.has([x, y + 1].toString()))) {
            queue.append([[x, y + 1], nextD]);
            searchPath[nextD - 1].push([x, y + 1]);
            distance.set([x, y + 1], nextD);
            visited.add([x, y + 1].toString());
        }

        // down
        // 這裡的position.colSize怪怪的
        if (x + 1 < position.colSize && !([x + 1, y] in position.wall) && !(visited.has([x + 1, y].toString()))) {
            queue.append([[x + 1, y], nextD]);
            searchPath[nextD - 1].push([x + 1, y]);
            distance.set([x + 1, y], nextD);
            visited.add([x + 1, y].toString());
        }

        // left
        if (y - 1 >= 0 && !([x, y - 1] in position.wall) && !(visited.has([x, y - 1].toString()))) {
            queue.append([[x, y - 1], nextD]);
            searchPath[nextD - 1].push([x, y - 1]);
            distance.set([x, y - 1], nextD);
            visited.add([x, y - 1].toString());
        }
    }

    callback(searchPath, [[1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2]], 1000);
}
export default BFS;