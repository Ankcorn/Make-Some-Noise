import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import useVolume from './useVolume';
function App() {
  const [volume, setVolume] = useState(0)
  useVolume((v) => {
    setVolume(v)
  })
  return (
    <div className="App">
      <header className="App-header">
        <h1>{volume}</h1>
      </header>
    </div>
  );
}

export default App;
