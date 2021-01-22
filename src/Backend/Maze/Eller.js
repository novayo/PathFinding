import { position } from '../../Core';
import { CreateAround } from './Core';

function Eller() {
    var weights = [];
    var walls = CreateAround();
    /*
    道路從第二層開始，牆壁從第一層開始
    因為預設第一層的道路都是暢通的（周圍圍起來，要留出一格道路），故道路要+1
    之後的每層每次抓取右邊兩格（一個道路一個牆壁）
    若牆壁建立，則看「已經建立過道路了沒」（保證每個set都至少有一個建立道路（Eller））
        若已經建立了，則看道路是否要建立
            要建立=沒事
            不建立=道路下方建立一個牆壁
        若沒有建立，則這個要建立道路（也就是不要在道路下方建立一格牆壁）
            = 沒事
        「已經建立過道路了沒」 = false （重新計算）
    若牆壁不建立，則
        看道路是否要建立
            要建立=「已經建立過道路了沒=True」
            不建立=道路下方建立一個牆壁
    
    edge長度為2
    */
    // 要保證最下方跟最右方是暢通的，因為周圍有框起來
    for (let i = 1; i < position.rowSize - 3; i += 2) {
        var haveBuildedPath = false;
        for (let j = 1; j < position.colSize - 3; j += 2) {
            var buildWall = 1 === Random(2) ? true : false;
            var buildPath = 1 === Random(2) ? true : false;

            // 牆壁，看是否要建立牆壁
            if (buildWall) {
                walls.push([i, j + 1]);
                walls.push([i + 1, j + 1]);

                if (haveBuildedPath) {
                    if (!buildPath) {
                        walls.push([i + 1, j]);
                        walls.push([i + 1, j + 1]);
                    }
                }
                haveBuildedPath = false;
            } else {
                // 為了保持迷宮的感覺，牆壁不能太少
                // 因此改成每個set只能有一個開口，且開口大小為1
                if (buildPath && !haveBuildedPath) {
                    haveBuildedPath = true;
                    walls.push([i + 1, j + 1]); // 開口大小為1，所以開口的右方也要是牆壁
                } else {
                    walls.push([i + 1, j]);
                    walls.push([i + 1, j + 1]);
                }
            }
        }
    }

    return [walls, weights];
}

function Random(n) {
    return Math.floor(Math.random() * n);
}

export default Eller;