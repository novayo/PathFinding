import { position } from '../../Core';
import Queue from '../../Core/Queue';
import Distance from '../../Core/Distance';

function BFS(startCallback, speed) {
    var times = 1 + (position.bomb === false ? 0 : 1); // 如果有bomb要執行2次
    var retSearchPath = [];
    var retBombPath = [];
    var retShortestPath = [];
    var retDirection = [];

    for (var i = 0; i < times; i++) {
        var searchPath = [];
        const visited = new Set();
        const queue = new Queue();
        var distance = new Distance();
        var startPos = i === 0 ? position.start : position.bomb; // 第一次執行start，第二次bomb
        var endPos = i === 0 && times > 1 ? position.bomb : position.end; // 第一次執行bomb，第二次end

        distance.set(startPos, 0); // 加入自己
        queue.append([startPos, 0]); // [pos, 距離]
        visited.add(startPos.toString()); // 防止重複找尋
        while (queue.getLength() > 0) {
            var node = queue.popleft();
            var x = node[0][0];
            var y = node[0][1];
            var nextD = node[1] + 1;

            if (nextD > searchPath.length) searchPath.push([]); // 若有新的長度就增加array

            if ([x, y].toString() === endPos.toString()) break; // 若找到終點就跳出

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
        while (distance.get(endPos) !== -1 && searchPath.length > distance.get(endPos)) {
            searchPath.pop();
        }

        if (i === 0) {
            retSearchPath = retSearchPath.concat(searchPath);
        } else {
            retBombPath = retBombPath.concat(searchPath);
        }

        if (distance.get(endPos) === -1) break; // 如果第一次沒找到終點，不加入最短路徑

        // if(i === 1){
        //     retSearchPath.splice(retSearchPath.length - 1, 1)
        //     distance.remove(startPos)
        // }
        if(i === 0 && times === 2){
            // retSearchPath.splice(retSearchPath.length - 1, 1)
            var up = endPos[0] - 1 >= 0 ? [endPos[0] - 1, endPos[1]] : null;
            var right = endPos[1] + 1 < position.colSize ? [endPos[0], endPos[1] + 1] : null;
            var down = endPos[0] + 1 < position.rowSize ? [endPos[0] + 1, endPos[1]] : null;
            var left = endPos[1] - 1 >= 0 ? [endPos[0], endPos[1] - 1] : null;
    
            var temp = Infinity;

            // eslint-disable-next-line
            [up, right, down, left].forEach((nextPos, idx) => {
                if (!nextPos || distance.get(nextPos) === -1) return; // 若超過邊界 or 是牆壁
                if (temp > distance.get(nextPos)){
                    temp = distance.get(nextPos)
                    endPos = nextPos
                }
            })
            distance.remove(position.bomb)
        }
        // 取得最短路徑
        var shortest = distance.getShortestPath(endPos);
        retShortestPath = retShortestPath.concat(shortest[0]);
        retDirection = retDirection.concat(shortest[1]);
    }
    retSearchPath.unshift([position.start]); // 加入起始點
    // console.log(retDirection);
    // 執行 start 動畫
    startCallback(retSearchPath, retShortestPath, retDirection, speed, retBombPath);
}
export default BFS;