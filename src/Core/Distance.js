class Distance {
    constructor() {
        this.dict = {}
    }

    // pos=[x, y], d=距離
    set(pos, d) {
        this.dict[pos] = d;
    }

    get(pos) {
        if (pos in this.dict) {
            return this.dict[pos];
        } else {
            return -1;
        }
    }
}

export default Distance;