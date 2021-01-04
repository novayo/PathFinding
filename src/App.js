import './App.scss';
import { useReducer } from 'react';
import Header from './Frontend/Header';
import { algorithmReducer, initialAlgorithm, algorithmContext } from './Core';
import { sysStatusReducer, initialsysStatus, sysStatusContext } from './Core';
import { bombContext, bombInitial, bombReducer } from './Core';
import { speedContext, speedInitial, speedReducer } from './Core';
import Table from './Frontend/Table';
import { tableReducer, initialTable, tableContext } from './Frontend/TableHelper/TableIndex'
import { touchReducer, touchInitial, touchContext } from './Frontend/TableHelper/TableIndex'
import { moveReducer, moveInitial, moveContext } from './Frontend/TableHelper/TableIndex'

function App() {
  const [curAlgorithm, setCurAlgorithm] = useReducer(algorithmReducer, initialAlgorithm);
  const [curSysStatus, setCurSysStatus] = useReducer(sysStatusReducer, initialsysStatus);
  const [curBomb, setCurBomb] = useReducer(bombReducer, bombInitial);
  const [curSpeed, setCurSpeed] = useReducer(speedReducer, speedInitial);
  const [table, setTable] = useReducer(tableReducer, initialTable)
  const [touch, setTouch] = useReducer(touchReducer, touchInitial)
  const [move, setMove] = useReducer(moveReducer, moveInitial)

  return (
    <div className="App">
      <moveContext.Provider value={{ get: move, set: setMove }}>
        <touchContext.Provider value={{ get: touch, set: setTouch }}>
          <tableContext.Provider value={{ get: table, set: setTable }}>
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
          </tableContext.Provider>
        </touchContext.Provider>
      </moveContext.Provider>

    </div>
  );
}

export default App;
