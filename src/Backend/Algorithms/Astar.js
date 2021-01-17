import { position } from '../../Core';
import PriorityQueue from 'javascript-priority-queue'; //https://www.npmjs.com/package/javascript-priority-queue

function Astar(startCallback, speed) {
    var retSearchPath = [];
    var retBombPath = [];
    var retShortestPath = [];

    if (position.bomb) {
        retShortestPath = retShortestPath.concat(DoAStar(position.start, position.bomb, retSearchPath))

        // 有找到最小路徑才繼續
        if (retShortestPath.length > 0) {
            retShortestPath = retShortestPath.concat(DoAStar(position.bomb, position.end, retBombPath))
        }
    } else {
        retShortestPath = retShortestPath.concat(DoAStar(position.start, position.end, retSearchPath))
    }
    // 執行 start 動畫
    startCallback(retSearchPath, retShortestPath, speed, retBombPath);
}

// 回傳最短路徑，update search
function DoAStar(startPos, endPos, searchPath) {
    // 先假設權重都是1
    var i, j;
    var weights = {}
    for (i = 0; i < position.rowSize; i++) {
        for (j = 0; j < position.colSize; j++) {
            weights[[i, j]] = 1;
        }
    }

    var current_shortest_path = new PriorityQueue('min');
    var table = {}

    // 設定table: 起始點為0，其他為無限大，所有的previous vertex均為null
    // 設定目前最短路徑的queue
    for (i = 0; i < position.rowSize; i++) {
        for (j = 0; j < position.colSize; j++) {
            var pos = [i, j]
            table[pos] = [GetHeuristic(pos, endPos), null]; // 起始點走到pos的最短距離(A*：改成heuristic)，上一個點
        }
    }
    // table[startPos] = [0, null]; // 設定起始點 // A*：改成heuristic不用設定
    current_shortest_path.enqueue(startPos, 0); // 設定目前最短路徑的queue

    /* 演算法開始 */
    var isFoundEnd = false;
    var visited = new Set();
    visited.add(startPos.toString()); // 加入已走過
    searchPath.push([startPos]); // 加入搜尋範圍
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


            if (visited.has(nextPos.toString())) {
                return; // 已走過的點不走
            }
            else {
                visited.add(nextPos.toString()); // 加入已走過
                searchPath.push([nextPos]); // 加入搜尋範圍
            }

            // Dijkstra
            // var tmp = table[curPos][0] + weights[nextPos];
            // if (tmp < table[nextPos][0]) {
            //     table[nextPos][0] = tmp;
            //     table[nextPos][1] = curPos;
            // }
            // current_shortest_path.enqueue(nextPos, table[nextPos][0]); // 加入計算目前的最小的路徑

            // A*
            table[nextPos][1] = curPos; // 因為table[0]現在是heuristic（因此不更新），所以四周圍直接更新成目前的點就行
            current_shortest_path.enqueue(nextPos, table[nextPos][0] + weights[nextPos]); // 計算方式變成Heuristic + weight

            if (nextPos.toString() === endPos.toString()) { // 看是否找到終點了
                isFoundEnd = true;
            }
        })

        if (isFoundEnd) { // 找到終點跳出
            break;
        }
    }

    // 若有找到終點再判斷最小路徑
    console.log(isFoundEnd)
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

// 推測值：用距離來表示，因為是棋盤，所以改成最短距離幾格
function GetHeuristic(startPos, endPos) {
    return Math.abs(endPos[0] - startPos[0]) + Math.abs(endPos[1] - startPos[1]);
}

export default Astar;