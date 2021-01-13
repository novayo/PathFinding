import { position } from '../../Core';

function Simple_Stair_Pattern() {
    var walls = [];
    var towardUp = true;
    var x = position.rowSize;

    for (var y = 0; y < position.colSize; y++) {
        if (towardUp) {
            x--;
            if (x < 0) {
                towardUp = false;
                x = 1;
            }
        } else {
            x++;
            if (x >= position.rowSize) {
                towardUp = true;
                x = position.rowSize - 2;
            }
        }
        walls.push([x, y]);
    }
    return walls;
}

export default Simple_Stair_Pattern;