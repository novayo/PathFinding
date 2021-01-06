import React, { useContext } from 'react'
import { NavDropdown, Nav } from 'react-bootstrap';
import { sysStatusContext } from '../../Core';
import Colored from '../../HOC/Colored';

function DropdownMaze() {
    const sysStatus = useContext(sysStatusContext);
    const [className, toggleHandler] = Colored();

    const DropdownMazeHandler = (eventKey) => {
        if (sysStatus.get !== "IDLE") {
            return;
        }

        switch (eventKey) {
            case "Maze_Recursive_Division":
                alert("Maze_Recursive_Division");
                break;
            case "Maze_Recursive_Division_vertical":
                alert("Maze_Recursive_Division_vertical");
                break;
            case "Maze_Recursive_Division_horizontal":
                alert("Maze_Recursive_Division_horizontal");
                break;
            case "Maze_Basic_Random":
                alert("Maze_Basic_Random");
                break;
            case "Maze_Basic_Weight_Maze":
                alert("Maze_Basic_Weight_Maze");
                break;
            case "Maze_Simple_stair_pattern":
                alert("Maze_Simple_stair_pattern");
                break;
            default:
                break;
        }
    }

    return (
        <Nav.Item>
            <NavDropdown xs={1} title={<span className={className}>Mazes & Patterns</span>} id="DropdownMaze" onSelect={DropdownMazeHandler}
                onMouseEnter={toggleHandler} onMouseLeave={toggleHandler}
            >
                <NavDropdown.Item eventKey="Maze_Recursive_Division">Recursive Division</NavDropdown.Item>
                <NavDropdown.Item eventKey="Maze_Recursive_Division_vertical">Recursive Division(vertical skew)</NavDropdown.Item>
                <NavDropdown.Item eventKey="Maze_Recursive_Division_horizontal">Recursive Division(horizontal skew)</NavDropdown.Item>
                <NavDropdown.Item eventKey="Maze_Basic_Random">Basic Random Maze</NavDropdown.Item>
                <NavDropdown.Item eventKey="Maze_Basic_Weight_Maze">Basic Weight Maze</NavDropdown.Item>
                <NavDropdown.Item eventKey="Maze_Simple_stair_pattern">Simple Stair Pattern</NavDropdown.Item>
            </NavDropdown>
        </Nav.Item>
    )
}

export default DropdownMaze;