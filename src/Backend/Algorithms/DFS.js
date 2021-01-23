import { position } from '../../Core';

function DFS(startCallback, speed) {
    var retSearchPath = [];
    var retBombPath = [];
    var retShortestPath = [];

    // dfs 需bottom-up去找最短路徑
    function DoDFS(x, y, endPos, visited, startPath, retShortestPath) {
        if (x < 0 || y < 0 || x >= position.rowSize || y >= position.colSize || [x, y] in position.wall || visited.has([x, y].toString())) {
            return false;
        }

        visited.add([x, y].toString());
        startPath.push([[x, y]]); // 每一層都是一個

        if ([x, y].toString() === endPos.toString()) {
            retShortestPath.unshift([x, y]);
            return true;
        }


        if (DoDFS(x - 1, y, endPos, visited, startPath, retShortestPath)) {// up
            retShortestPath.unshift([x, y]);
            return true;
        }
        if (DoDFS(x, y + 1, endPos, visited, startPath, retShortestPath)) {// right
            retShortestPath.unshift([x, y]);
            return true;
        }
        if (DoDFS(x + 1, y, endPos, visited, startPath, retShortestPath)) {// down
            retShortestPath.unshift([x, y]);
            return true;
        }
        if (DoDFS(x, y - 1, endPos, visited, startPath, retShortestPath)) {// left
            retShortestPath.unshift([x, y]);
            return true;
        }
    }
    const visited = new Set();
    var start = position.start;
    if (position.bomb) {
        DoDFS(start[0], start[1], position.bomb, visited, retSearchPath, retShortestPath);
        start = position.bomb;
        visited.clear();

        // 有找到最小路徑才繼續
        if (retShortestPath.length > 0) {
            var tmp = [];
            DoDFS(start[0], start[1], position.end, visited, retBombPath, tmp);
            retShortestPath = retShortestPath.concat(tmp);
        }
    } else {
        DoDFS(start[0], start[1], position.end, visited, retBombPath, retShortestPath);
    }
    startCallback(retSearchPath, retShortestPath, speed, retBombPath);
}

export default DFS;