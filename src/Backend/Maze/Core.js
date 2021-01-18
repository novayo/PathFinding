import { position } from '../../Core';

// 取得四周圍
export const CreateAround = (wallSet = new Set()) => {
    var walls = [];
    var x = 0;
    var y = 0;

    // 取得外圍
    var tmp = position.colSize - 1;
    for (y = 0; y <= tmp; y++) {
        walls.push([0, y]);
        walls.push([0, tmp]);
        wallSet.add([0, y].toString());
        wallSet.add([0, tmp].toString());
        tmp--;
    }

    for (x = 0; x < position.rowSize; x++) {
        walls.push([x, 0]);
        walls.push([x, position.colSize - 1]);
        wallSet.add([x, 0].toString());
        wallSet.add([x, position.colSize - 1].toString());

    }

    tmp = position.colSize - 1;
    for (y = 0; y <= tmp; y++) {
        walls.push([position.rowSize - 1, y]);
        walls.push([position.rowSize - 1, tmp]);
        wallSet.add([position.rowSize - 1, y].toString());
        wallSet.add([position.rowSize - 1, tmp].toString());
        tmp--;
    }
    return walls;
}