import { position } from '../../Core';

function Dijkstra_old(whichAlgo, startCallback, speed) {
    var retSearchPath = [];
    var retBombPath = [];
    var retShortestPath = [];
    var retDirection = [];

    if (position.bomb) {
        retShortestPath = retShortestPath.concat(DoDijkstra_old(whichAlgo, position.start, position.bomb, retSearchPath, retDirection))

        // 有找到最小路徑才繼續
        if (retShortestPath.length > 0) {
            retShortestPath.splice(retShortestPath.length - 1, 1); // 第一段的終點也是第二段的起點，故去除
            retDirection.splice(retDirection.length - 1, 1); // 第一段的終點也是第二段的起點，故去除
            let tmp = []; // 因為unshift所以暫存
            retShortestPath = retShortestPath.concat(DoDijkstra_old(whichAlgo, position.bomb, position.end, retBombPath, tmp))
            retDirection = retDirection.concat(tmp);
        }
    } else {
        retShortestPath = retShortestPath.concat(DoDijkstra_old(whichAlgo, position.start, position.end, retSearchPath, retDirection))
    }

    // 執行 start 動畫
    startCallback(retSearchPath, retShortestPath, retDirection, speed, retBombPath);
}

// 回傳最短路徑
function DoDijkstra_old(whichAlgo, startPos, endPos, searchPath, retDirection) {
    /*  //https://medium.com/basecs/finding-the-shortest-path-with-a-little-help-from-dijkstra-613149fbdc8e
        Create Dijkstra table 
        
        table = {pos : [shortest distance, previous vertex]}
            * start pos : [0, null]
            * use priority queue to pick the pos which contains current shortest disance.
    */


    // 設定table: 起始點為0，其他為無限大，所有的previous vertex均為null
    // 設定目前最短路徑的queue
    var table = [{}, {}];
    var i, j;
    for (i = 0; i < position.rowSize; i++) {
        for (j = 0; j < position.colSize; j++) {
            var pos = [i, j];

            // 起始點走到pos的最短距離，上一個點，direction，total距離
            table[0][pos] = [Infinity, null, null, Infinity];
            table[1][pos] = [Infinity, null, null, Infinity]; // for 決定起始點（bidirection
        }
    }

    var end = null; // 決定終點（可能bomb or end）
    var unvisited = [[], []]; // [0]: start, [1]: end
    switch (whichAlgo) {
        case "Dijkstra":
            table[0][startPos] = [0, null, "up", 0]; // 設定起始點
            unvisited[0].push(startPos); // 設定目前最短路徑的queue
            end = [endPos];
            break;
        case "Astar":
            table[0][startPos] = [0, null, "up", 0]; // 設定起始點
            unvisited[0].push(startPos); // 設定目前最短路徑的queue
            end = [endPos];
            break;
        case "Swarm":
            table[0][startPos] = [0, null, "right", 0]; // 設定起始點
            unvisited[0].push(startPos); // 設定目前最短路徑的queue
            end = [endPos];
            break;
        case "GreedyBestFirstSearch":
            table[0][startPos] = [0, null, "up", 0]; // 設定起始點
            unvisited[0].push(startPos); // 設定目前最短路徑的queue
            end = [endPos];
            break;
        case "ConvergentSwarm":
            table[0][startPos] = [0, null, "right", 0]; // 設定起始點
            unvisited[0].push(startPos); // 設定目前最短路徑的queue
            end = [endPos];
            break;
        case "BidirectionSwarm":
            table[0][startPos] = [0, null, "right", 0]; // 設定起始點
            table[1][endPos] = [0, null, "left", 0]; // 設定起始點
            unvisited[0].push(startPos); // 設定目前最短路徑的queue
            unvisited[1].push(endPos); // 設定目前最短路徑的queue
            end = [endPos, startPos];
            break;
        default:
            break;
    }

    /* 演算法開始 */
    var curShortestPath = []
    var which = 1; // 0 for start, 1 for end
    var actualEnd = null;
    var isFoundEnd = false;
    var visited = [new Set(), new Set()]; // [0]: start, [1]: end

    while (unvisited[0].length > 0 || unvisited[1].length > 0) {

        // 選要走哪邊
        if (unvisited[0].length > 0 && unvisited[1].length > 0) {
            which = (which + 1) % 2;
        } else if (unvisited[0].length > 0) {
            which = 0;
        } else if (unvisited[1].length > 0) {
            which = 1;
        }

        // 1. 選出當前最小路徑的點
        var curPos = null;
        curPos = GetClosestNode(table[which], 3, unvisited[which], end[which]);

        if (curPos in position.wall) {
            continue; // 牆壁不走
        }

        // 2. 計算相鄰且尚未走過的點
        var up = curPos[0] - 1 >= 0 ? [curPos[0] - 1, curPos[1]] : null;
        var right = curPos[1] + 1 < position.colSize ? [curPos[0], curPos[1] + 1] : null;
        var down = curPos[0] + 1 < position.rowSize ? [curPos[0] + 1, curPos[1]] : null;
        var left = curPos[1] - 1 >= 0 ? [curPos[0], curPos[1] - 1] : null;

        // eslint-disable-next-line
        [up, right, down, left].forEach((nextPos, idx) => {
            if (!nextPos || nextPos in position.wall) return; // 若超過邊界 or 是牆壁

            // 走過的也要更新，只是不會加入unvisited，因此不會在上面continue
            var total = null;
            var weight = (nextPos in position.weight ? position.weightValue : 0);
            switch (whichAlgo) {
                case "Dijkstra":
                    // 策略為：只考慮 目前總分+權重+轉向分數
                    total = table[which][curPos][0] + weight + GetScore(table[which][curPos][2], idx);
                    break;
                case "Astar":
                    // 策略為：只考慮 目前總分+權重+轉向分數
                    total = table[which][curPos][0] + weight + GetScore(table[which][curPos][2], idx);
                    break;
                case "Swarm":
                    // 策略為：只考慮 目前總分+權重+轉向分數+估算
                    total = table[which][curPos][0] + weight + GetScore(table[which][curPos][2], idx) + Math.pow(GetHeuristic(nextPos, end[which]), 2);
                    break;
                case "GreedyBestFirstSearch":
                    // 策略為：只考慮 估值+轉向分數
                    total = table[which][curPos][0] + GetScore(table[which][nextPos][2], idx);
                    break;
                case "ConvergentSwarm":
                    // 策略為：只考慮 目前總分+權重+轉向分數+估算
                    total = table[which][curPos][0] + (weight + GetScore(table[which][curPos][2], idx)) * Math.pow(GetHeuristic(nextPos, end[which]), 7);
                    break;
                case "BidirectionSwarm":
                    // 策略為：只考慮 目前總分+權重+轉向分數+估算
                    total = table[which][curPos][0] + weight + GetScore(table[which][curPos][2], idx) + Math.pow(GetHeuristic(nextPos, end[which]), 2);
                    break;
                default:
                    break;
            }

            if (total <= table[which][nextPos][0]) {
                table[which][nextPos][0] = total;
                table[which][nextPos][1] = curPos;
                switch (idx) {
                    case 0:
                        if (which === 0) table[which][nextPos][2] = "up";
                        else table[which][nextPos][2] = "down";
                        break;
                    case 1:
                        if (which === 0) table[which][nextPos][2] = "right";
                        else table[which][nextPos][2] = "left";
                        break;
                    case 2:
                        if (which === 0) table[which][nextPos][2] = "down";
                        else table[which][nextPos][2] = "up";
                        break;
                    case 3:
                        if (which === 0) table[which][nextPos][2] = "left";
                        else table[which][nextPos][2] = "right";
                        break;
                    default:
                        break;
                }

                switch (whichAlgo) {
                    case "Dijkstra":
                        table[which][nextPos][3] = table[which][nextPos][0];
                        break;
                    case "Astar":
                        table[which][nextPos][3] = table[which][nextPos][0] + GetHeuristic(nextPos, endPos);
                        break;
                    case "Swarm":
                        table[which][nextPos][3] = table[which][nextPos][0];
                        break;
                    case "GreedyBestFirstSearch":
                        table[which][nextPos][3] = table[which][nextPos][0] + GetScore(table[which][nextPos][2], idx);
                        break;
                    case "ConvergentSwarm":
                        table[which][nextPos][3] = table[which][nextPos][0];
                        break;
                    case "BidirectionSwarm":
                        table[which][nextPos][3] = table[which][nextPos][0];
                        break;
                    default:
                        break;
                }
            }

            // 加入尚未走過的點 
            if (!visited[which].has(curPos.toString())) {
                unvisited[which].push(nextPos);
            }

            // 若找尋過程有對方搜尋到的，則更新actualEnd
            if (whichAlgo === "BidirectionSwarm") {
                if (visited[(which + 1) % 2].has(curPos.toString())) {
                    if (actualEnd === null) {
                        actualEnd = curPos;
                        var tmp = actualEnd;
                        while (tmp) { // 因為找到start時的previous vertex為null
                            if (which === 0) {
                                curShortestPath.unshift(tmp); // bidirection 左右兩邊要插入的方式相反
                                retDirection.unshift(table[which][tmp][2]);
                            } else {
                                curShortestPath.push(tmp);
                                retDirection.push(table[which][tmp][2]);
                            }
                            tmp = table[which][tmp][1];
                        }
                        if (which === 1) {
                            // end 奇數個: actualEnd下面會在計算一次，而因為要保證「過彎處為上一個的方向」，故下面不計算actualEnd
                        } else {
                            // start 偶數個: actualEnd下面會在計算一次，因此去除
                            curShortestPath.splice(curShortestPath.length - 1, 1);
                            retDirection.splice(retDirection.length - 1, 1);
                        }
                    } else {
                        isFoundEnd = true;
                    }
                }
            } else {
                if (nextPos.toString() === endPos.toString()) { // 看是否找到終點了
                    actualEnd = nextPos;
                    isFoundEnd = true;

                    // 因為是找四周，所以找到end之後，要把end資訊加入其中
                    table[which][actualEnd][1] = curPos;
                }
            }
        })

        if (!visited[which].has(curPos.toString())) {
            searchPath.push([curPos]); // 加入搜尋範圍
            visited[which].add(curPos.toString()); // 加入已走過
        }

        if (isFoundEnd) { // 找到終點跳出
            searchPath.push([actualEnd]); // 先加入258行，再加入終點
            break;
        }
    }

    // 若有找到終點再判斷最小路徑
    if (isFoundEnd) {
        curPos = actualEnd;
        if (whichAlgo !== "BidirectionSwarm") which = 1;
        while (curPos) { // 因為找到start時的previous vertex為null
            if (which === 1) {
                if (whichAlgo === "BidirectionSwarm") {
                    if (curPos.toString() !== actualEnd.toString()) { // 因為要保證「過彎處為上一個的方向」，故下面不計算actualEnd
                        curShortestPath.unshift(curPos); // bidirection 左右兩邊要插入的方式相反
                        retDirection.unshift(table[(which + 1) % 2][curPos][2]);
                    }
                } else {
                    curShortestPath.unshift(curPos); // bidirection 左右兩邊要插入的方式相反
                    retDirection.unshift(table[(which + 1) % 2][curPos][2]);
                }
            } else {
                curShortestPath.push(curPos);
                retDirection.push(table[(which + 1) % 2][curPos][2]);
            }
            curPos = table[(which + 1) % 2][curPos][1];
        }
    }

    // 因為是找四周圍，只更新是周圍，所以頭的資訊不會被更新，因此去除頭且延伸目前的第一個位置即可
    retDirection.splice(0, 1);
    retDirection.unshift(retDirection[0]);
    // BidirectionSwarm 有兩個頭，所以尾巴的頭也要做一次
    if (whichAlgo === "BidirectionSwarm") {
        retDirection.unshift(retDirection[0]);
        retDirection.splice(retDirection.length - 1, 1);
    }
    return curShortestPath;
}

