import './App.scss';
import { algorithmReducer, initialAlgorithm, algorithmContext } from './Core';
import { sysStatusReducer, initialsysStatus, sysStatusContext } from './Core';
import { bombContext, bombInitial, bombReducer } from './Core';
import { speedContext, speedInitial, speedReducer } from './Core';
import Header from './Frontend/Header';
import { useReducer } from 'react';
import Table from './Frontend/Table';

function App() {
  const [curAlgorithm, setCurAlgorithm] = useReducer(algorithmReducer, initialAlgorithm);
  const [curSysStatus, setCurSysStatus] = useReducer(sysStatusReducer, initialsysStatus);
  const [curBomb, setCurBomb] = useReducer(bombReducer, bombInitial);
  const [curSpeed, setCurSpeed] = useReducer(speedReducer, speedInitial);

  return (
    <div className="App">
      <speedContext.Provider value={{ get: curSpeed, set: setCurSpeed }}>
        <bombContext.Provider value={{ get: curBomb, set: setCurBomb }}>
          <sysStatusContext.Provider value={{ get: curSysStatus, set: setCurSysStatus }}>
            <algorithmContext.Provider value={{ get: curAlgorithm, set: setCurAlgorithm }}>
              <Header />
            </algorithmContext.Provider>
          </sysStatusContext.Provider>
        </bombContext.Provider>
      </speedContext.Provider>
      <Table />
    </div>
  );
}

export default App;
