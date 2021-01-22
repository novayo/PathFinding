import { position } from '../../Core';

// Kruskal 雖然是要找最小權重，但是maze的權重都是相同的
// 因此此演算法就變成，隨機找一個，跟周圍相連，且不要形成cycle
// 這種特性就可以用來建立隨機迷宮的牆壁
// 但不會保證活路
function Kruskal() {
    var wallSet = new Set();
    var walls = [];
    var weights = [];

    // 建立parent與rank陣列 來判斷是否有cycle及union
    var parent = {};
    var rank = {};
    for (let i = 0; i < position.rowSize; i++) {
        for (let j = 0; j < position.colSize; j++) {
            parent[[i, j]] = [i, j];// 每個人的root一開始都是自己
            rank[[i, j]] = 0;// 每個人的rank一開始都是0
        }
    }

    // 長度為三，因為只能在偶數位置建立牆壁，所以長度三才能與其他牆壁相連
    // 用佔比率來終止迴圈，0.51是經驗法則
    while (wallSet.size / (position.rowSize * position.colSize) < 0.51) {

        // 取 產生偶數位置起點
        let x = [RandomEven(position.rowSize), RandomEven(position.colSize)];
        let x1 = null;
        let x2 = null;
        let xHead = null;
        let yHead = null;
        let face = Random(4);
        switch (face) {
            case 0: // 走上
                if (x[0] - 2 < 0) continue;
                x1 = [x[0] - 1, x[1]];
                x2 = [x[0] - 2, x[1]];
                xHead = FindRoot(parent, x);
                yHead = FindRoot(parent, x2);
                break;
            case 1: // 走右
                if (x[1] + 2 >= position.colSize) continue;
                x1 = [x[0], x[1] + 1];
                x2 = [x[0], x[1] + 2];
                xHead = FindRoot(parent, x);
                yHead = FindRoot(parent, x2);
                break;
            case 2:
                if (x[0] + 2 >= position.rowSize) continue;
                x1 = [x[0] + 1, x[1]];
                x2 = [x[0] + 2, x[1]];
                xHead = FindRoot(parent, x);
                yHead = FindRoot(parent, x2);
                break;
            case 3:
                if (x[1] - 2 < 0) continue;
                x1 = [x[0], x[1] - 1];
                x2 = [x[0], x[1] - 2];
                xHead = FindRoot(parent, x);
                yHead = FindRoot(parent, x2);
                break;
            default:
                return [];
        }


        if (xHead !== yHead) {
            walls.push(x);
            walls.push(x1);
            walls.push(x2);
            wallSet.add(x.toString());
            wallSet.add(x1.toString());
            wallSet.add(x2.toString());
            Union(parent, rank, x, x2);
        }
    }

    return [walls, weights];
}

/* Disjoint Set */
// parentArray => index的爸爸在parentArray[index] = parentIndex
// index => 目前是誰
function FindRoot(parentArray, index) {
    if (parentArray[index] !== index) {
        // 記得邊找邊更新
        parentArray[index] = FindRoot(parentArray, parentArray[index]);
    }
    return parentArray[index];
}


// parentArray => index的爸爸在parentArray[index] = parentIndex
// rankArray => 每個點的階層是多少，數字大表示越接近root
// index1, index3 => 哪兩個點要union
function Union(parentArray, rankArray, index1, index3) {
    // 要用頭去union
    index1 = FindRoot(parentArray, index1);
    index3 = FindRoot(parentArray, index3);

    if (index1 === index3) {
        return;
    }

    // 如果rank3 > rank1 => index1的爸爸是index3
    if (rankArray[index1] < rankArray[index3]) {
        parentArray[index1] = index3;

        // 如果rank3 < rank1 => index3的爸爸是index1
    } else if (rankArray[index1] > rankArray[index3]) {
        parentArray[index3] = index1;

        // 如果rank3 === rank1 => 選一個來組合，並讓爸爸的RANK+1
    } else {
        parentArray[index3] = index1;
        rankArray[index1] += 1;
    }
}

function Random(n) {
    return Math.floor(Math.random() * n);
}

function RandomEven(n) {
    return Math.floor(Math.random() * n / 2) * 2;
}

export default Kruskal;