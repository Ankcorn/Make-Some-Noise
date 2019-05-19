import React, { useState } from 'react';
import './App.css';
import useVolume from './useVolume';
import pic from './cat.png';

function App() {
  const [size, setVolume] = useState(0)
  const [cats, setCats] = useState([])
  
  function appendCat() {
    setCats([...cats, {x: Math.floor(Math.random() * 100) + 1, y: Math.floor(Math.random() * 100) + 1}])
  }
  useVolume((v) => {
    if(v > 10) {
      appendCat()
    } else if(v===0 && cats.length > 1){
      console.log(cats)
      cats.shift()
      setCats(cats)
    }
    setVolume(v * 4 + 100);
  })
  
  console.log(cats)
  return (
    <div className="App">
      <header className="App-header">
        <img src={pic} alt="a cat" width={size} />
        <div style={{position: 'fixed', top: 0, width: '100vw', height: '100vh'}}>
          {cats && cats.map(el => <img key={el.x+el.y} style={{position: 'fixed', top: `${el.y}vh`, left: `${el.x}vw`}} src={pic} alt="a cat" width={size} />)}
        </div>
      </header>
    </div>
  );
}

export default App;
