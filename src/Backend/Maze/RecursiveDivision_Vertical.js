import { position } from '../../Core';
import { CreateAround } from './Core';

const direction = {
    horizontal: 0,
    vertical: 1
}

function RecursiveDivision_Vertical() {
    var walls = CreateAround();
    var weights = [];

    // true代表水平，false代表垂直
    // 改用最後一個參數選定要跑哪個方向
    DoRecursiveDivision(0, 0, position.colSize, position.rowSize, walls, false);
    return [walls, weights];
}

// 與正常版的差別在於，選擇切水平或是垂直的條件不同
// 垂直偏移（vertical skew）：表示優先跑左邊，所以第一個遞迴規定跑垂直，第二個規定跑水平
// boolDirection=true代表水平，false代表垂直
function DoRecursiveDivision(x, y, width, height, walls, boolDirection) {
    // 而且為了保證道路暢通，兩個牆壁+一個空白才會形成一個道路
    // 因此長跟寬必須至少大於3
    if (width < 4 || height < 4) {
        return;
    }

    // 選擇切割方向：挑選短的那邊，一樣就random
    var curDirection = null;
    if (boolDirection) curDirection = direction.horizontal;
    else curDirection = direction.vertical;

    var door;
    if (curDirection === direction.horizontal) {
        // 假設現在height=11，表示x=x0跟x=10的那整條都是牆壁
        // 則 x建立牆壁的範圍為 2~8 (牆壁跟牆壁中間要留一條路)

        // 因此x要x0+2，而剩下的random範圍為0~6且只能為偶數
        var randomX = x + 2 + Random_0_to_n(height - 4);

        // 假設width = 9，表示y=y0跟y=8的那整條都是牆壁
        // 開路的範圍為 y0+ 1~7（但開路必為奇數），而剩下的random範圍為0~6且只能為偶數
        door = y + 1 + Random_0_to_n(width - 3);

        // 建立牆壁，範圍從 y0~y0+width
        for (var _y = y; _y < y + width; _y++) {
            if (_y !== door) {
                walls.push([randomX, _y]);
            }
        }

        // 跑 x,y,width 且 height變成了剛剛選的高-x0（跑上面）
        DoRecursiveDivision(x, y, width, randomX - x, walls, false);  // 第一個規定跑垂直

        // 跑 新x, y, width 且 height變成了 目前總高 - 剛剛選的高度(跑下面)
        DoRecursiveDivision(randomX, y, width, height - (randomX - x), walls, true); // 第二個規定跑水平
    } else {
        // 垂直雷同
        var randomY = y + 2 + Random_0_to_n(width - 4);
        door = x + 1 + Random_0_to_n(height - 3);

        for (var _x = x; _x < x + height; _x++) {
            if (_x !== door) {
                walls.push([_x, randomY]);
            }
        }

        DoRecursiveDivision(x, y, randomY - y, height, walls, false); // 第一個規定跑垂直
        DoRecursiveDivision(x, randomY, width - (randomY - y), height, walls, true); // 第二個規定跑水平
    }
}

// 只回傳偶數
function Random_0_to_n(n) {
    return Math.floor(Math.random() * n / 2) * 2;
}

export default RecursiveDivision_Vertical;