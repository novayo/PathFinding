import BFS from '../../Backend/Bfs'


export function UpdateTable(Start, ClearPath, algorithm, speed) {
    ClearPath(false)
    switch (algorithm.get) {
        case "Algorithm_Dijkstra":
            break;
        case 'Algorithm_APlus':
            break;
        case "Algorithm_Greedy_Best_First":
            break;
        case "Algorithm_Swarm":
            break;
        case "Algorithm_Convergent_Swarm":
            break;
        case "Algorithm_Bidrectional_Swarm":
            break;
        case "Algorithm_Breadth_First":
            BFS(Start, speed.get[1]);
            break;
        case "Algorithm_Depth_First":
            break;
        default:
            break;
    }
}