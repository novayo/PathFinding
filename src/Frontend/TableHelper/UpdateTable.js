import BFS from '../../Backend/Algorithms/BFS';
import DFS from '../../Backend/Algorithms/DFS';
import Dijkstra from '../../Backend/Algorithms/Dijkstra';
import Astar from '../../Backend/Algorithms/Astar';
import GreedyBestFirstSearch from '../../Backend/Algorithms/GreedyBestFirstSearch';
import Swarm from '../../Backend/Algorithms/Swarm';
import ConvergentSwarm from '../../Backend/Algorithms/ConvergentSwarm';
import BidirectionSwarm from '../../Backend/Algorithms/BidirectionSwarm';


export function UpdateTable(Start, ClearPath, algorithm, speed) {
    ClearPath(false)
    switch (algorithm.get) {
        case "Algorithm_Dijkstra":
            Dijkstra(Start, speed.get[1]);
            break;
        case 'Algorithm_AStar':
            Astar(Start, speed.get[1]);
            break;
        case "Algorithm_Greedy_Best_First":
            GreedyBestFirstSearch(Start, speed.get[1]);
            break;
        case "Algorithm_Swarm":
            Swarm(Start, speed.get[1]);
            break;
        case "Algorithm_Convergent_Swarm":
            ConvergentSwarm(Start, speed.get[1]);
            break;
        case "Algorithm_Bidrectional_Swarm":
            BidirectionSwarm(Start, speed.get[1]);
            break;
        case "Algorithm_Breadth_First":
            BFS(Start, speed.get[1]);
            break;
        case "Algorithm_Depth_First":
            DFS(Start, speed.get[1]);
            break;
        default:
            break;
    }
}