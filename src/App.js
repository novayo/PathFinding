import './App.css';
import { algorithmReducer, initialAlgorithm, algorithmContext } from './Core';
import { sysStatusReducer, initialsysStatus, sysStatusContext } from './Core';
import { bombContext, bombInitial, bombReducer } from './Core';
import Header from './frontend/Header';
import { useReducer } from 'react';
import Table from './frontend/Table';

function App() {
  const [curAlgorithm, setCurAlgorithm] = useReducer(algorithmReducer, initialAlgorithm);
  const [curSysStatus, setCurSysStatus] = useReducer(sysStatusReducer, initialsysStatus);
  const [curBomb, setCurBomb] = useReducer(bombReducer, bombInitial);

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
    </div>
  );
}

export default App;
