import { position } from '../../Core';
import { CreateAround } from './Core';
import { Random, RandomEven } from './Core';

const direction = {
    horizontal: 0,
    vertical: 1
}

function RecursiveDivision() {
    var walls = CreateAround();
    var weights = [];
    DoRecursiveDivision(0, 0, position.colSize, position.rowSize, walls);
    return [walls, weights];
}

// walls 為 pass-by-reference，動態加入生成牆壁
// x, y, width, height均會包含 牆壁，要生成的範圍會在這個牆壁內
// 為了保證道路暢通 且 周圍要都是牆壁，因此已經設計成棋盤長寬均為奇數，width, height也必為為奇數
// 所以x, y必為偶數也就是牆壁必為偶數，則道路必為奇數
// 因此 就能保證沒有死路，因為選擇牆壁的話（偶數），絕對不會擋到路（奇數）
function DoRecursiveDivision(x, y, width, height, walls) {
    // 而且為了保證道路暢通，兩個牆壁+一個空白才會形成一個道路
    // 因此長跟寬必須至少大於3
    if (width < 4 || height < 4) {
        return;
    }

    // 選擇切割方向：挑選短的那邊，一樣就random
    var curDirection = null;
    if (width < height) curDirection = direction.horizontal;
    else if (width > height) curDirection = direction.vertical;
    else curDirection = Random(2);

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
            }
        }

        // 跑 x,y,width 且 height變成了剛剛選的高-x0（跑上面）
        DoRecursiveDivision(x, y, width, randomX - x, walls);

        // 跑 新x, y, width 且 height變成了 目前總高 - 剛剛選的高度(跑下面)
        DoRecursiveDivision(randomX, y, width, height - (randomX - x), walls);
    } else {
        // 垂直雷同
        var randomY = y + 2 + RandomEven(width - 4);
        door = x + 1 + RandomEven(height - 3);

        for (var _x = x; _x < x + height; _x++) {
            if (_x !== door) {
                walls.push([_x, randomY]);
            }
        }

        DoRecursiveDivision(x, y, randomY - y, height, walls);
        DoRecursiveDivision(x, randomY, width - (randomY - y), height, walls);
    }
}

export default RecursiveDivision;