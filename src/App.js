import './App.css';
import Header from './frontend/Header';
import { useReducer } from 'react';
import { algorithmContext, initialAlgorithm, algorithmReducer } from './Core';
import Init from './frontend/Init';



function App() {
  const [curAlgorithm, setCurAlgorithm] = useReducer(algorithmReducer, initialAlgorithm);

  return (
    <div className="App">
      <algorithmContext.Provider value={{ get: curAlgorithm, set: setCurAlgorithm }}>
        <Header />
      </algorithmContext.Provider>
      <Init row={10} col={50} size={30} />
    </div>
  );
}

export default App;
