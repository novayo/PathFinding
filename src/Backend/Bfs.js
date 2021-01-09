import { position } from '../Core';
import Queue from '../Core/Queue';
import Distance from '../Core/Distance';

function BFS(start, speed) {
    var searchPath = [];
    const visited = new Set();
    const queue = new Queue();
    var distance = new Distance();

    distance.set(position.start, 0); // 加入自己
    queue.append([position.start, 0]); // [pos, 距離]
    visited.add(position.start.toString()); // 防止重複找尋
    while (queue.getLength() > 0) {
        var node = queue.popleft();
        var x = node[0][0];
        var y = node[0][1];
        var nextD = node[1] + 1;

        if (nextD > searchPath.length) searchPath.push([]);

        if ([x, y].toString() === position.end.toString()) break;

        // left
        if (y - 1 >= 0 && !([x, y - 1] in position.wall) && !(visited.has([x, y - 1].toString()))) {
            queue.append([[x, y - 1], nextD]);
            searchPath[nextD - 1].push([x, y - 1]);
            distance.set([x, y - 1], nextD);
            visited.add([x, y - 1].toString());
        }

        // up
        if (x - 1 >= 0 && !([x - 1, y] in position.wall) && !(visited.has([x - 1, y].toString()))) {
            queue.append([[x - 1, y], nextD]);
            searchPath[nextD - 1].push([x - 1, y]);
            distance.set([x - 1, y], nextD);
            visited.add([x - 1, y].toString());
        }

        // right
        // 這裡的position.rowSize怪怪的
        if (y + 1 < position.colSize && !([x, y + 1] in position.wall) && !(visited.has([x, y + 1].toString()))) {
            queue.append([[x, y + 1], nextD]);
            searchPath[nextD - 1].push([x, y + 1]);
            distance.set([x, y + 1], nextD);
            visited.add([x, y + 1].toString());
        }

        // down
        // 這裡的position.colSize怪怪的
        if (x + 1 < position.rowSize && !([x + 1, y] in position.wall) && !(visited.has([x + 1, y].toString()))) {
            queue.append([[x + 1, y], nextD]);
            searchPath[nextD - 1].push([x + 1, y]);
            distance.set([x + 1, y], nextD);
            visited.add([x + 1, y].toString());
        }

    }

    // 去除多找的一圈
    while (distance.get(position.end) !== -1 && searchPath.length > distance.get(position.end)) {
        searchPath.pop();
    }

    // 取得最短路徑
    var shortest = distance.getShortestPath(position.end);

    // 執行 start 動畫
    start(searchPath, shortest, speed);
}
export default BFS;