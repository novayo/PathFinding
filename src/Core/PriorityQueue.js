// Reference: https://www.programiz.com/dsa/priority-queue

// 建立 min-heap
class PriorityQueue {
    constructor() {
        this.arr = [];
    }

    // 丟進來的東西有，table[pos][strategy], pos, Heuristic數字
    // 因為如果一樣大，要取得距離終點小的
    Push(score, heuristic, pos) {
        if (this.arr.length === 0) {
            this.arr.push([score, heuristic, pos]);
        } else {
            // 插入最後 -> heapify
            this.arr.push([score, heuristic, pos]);
            this.HeapifyAll(this.arr.length - 1); // 不用-1感覺也可以，等等試試
        }
    }

    Pop() {
        // 交換最後 -> heapify
        let tmp = this.arr[0];
        this.arr[0] = this.arr[this.arr.length - 1];
        this.arr[this.arr.length - 1] = tmp;
        this.arr.splice(this.arr.length - 1, 1);
        this.HeapifyAll(this.arr.length - 1);
        return tmp[2];
    }

    Peek() {
        return this.arr[0][2];
    }

    Length() {
        return this.arr.length;
    }

    Heapify(index) {
        let n = this.arr.length;
        let smallest = index;
        let left = 2 * index;
        let right = 2 * index + 1;

        if (left < n) {
            if (this.arr[smallest][0] > this.arr[left][0]) {
                smallest = left;
            } else if (this.arr[smallest][0] === this.arr[left][0]) {
                if (this.arr[smallest][1] > this.arr[left][1]) {
                    smallest = left;
                }
            }
        }

        if (right < n) {
            if (this.arr[smallest][0] > this.arr[right][0]) {
                smallest = right;
            } else if (this.arr[smallest][0] === this.arr[right][0]) {
                if (this.arr[smallest][1] > this.arr[right][1]) {
                    smallest = right;
                }
            }
        }

        if (smallest !== index) {
            let tmp = this.arr[index];
            this.arr[index] = this.arr[smallest];
            this.arr[smallest] = tmp;
            this.Heapify(smallest);
        }
    }

    HeapifyAll(index) {
        for (let i = Math.floor(index / 2); i >= 0; i--) {
            this.Heapify(i);
        }
    }
}

export default PriorityQueue;