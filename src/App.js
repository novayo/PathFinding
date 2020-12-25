import './App.css';
import Header from './frontend/Header';
import { useReducer } from 'react';
import { algorithmContext, initialAlgorithm, algorithmReducer } from './Core';
import Table from './frontend/Table';
import { Button } from 'react-bootstrap';
import ButtonEvent from './frontend/TableHelper/ButtonEvent';


function App() {
  const [curAlgorithm, setCurAlgorithm] = useReducer(algorithmReducer, initialAlgorithm);
  const buttonEvent = ButtonEvent()

  return (
    <div className="App">
      <algorithmContext.Provider value={{ get: curAlgorithm, set: setCurAlgorithm }}>
        <Header />
      </algorithmContext.Provider>
      <Table />
      <Button onClick = {buttonEvent.Addbomb}>AddBomb</Button>
      <Button onClick = {buttonEvent.RemoveBomb}>RemoveBomb</Button>
      <Button onClick = {buttonEvent.ClearWalls}>ClearWalls</Button>
      <Button onClick = {buttonEvent.ClearBoard}>ClearBoard</Button>
    </div>
  );
}

export default App;
