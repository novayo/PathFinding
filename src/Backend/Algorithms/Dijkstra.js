import { position } from '../../Core';
import PriorityQueue from 'javascript-priority-queue'; //https://www.npmjs.com/package/javascript-priority-queue

function Dijkstra(startCallback, speed) {
    var retSearchPath = [];
    var retBombPath = [];
    var retShortestPath = [];

    if (position.bomb) {
        retShortestPath = retShortestPath.concat(DoDijkstra(position.start, position.bomb, retSearchPath));

        // 有找到最小路徑才繼續
        if (retShortestPath.length > 0) {
            retShortestPath = retShortestPath.concat(DoDijkstra(position.bomb, position.end, retBombPath));
        }
    } else {
        retShortestPath = retShortestPath.concat(DoDijkstra(position.start, position.end, retSearchPath));
    }
    // 執行 start 動畫
    startCallback(retSearchPath, retShortestPath, speed, retBombPath);
}

/// 回傳最短路徑
function DoDijkstra(startPos, endPos, searchPath) {
    /*  //https://medium.com/basecs/finding-the-shortest-path-with-a-little-help-from-dijkstra-613149fbdc8e
        Create Dijkstra table 
        
        table = {pos : [shortest distance, previous vertex]}
            * start pos : [0, null]
            * use priority queue to pick the pos which contains current shortest disance.
    */

    // 先假設權重都是1
    var i, j;
    var weights = {}
    for (i = 0; i < position.rowSize; i++) {
        for (j = 0; j < position.colSize; j++) {
            weights[[i, j]] = 0;
        }
    }

    var current_shortest_path = new PriorityQueue('min');
    var table = {}

    // 設定table: 起始點為0，其他為無限大，所有的previous vertex均為null
    // 設定目前最短路徑的queue
    for (i = 0; i < position.rowSize; i++) {
        for (j = 0; j < position.colSize; j++) {
            var pos = [i, j]
            table[pos] = [Infinity, null]; // 起始點走到pos的最短距離，上一個點
        }
    }
    table[startPos] = [0, null]; // 設定起始點
    current_shortest_path.enqueue(startPos, 0); // 設定目前最短路徑的queue


    /* 演算法開始 */
    var isFoundEnd = false;
    var visited = new Set();

    while (current_shortest_path.size() > 0) {
        // 1. 選出當前最小路徑的點 O(logn)
        var curPos = current_shortest_path.dequeue();

        // 2. 計算相鄰且尚未走過的點
        // tmp = curPos.最短距離 + 走到下一點的權重
        // 若 tmp < 下一點.最短距離 : 下一點.最短距離=tmp, 且previous vertex=curPos

        var up = curPos[0] - 1 >= 0 ? [curPos[0] - 1, curPos[1]] : null;
        var right = curPos[1] + 1 < position.colSize ? [curPos[0], curPos[1] + 1] : null;
        var down = curPos[0] + 1 < position.rowSize ? [curPos[0] + 1, curPos[1]] : null;
        var left = curPos[1] - 1 >= 0 ? [curPos[0], curPos[1] - 1] : null;

        // eslint-disable-next-line
        [up, right, down, left].forEach(nextPos => {
            if (!nextPos || isFoundEnd || nextPos in position.wall) return; // 若超過邊界 or 已經找到終點了 or 是牆壁

            var tmp = table[curPos][0] + (weights[nextPos] === 0 ? 1 : weights[nextPos]);
            if (tmp < table[nextPos][0]) {
                table[nextPos][0] = tmp;
                table[nextPos][1] = curPos;
            }
            if (!visited.has(curPos.toString())) {
                current_shortest_path.enqueue(nextPos, table[nextPos][0]); // 加入計算目前的最小的路徑

            }

            if (nextPos.toString() === endPos.toString()) { // 看是否找到終點了
                isFoundEnd = true;
            }
        })

        if (!visited.has(curPos.toString())) {
            visited.add(curPos.toString()); // 加入已走過
            searchPath.push([curPos]); // 加入搜尋範圍
        }

        if (isFoundEnd) { // 找到終點跳出
            break;
        }
    }


    // 若有找到終點再判斷最小路徑
    var curShortestPath = []
    if (isFoundEnd) {
        curPos = endPos;
        while (curPos) { // 因為找到start時的previous vertex為null
            curShortestPath.unshift(curPos);
            curPos = table[curPos][1];
        }
    }
    return curShortestPath;
}

export default Dijkstra;