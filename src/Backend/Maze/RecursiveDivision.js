import { position } from '../../Core';
import { CreateAround, Random, RandomEven, IndexOf } from './Core';

const direction = {
    horizontal: 0,
    vertical: 1
}

function RecursiveDivision(whichAlgo) {
    var wallSet = new Set();
    var walls = CreateAround(wallSet);
    var weights = [];

    // true代表水平，false代表垂直
    // 改用最後一個參數選定要跑哪個方向
    switch (whichAlgo) {
        case "RecursiveDivision":
            DoRecursiveDivision(0, 0, position.colSize, position.rowSize, wallSet, walls);
            break;
        case "RecursiveDivision_Vertical":
            DoRecursiveDivision(0, 0, position.colSize, position.rowSize, wallSet, walls, true);
            break;
        case "RecursiveDivision_Horizontal":
            DoRecursiveDivision(0, 0, position.colSize, position.rowSize, wallSet, walls, false);
            break;
        default:
            break;
    }

    // 建立牆壁時，因為不會考慮特殊node，所以還是有機會在node周圍建立起牆壁，而形成死路 https://i.imgur.com/r6gYt39.png
    // 因此跑完之後，去看特殊node是否四周圍死路
    // 若為死路，則周圍隨機去除一個合法的wall即可
    var specialNodes = [position.start, position.bomb, position.end];
    for (let i = 0; i < specialNodes.length; i++) {
        let curPos = specialNodes[i];

        if (!curPos) continue; // 如果特殊node不存在，就不判斷

        let up = curPos[0] - 1 >= 0 ? [curPos[0] - 1, curPos[1]] : null;
        let right = curPos[1] + 1 < position.colSize ? [curPos[0], curPos[1] + 1] : null;
        let down = curPos[0] + 1 < position.rowSize ? [curPos[0] + 1, curPos[1]] : null;
        let left = curPos[1] - 1 >= 0 ? [curPos[0], curPos[1] - 1] : null;

        let validWall = [];
        let blockDirection = 0;
        // eslint-disable-next-line
        [up, right, down, left].forEach(nextPos => {
            if (nextPos === null) {
                blockDirection++;
            } else if (wallSet.has(nextPos.toString())) {
                validWall.push(nextPos);
                blockDirection++;
            }
        })
        if (blockDirection === 4) {
            let removedWallIndex = Random(validWall.length);
            walls.splice(IndexOf(walls, validWall[removedWallIndex]), 1);
        }
    }

    return [walls, weights];
}

// 與正常版的差別在於，選擇切水平或是垂直的條件不同
// 水平偏移（horizontal skew）：表示優先跑左邊，所以第一個遞迴規定跑水平，第二個規定跑垂直
function DoRecursiveDivision(x, y, width, height, wallSet, walls, boolDirection = null) {
    // 而且為了保證道路暢通，兩個牆壁+一個空白才會形成一個道路
    // 因此長跟寬必須至少大於3
    if (width < 4 || height < 4) {
        return;
    }

    // 選擇切割方向：挑選短的那邊，一樣就random
    var curDirection = null;
    if (boolDirection === null) {
        if (width < height) curDirection = direction.horizontal;
        else if (width > height) curDirection = direction.vertical;
        else curDirection = Random(2);
    } else {
        if (boolDirection) {
            curDirection = direction.vertical;
        }
        else {
            curDirection = direction.horizontal;
        }
    }


    var door;
    if (curDirection === direction.horizontal) {
        // 假設現在height=11，表示x=x0跟x=10的那整條都是牆壁
        // 則 x建立牆壁的範圍為 2~8 (牆壁跟牆壁中間要留一條路)

        // 因此x要x0+2，而剩下的random範圍為0~6且只能為偶數
        var randomX = x + 2 + RandomEven(height - 4);

        // 假設width = 9，表示y=y0跟y=8的那整條都是牆壁
        // 開路的範圍為 y0+ 1~7（但開路必為奇數），而剩下的random範圍為0~6且只能為偶數
        door = y + 1 + RandomEven(width - 3);

        // 建立牆壁，範圍從 y0~y0+width
        for (var _y = y; _y < y + width; _y++) {
            if (_y !== door) {
                walls.push([randomX, _y]);
                wallSet.add([randomX, _y].toString());
            }
        }

        // 跑 x,y,width 且 height變成了剛剛選的高-x0（跑上面）
        DoRecursiveDivision(x, y, width, randomX - x, wallSet, walls, boolDirection); // 第一個規定跑指定方向

        // 跑 新x, y, width 且 height變成了 目前總高 - 剛剛選的高度(跑下面)
        DoRecursiveDivision(randomX, y, width, height - (randomX - x), wallSet, walls, !boolDirection); // 第二個規定跑(!指定方向)
    } else {
        // 垂直雷同
        var randomY = y + 2 + RandomEven(width - 4);
        door = x + 1 + RandomEven(height - 3);

        for (var _x = x; _x < x + height; _x++) {
            if (_x !== door) {
                walls.push([_x, randomY]);
                wallSet.add([_x, randomY].toString());
            }
        }

        DoRecursiveDivision(x, y, randomY - y, height, wallSet, walls, boolDirection); // 第一個規定跑指定方向
        DoRecursiveDivision(x, randomY, width - (randomY - y), height, wallSet, walls, !boolDirection); // 第二個規定跑(!指定方向)
    }
}

export default RecursiveDivision;