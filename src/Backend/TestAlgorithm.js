export const TestAlgorithm = () => {
    const [search, path, speed] = [[[[1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2]],
    [[1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3]],
    [[1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4]],
    [[1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5]],
    [[1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6]]]
        ,
    [[1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2]]
        ,
        50
    ]

    return [search, path, speed];
}

// 開發中，有待討論
export const DFS = () => {
    const startPos = [0, 0];
    const bombPos = [10, 10];
    const endPos = [20, 20];
    const walls = []; // get walls

    let wallSet = new Set(walls);
    let search = [];
    let path = [];

    function doDfs(startPos, bombPos, endPos, wallSet, isFoundBomb) {

        if (isFoundBomb) {
            if (startPos === endPos) {
                return
            }
        }

        doDfs();
    }

    if (bombPos !== null) {

    }


}