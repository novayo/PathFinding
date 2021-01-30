import { useState, useContext, useEffect } from 'react';
import { algorithmContext, mazeContext, animationStatusContext } from '../../../Core';

function AlgorithmDescriptor() {
    const [algorithmName, setAlgorithmName] = useState('Pick an algorithm and visualize it!');
    const [discription1, setDiscription1] = useState('');
    const [discription2, setDiscription2] = useState('');
    const algoContext = useContext(algorithmContext);
    const animationContext = useContext(animationStatusContext);
    const mContext = useContext(mazeContext);
    const [mazeName, setMazeName] = useState("");
    const [m_discription1, setMDiscription1] = useState('');

    useEffect(() => {
        var algoName = "";
        var d1 = "";
        var d2 = "";
        switch (algoContext.get) {
            case "Algorithm_Dijkstra":
                algoName = "Dijkstra's Algorithm";
                d1 = "weighted";
                d2 = "guarantees";
                break;
            case 'Algorithm_AStar':
                algoName = "A* Search";
                d1 = "weighted";
                d2 = "guarantees";
                break;
            case "Algorithm_Greedy_Best_First":
                algoName = "Greedy Best-first Search";
                d1 = "weighted";
                d2 = "does not guarantee";
                break;
            case "Algorithm_Swarm":
                algoName = "Swarm Algorithm";
                d1 = "weighted";
                d2 = "does not guarantee";
                break;
            case "Algorithm_Convergent_Swarm":
                algoName = "Convergent Swarm Algorithm";
                d1 = "weighted";
                d2 = "does not guarantee";
                break;
            case "Algorithm_Bidrectional_Swarm":
                algoName = "Bidrectional Swarm Algorithm";
                d1 = "weighted";
                d2 = "does not guarantee";
                break;
            case "Algorithm_Breadth_First":
                algoName = "Breath-first Search";
                d1 = "unweighted";
                d2 = "guarantee";
                break;
            case "Algorithm_Depth_First":
                algoName = "Depth-first Search";
                d1 = "unweighted";
                d2 = "does not guarantee";
                break;
            default:
                algoName = "Pick an algorithm and visualize it!";
                d1 = "";
                d2 = "";
                break;
        }

        setAlgorithmName(algoName);
        setDiscription1(d1);
        setDiscription2(d2);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [algoContext.get])

    useEffect(() => {
        var mName = "";
        var d1 = "";
        switch (mContext.get) {
            case "Maze_Recursive_Division":
                mName = "Recursive Division Maze";
                d1 = "";
                break;
            case "Maze_Recursive_Division_vertical":
                mName = "Recursive Division(Vertical) Maze";
                d1 = "";
                break;
            case "Maze_Recursive_Division_horizontal":
                mName = "Recursive Division(Horizontal) Maze";
                d1 = "";
                break;
            case "Maze_Basic_Random":
                mName = "Basic Random Maze";
                d1 = "does not";
                break;
            case "Maze_Basic_Weight_Maze":
                mName = "Basic Weight Maze";
                d1 = "does not";
                break;
            case "Maze_Simple_stair_pattern":
                mName = "Simple Stait Pattern";
                d1 = "does not";
                break;
            case "Maze_Binary_Tree":
                mName = "Binary Tree Generator";
                d1 = "";
                break;
            case "Maze_Kruskal":
                mName = "Kruskal's Maze";
                d1 = "does not";
                break;
            case "Maze_Prim":
                mName = "Prim's Maze";
                d1 = "does not";
                break;
            case "Maze_Eller":
                mName = "Eller's Maze";
                d1 = "";
                break;
            default:
                break;
        }

        setMazeName(mName);
        setMDiscription1(d1);
    }, [mContext.get])

    if (algoContext.get === "" && animationContext.get === "Algorithm") {
        return (
            <div id="algorithmDescriptor">
                {algorithmName}
            </div>
        )
    } else {
        if (animationContext.get === "Maze") {
            return (
                <div id="algorithmDescriptor">
                    <b>{mazeName}</b> <i>{m_discription1} guarantees</i> perfect maze!
                </div>
            )
        } else if (animationContext.get === "Algorithm") {
            return (
                <div id="algorithmDescriptor">
                    <b>{algorithmName}</b> is <i>{discription1}</i> and <i>{discription2}</i> the shortest path!
                </div>
            )
        }
    }

}

export default AlgorithmDescriptor;