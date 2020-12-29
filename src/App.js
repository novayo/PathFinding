import './App.css';
import { algorithmReducer, initialAlgorithm, algorithmContext } from './Core';
import { sysStatusReducer, initialsysStatus, sysStatusContext } from './Core';
import { bombContext, bombInitial, bombReducer } from './Core';
import Header from './frontend/Header';
import { useReducer } from 'react';
import Table from './frontend/Table';
import ButtonEvent from './frontend/TableHelper/ButtonEvent'


function App() {
  const [curAlgorithm, setCurAlgorithm] = useReducer(algorithmReducer, initialAlgorithm);
  const [curSysStatus, setCurSysStatus] = useReducer(sysStatusReducer, initialsysStatus);
  const [curBomb, setCurBomb] = useReducer(bombReducer, bombInitial);
  const [search, path, speed] = [ [[[1,2], [2,2], [3,2], [4,2], [5,2], [6,2], [7,2], [8,2], [9,2], [10,2]], 
                                   [[1,3], [2,3], [3,3], [4,3], [5,3], [6,3], [7,3], [8,3], [9,3], [10,3]],
                                   [[1,4], [2,4], [3,4], [4,4], [5,4], [6,4], [7,4], [8,4], [9,4], [10,4]],
                                   [[1,5], [2,5], [3,5], [4,5], [5,5], [6,5], [7,5], [8,5], [9,5], [10,5]],
                                   [[1,6], [2,6], [3,6], [4,6], [5,6], [6,6], [7,6], [8,6], [9,6], [10,6]]]
                                  ,
                                   [[1,2], [2,2], [3,2], [4,2], [5,2], [6,2], [7,2], [8,2], [9,2], [10,2]] 
                                  ,
                                  50
                                ]
  const buttonEvent = ButtonEvent()

  return (
    <div className="App">
      <bombContext.Provider value={{ get: curBomb, set: setCurBomb }}>
        <sysStatusContext.Provider value={{ get: curSysStatus, set: setCurSysStatus }}>
          <algorithmContext.Provider value={{ get: curAlgorithm, set: setCurAlgorithm }}>
            <Header />
          </algorithmContext.Provider>
        </sysStatusContext.Provider>
      </bombContext.Provider>
      <Table />
      <button onClick = {buttonEvent.Start(search, path, speed)}>start</button>
      <button onClick = {buttonEvent.ClearPath}>ClearPath</button>
    </div>
  );
}

export default App;
