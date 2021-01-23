import { position } from '../../Core';
import { Random, RandomEven } from './Core';

// 從一點出發找四周圍最小的權重
// 但隨機迷宮可以改成
// 從一點出發，往四周圍前進，並只去隨機找有走過的點
function Prim() {
    var walls = [];
    var weights = [];


    // Random Pick a position
    // 取偶數，因為牆壁長度為３，棋盤長寬為奇數，所以取偶數才能伸展到四邊
    var startNode = [2 + RandomEven(position.rowSize - 4), 2 + RandomEven(position.colSize - 4)];
    var visited = new Set();
    var queue = [startNode];

    while (queue.length > 0) {
        var randomIndex = RandomEven(queue.length); // random pick a node
        var node = queue[randomIndex];

        var availableDirection = [];

        if (node[0] - 2 >= 0 && !visited.has([node[0] - 2, node[1]].toString())) {
            availableDirection.push([[node[0] - 2, node[1]], [node[0] - 1, node[1]]]);
        }
        if (node[1] + 2 < position.colSize && !visited.has([node[0], node[1] + 2].toString())) {
            availableDirection.push([[node[0], node[1] + 2], [node[0], node[1] + 1]]);
        }
        if (node[0] + 2 < position.rowSize && !visited.has([node[0] + 2, node[1]].toString())) {
            availableDirection.push([[node[0] + 2, node[1]], [node[0] + 1, node[1]]]);
        }
        if (node[1] - 2 >= 0 && !visited.has([node[0], node[1] - 2].toString())) {
            availableDirection.push([[node[0], node[1] - 2], [node[0], node[1] - 1]]);
        }

        // 若四個方位都沒有可能，再把考慮點去掉
        if (availableDirection.length === 0) {
            queue.splice(randomIndex, 1);
            continue;
        }

        // 隨機挑一個方位
        randomIndex = Random(availableDirection.length);
        node = availableDirection[randomIndex];

        // 加入此方位的牆壁
        walls.push(node[1]);
        walls.push(node[0]);

        // 加入已走過的點
        visited.add(node[0].toString());

        // 加入考慮點
        queue.push(node[0]);
    }
    return [walls, weights];
}

export default Prim;