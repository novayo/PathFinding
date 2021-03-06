import './App.scss';
import { useReducer } from 'react';
import Header from './Frontend/Header';
import { algorithmReducer, initialAlgorithm, algorithmContext } from './Core';
import { sysStatusReducer, initialsysStatus, sysStatusContext } from './Core';
import { bombContext, bombInitial, bombReducer } from './Core';
import { speedContext, speedInitial, speedReducer } from './Core';
import { animationStatusContext, animationStatusInitial, animationStatusReducer } from './Core';
import { mazeContext, initialMaze, mazeReducer } from './Core';
import Table from './Frontend/Table';
import { touchReducer, touchInitial, touchContext } from './Frontend/TableHelper/TableIndex';
import { moveReducer, moveInitial, moveContext } from './Frontend/TableHelper/TableIndex';
import { weightValueReducer, weightValueInitial, weightValueContext } from './Frontend/TableHelper/TableIndex';
import { updateReducer, updateInitial, updateContext } from './Frontend/TableHelper/TableIndex';

function App() {
  const [curAlgorithm, setCurAlgorithm] = useReducer(algorithmReducer, initialAlgorithm);
  const [curSysStatus, setCurSysStatus] = useReducer(sysStatusReducer, initialsysStatus);
  const [curBomb, setCurBomb] = useReducer(bombReducer, bombInitial);
  const [curSpeed, setCurSpeed] = useReducer(speedReducer, speedInitial);
  const [touch, setTouch] = useReducer(touchReducer, touchInitial)
  const [move, setMove] = useReducer(moveReducer, moveInitial)
  const [update, setUpdate] = useReducer(updateReducer, updateInitial)
  const [weightValue, setWeightValue] = useReducer(weightValueReducer, weightValueInitial)
  const [animation, setAnimation] = useReducer(animationStatusReducer, animationStatusInitial)
  const [maze, setMaze] = useReducer(mazeReducer, initialMaze);

  return (
    <div className="App">
      <mazeContext.Provider value={{ get: maze, set: setMaze }}>
        <animationStatusContext.Provider value={{ get: animation, set: setAnimation }}>
          <weightValueContext.Provider value={{ get: weightValue, set: setWeightValue }}>
            <updateContext.Provider value={{ get: update, set: setUpdate }}>
              <moveContext.Provider value={{ get: move, set: setMove }}>
                <touchContext.Provider value={{ get: touch, set: setTouch }}>
                  <speedContext.Provider value={{ get: curSpeed, set: setCurSpeed }}>
                    <bombContext.Provider value={{ get: curBomb, set: setCurBomb }}>
                      <sysStatusContext.Provider value={{ get: curSysStatus, set: setCurSysStatus }}>
                        <algorithmContext.Provider value={{ get: curAlgorithm, set: setCurAlgorithm }}>
                          <Header />
                          <Table />
                        </algorithmContext.Provider>
                      </sysStatusContext.Provider>
                    </bombContext.Provider>
                  </speedContext.Provider>
                </touchContext.Provider>
              </moveContext.Provider>
            </updateContext.Provider>
          </weightValueContext.Provider>
        </animationStatusContext.Provider>
      </mazeContext.Provider>
    </div>
  );
}

export default App;
