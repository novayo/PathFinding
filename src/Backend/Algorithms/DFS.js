import { position } from '../../Core';

function DFS(startCallback, speed) {
    var retSearchPath = [];
    var retBombPath = [];
    var retShortestPath = [];
    var retDirection = [];

    // dfs 需bottom-up去找最短路徑
    function DoDFS(x, y, endPos, visited, startPath, retShortestPath, retDirection) {
        if (x < 0 || y < 0 || x >= position.rowSize || y >= position.colSize || [x, y] in position.wall || visited.has([x, y].toString())) {
            return false;
        }

        visited.add([x, y].toString());
        startPath.push([[x, y]]); // 每一層都是一個

        if ([x, y].toString() === endPos.toString()) {
            retShortestPath.unshift([x, y]);
            return true;
        }


        if (DoDFS(x - 1, y, endPos, visited, startPath, retShortestPath, retDirection)) {// up
            retShortestPath.unshift([x, y]);
            retDirection.unshift("up");
            return true;
        }
        if (DoDFS(x, y + 1, endPos, visited, startPath, retShortestPath, retDirection)) {// right
            retShortestPath.unshift([x, y]);
            retDirection.unshift("right");
            return true;
        }
        if (DoDFS(x + 1, y, endPos, visited, startPath, retShortestPath, retDirection)) {// down
            retShortestPath.unshift([x, y]);
            retDirection.unshift("down");
            return true;
        }
        if (DoDFS(x, y - 1, endPos, visited, startPath, retShortestPath, retDirection)) {// left
            retShortestPath.unshift([x, y]);
            retDirection.unshift("left");
            return true;
        }
    }
    const visited = new Set();
    var start = position.start;
    if (position.bomb) {
        DoDFS(start[0], start[1], position.bomb, visited, retSearchPath, retShortestPath, retDirection);
        start = position.bomb;
        visited.clear();

        // 有找到最小路徑才繼續
        if (retShortestPath.length > 0) {
            // bottom up 時 尾巴不確定方向，故現在加上方向
            retShortestPath.splice(retShortestPath.length - 1, 1); // 去除bomb重複
            var tmp = []; // 因為unshift，所以先暫存
            var tmp2 = [];
            DoDFS(start[0], start[1], position.end, visited, retBombPath, tmp, tmp2);
            retShortestPath = retShortestPath.concat(tmp);
            retDirection = retDirection.concat(tmp2);
        }
    } else {
        DoDFS(start[0], start[1], position.end, visited, retBombPath, retShortestPath, retDirection);
    }

    // bottom up 時 尾巴不確定方向，故現在加上方向
    retDirection.unshift(retDirection[0]); // 改變方向找法，往前推移一格
    startCallback(retSearchPath, retShortestPath, retDirection, speed, retBombPath);
}

export default DFS;