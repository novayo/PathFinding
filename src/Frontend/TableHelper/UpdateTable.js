import BFS from '../../Backend/Algorithms/BFS';
import DFS from '../../Backend/Algorithms/DFS';
import Dijkstra from '../../Backend/Algorithms/Dijkstra';
import Dijkstra_old from '../../Backend/Algorithms/Dijkstra_old';

export function UpdateTable(Start, ClearPath, algorithm, speed) { // 即時更新Algorithm結果
    ClearPath(false)
    switch (algorithm.get) {
        case "Algorithm_Dijkstra":
            Dijkstra("Dijkstra", Start, speed.get[1]);
            break;
        case 'Algorithm_AStar':
            Dijkstra("Astar", Start, speed.get[1]);
            break;
        case "Algorithm_Greedy_Best_First":
            Dijkstra("GreedyBestFirstSearch", Start, speed.get[1]);
            break;
        case "Algorithm_Swarm":
            Dijkstra("Swarm", Start, speed.get[1]);
            break;
        case "Algorithm_Convergent_Swarm":
            Dijkstra("ConvergentSwarm", Start, speed.get[1]);
            break;
        case "Algorithm_Bidrectional_Swarm":
            Dijkstra("BidirectionSwarm", Start, speed.get[1]);
            break;
        case "Algorithm_Breadth_First":
            BFS(Start, speed.get[1]);
            break;
        case "Algorithm_Depth_First":
            DFS(Start, speed.get[1]);
            break;
        case "Algorithm_Dijkstra_old":
            Dijkstra_old("Dijkstra", Start, speed.get[1]);
            break;
        default:
            break;
    }
}