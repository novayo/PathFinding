import { position } from '../../Core';

function DFS(startCallback, speed) {
    // retSearchPath 會等於 retShortestPath
    var retSearchPath = [];
    var retBombPath = [];
    var retShortestPath = [];

    function DoDFS(x, y, endPos, visited, startPath, endPath) {
        if (x < 0 || y < 0 || x >= position.rowSize || y >= position.colSize || [x, y] in position.wall || visited.has([x, y].toString())) {
            return false;
        }

        visited.add([x, y].toString());
        startPath.push([[x, y]]);
        endPath.push([x, y]);

        if ([x, y].toString() === endPos.toString()) return true;


        if (DoDFS(x - 1, y, endPos, visited, startPath, endPath)) {// up
            return true;
        }
        if (DoDFS(x, y + 1, endPos, visited, startPath, endPath)) {// right
            return true;
        }
        if (DoDFS(x + 1, y, endPos, visited, startPath, endPath)) {// down
            return true;
        }
        if (DoDFS(x, y - 1, endPos, visited, startPath, endPath)) {// left
            return true;
        }
    }
    const visited = new Set();
    var start = position.start;
    var end = position.end;
    if (position.bomb !== false) {
        DoDFS(start[0], start[1], position.bomb, visited, retSearchPath, retShortestPath);
        start = position.bomb;
        visited.clear();
    }
    DoDFS(start[0], start[1], end, visited, retBombPath, retShortestPath);

    startCallback(retSearchPath, retShortestPath, speed, retBombPath);
}

export default DFS;