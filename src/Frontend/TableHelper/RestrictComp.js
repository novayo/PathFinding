
export function RestrictComp(algorithm){ // 各種algorithm在wall、weight、bomb的限制

    switch (algorithm.get) {
        case "Algorithm_Dijkstra":
            return { wall: true, weight: true, bomb: true }
        case "Algorithm_AStar":
            return { wall: true, weight: true, bomb: true }
        case "Algorithm_Greedy_Best_First":
            return { wall: true, weight: true, bomb: true }
        case "Algorithm_Swarm":
            return { wall: true, weight: true, bomb: true }
        case "Algorithm_Convergent_Swarm":
            return { wall: true, weight: true, bomb: true }
        case "Algorithm_Bidrectional_Swarm":
            return { wall: true, weight: true, bomb: false }
        case "Algorithm_Breadth_First":
            return { wall: true, weight: false, bomb: true }
        case "Algorithm_Depth_First":
            return { wall: true, weight: false, bomb: true }
        default:
            return { wall: true, weight: true, bomb: true }
    }   
}