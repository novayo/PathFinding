import './App.css';
import Header from './frontend/Header';
import { useReducer } from 'react';
import { algorithmContext, initialAlgorithm, algorithmReducer } from './Core';
import Table from './frontend/Table';

function App() {
  const [curAlgorithm, setCurAlgorithm] = useReducer(algorithmReducer, initialAlgorithm);

  return (
    <div className="App">
      <algorithmContext.Provider value={{ get: curAlgorithm, set: setCurAlgorithm }}>
        <Header />
      </algorithmContext.Provider>
      <Table />
    </div>
  );
}

export default App;
