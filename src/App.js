import React from 'react';
import './App.css';
import Part1 from './components/Part1';
import Part2 from './components/Part2';
import store from './store/store';
import { saveData } from './actions/index.js'


window.store = store;
window.saveData = saveData;

function App() {
  return (
    <div className="App">
      <div style={{ padding: 30 }}>
        <img width='200' height='80' src="https://pickshare.de/wp-content/uploads/2019/12/pickshare_Logo.png" />
      </div>
      <Part1 />
      <Part2 />
    </div>
  );
}

export default App;
