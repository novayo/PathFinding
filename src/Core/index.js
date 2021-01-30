import React from 'react'
import { tableVar, weightValueRange, adjust } from '../Frontend/TableHelper/TableIndex'

// component position
export var position = {
    start: [adjust(Math.floor(tableVar.rowSize / 2)), adjust(Math.floor(tableVar.colSize / 4))],
    end: [adjust(Math.floor(tableVar.rowSize / 2)), adjust(tableVar.colSize - Math.floor(tableVar.colSize / 4))],
    bomb: false,
    wall: [],
    weight: [],
    weightValue: weightValueRange.init,
    rowSize: tableVar.rowSize,
    colSize: tableVar.colSize
}


// 目前系統狀態
export const sysStatusContext = React.createContext();
export const initialsysStatus = "LOADING";
export const sysStatusReducer = (state, action) => {
    switch (action) {
        case 'IDLE':
            return 'IDLE';
        case 'STOP':
            return 'STOP';
        case 'RUNNING':
            return 'RUNNING';
        case 'LOADING':
            return 'LOADING';
        default:
            return initialsysStatus;
    }
}

// 目前Animation狀態
export const animationStatusContext = React.createContext();
export const animationStatusInitial = "Algorithm";
export const animationStatusReducer = (state, action) => {
    switch (action) {
        case 'Maze':
            return 'Maze';
        case 'Algorithm':
            return 'Algorithm';
        default:
            return animationStatusInitial;
    }
}

// Bomb status
export const bombContext = React.createContext();
export const bombInitial = false;
export const bombReducer = (state, action) => {
    switch (action) {
        case 'True':
            return true;
        case 'False':
            return false;
        default:
            return bombInitial
    }
}

// Speed
export const speedContext = React.createContext();
export const speedInitial = ["Fast", 20];
export const speedReducer = (state, action) => {
    switch (action) {
        case 'Fast':
            return ["Fast", 20];
        case 'Average':
            return ["Average", 100];
        case 'Slow':
            return ["Slow", 1000];
        default:
            return bombInitial
    }
}

// 目前系統是哪種演算法
export const algorithmContext = React.createContext();
export const initialAlgorithm = "";
export const algorithmReducer = (state, action) => {
    switch (action) {
        case 'Algorithm_Dijkstra':
            return 'Algorithm_Dijkstra';
        case 'Algorithm_AStar':
            return 'Algorithm_AStar';
        case "Algorithm_Greedy_Best_First":
            return 'Algorithm_Greedy_Best_First';
        case "Algorithm_Swarm":
            return 'Algorithm_Swarm';
        case "Algorithm_Convergent_Swarm":
            return 'Algorithm_Convergent_Swarm';
        case "Algorithm_Bidrectional_Swarm":
            return 'Algorithm_Bidrectional_Swarm';
        case "Algorithm_Breadth_First":
            return 'Algorithm_Breadth_First';
        case "Algorithm_Depth_First":
            return 'Algorithm_Depth_First';
        case "Algorithm_Dijkstra_old":
            return "Algorithm_Dijkstra_old";
        default:
            return initialAlgorithm;
    }
}

// 目前系統是哪種Maze
export const mazeContext = React.createContext();
export const initialMaze = "";
export const mazeReducer = (state, action) => {
    switch (action) {
        case 'Maze_Recursive_Division':
            return 'Maze_Recursive_Division';
        case 'Maze_Recursive_Division_vertical':
            return 'Maze_Recursive_Division_vertical';
        case "Maze_Recursive_Division_horizontal":
            return 'Maze_Recursive_Division_horizontal';
        case "Maze_Basic_Random":
            return 'Maze_Basic_Random';
        case "Maze_Basic_Weight_Maze":
            return 'Maze_Basic_Weight_Maze';
        case "Maze_Simple_stair_pattern":
            return 'Maze_Simple_stair_pattern';
        case "Maze_Binary_Tree":
            return 'Maze_Binary_Tree';
        case "Maze_Kruskal":
            return 'Maze_Kruskal';
        case "Maze_Prim":
            return "Maze_Prim";
        case "Maze_Eller":
            return "Maze_Eller";
        default:
            return initialAlgorithm;
    }
}