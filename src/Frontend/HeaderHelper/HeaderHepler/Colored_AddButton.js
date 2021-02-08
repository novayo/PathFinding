import { useState, useContext } from 'react';
import { sysStatusContext, algorithmContext } from '../../../Core';
import '../../../App.scss';

const Colored = () => {
    const sysStatus = useContext(sysStatusContext);
    const algoStatus = useContext(algorithmContext);
    const [isHover, setIsHover] = useState(false);
    const [className, setClassName] = useState("nav-link-default");

    const toggleHandler = () => {
        if (isHover) {
            setClassName("nav-link-default");
            setIsHover(false);
        } else {
            if ((sysStatus.get !== "IDLE" && sysStatus.get !== "STOP") || algoStatus.get === "" || algoStatus.get === "Algorithm_Bidrectional_Swarm") {
                setClassName("nav-link-red");
            } else {
                setClassName("nav-link-green");
            }
            setIsHover(true);
        }
    }

    return [className, toggleHandler];
}

export default Colored