// 推測值：用距離來表示，因為是棋盤，所以改成最短距離幾格
function GetHeuristic(startPos, endPos) {
    return Math.abs(endPos[0] - startPos[0]) + Math.abs(endPos[1] - startPos[1]);
}

// 找出分數最小點，策略：考慮所有的分數 目前總分+權重+轉向分數+估值
function GetClosestNode(table, strategy, unvisited, endPos) {
    let retPos, retIndex;
    for (var i = 0; i < unvisited.length; i++) {
        if (!retPos || table[retPos][strategy] > table[unvisited[i]][strategy]) {
            retPos = unvisited[i];
            retIndex = i;

            // 若相等則取得 估值小的（距離目標近的）
        } else if (table[retPos][strategy] === table[unvisited[i]][strategy]) {
            if (GetHeuristic(retPos, endPos) > GetHeuristic(unvisited[i], endPos)) {
                retPos = unvisited[i];
                retIndex = i;
            }
        }
    }

    unvisited.splice(retIndex, 1);
    return retPos;
}

// 取得轉向分數
// 考慮轉向分數是為了只搜尋一條線，如果沒有這個分數，則搜尋會變成三條線，因為１點的前下上 距離終點 的估值可能相同，所以會走三條路
function GetScore(direction, index) {
    var score = 0;
    switch (direction) {
        case "up":
            switch (index) {
                case 0:
                    score = 1;
                    break;
                case 1:
                    score = 2;
                    break;
                case 2:
                    score = 3;
                    break;
                case 3:
                    score = 2;
                    break;
                default:
                    break;
            }
            break;
        case "right":
            switch (index) {
                case 0:
                    score = 2;
                    break;
                case 1:
                    score = 1;
                    break;
                case 2:
                    score = 2;
                    break;
                case 3:
                    score = 3;
                    break;
                default:
                    break;
            }
            break;
        case "down":
            switch (index) {
                case 0:
                    score = 3;
                    break;
                case 1:
                    score = 2;
                    break;
                case 2:
                    score = 1;
                    break;
                case 3:
                    score = 2;
                    break;
                default:
                    break;
            }
            break;
        case "left":
            switch (index) {
                case 0:
                    score = 2;
                    break;
                case 1:
                    score = 3;
                    break;
                case 2:
                    score = 2;
                    break;
                case 3:
                    score = 1;
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }
    return score;
}

export default Dijkstra_old;