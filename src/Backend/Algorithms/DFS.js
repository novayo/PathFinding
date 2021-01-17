import { position } from '../../Core';
import Distance from '../../Core/Distance';

function DFS(startCallback, speed) {
    var retSearchPath = [];
    var retBombPath = [];
    var retShortestPath = [];
    // retSearchPath 會等於 retShortestPath

    function DoDFS(x, y, endPos, visited, startPath, distance, level) {
        if (x < 0 || y < 0 || x >= position.rowSize || y >= position.colSize || [x, y] in position.wall || visited.has([x, y].toString())) {
            return false;
        }

        visited.add([x, y].toString());
        startPath.push([[x, y]]); // 每一層都是一個
        distance.set([x, y], level);

        if ([x, y].toString() === endPos.toString()) return true;


        if (DoDFS(x - 1, y, endPos, visited, startPath, distance, level + 1)) {// up
            return true;
        }
        if (DoDFS(x, y + 1, endPos, visited, startPath, distance, level + 1)) {// right
            return true;
        }
        if (DoDFS(x + 1, y, endPos, visited, startPath, distance, level + 1)) {// down
            return true;
        }
        if (DoDFS(x, y - 1, endPos, visited, startPath, distance, level + 1)) {// left
            return true;
        }
    }
    const visited = new Set();
    const distance = new Distance();
    var start = position.start;
    if (position.bomb) {
        DoDFS(start[0], start[1], position.bomb, visited, retSearchPath, distance, 0);
        start = position.bomb;
        retShortestPath = retShortestPath.concat(distance.getShortestPath(position.bomb));
        distance.clear();
        visited.clear();

        // 有找到最小路徑才繼續
        if (retShortestPath.length > 0) {
            DoDFS(start[0], start[1], position.end, visited, retBombPath, distance, 0);
            retShortestPath = retShortestPath.concat(distance.getShortestPath(position.end));
        }
    } else {
        DoDFS(start[0], start[1], position.end, visited, retBombPath, distance, 0);
        retShortestPath = retShortestPath.concat(distance.getShortestPath(position.end));
    }
    startCallback(retSearchPath, retShortestPath, speed, retBombPath);
}

export default DFS;