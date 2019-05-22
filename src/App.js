import React, { useState } from 'react';
import './App.css';
import useVolume from './useVolume';
import grumpy from './grumpy.png';
import attack from './attack.png';
import meow from './meow.png';
import sad from './sad.png';

import posed, { PoseGroup } from 'react-pose';


const catpics = [grumpy, attack, meow, sad]
const Img = posed.img({
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      y: { type: 'spring', stiffness: 1000, damping: 15 },
      default: { duration: 50 }
    }
  },
  exit: {
    y: 100,
    delay: 100,
    transition: { duration: 150 }
  }
});

function App() {
  const [cats, setCats] = useState([])
  
  function appendCat(volume) {
    setCats([...cats, {x: Math.floor(Math.random() * 100) + 1, y: volume * 2, volume: volume * 7 + 100}])
  }
  useVolume((v) => {
    console.log(v)
    if(v > 2) {
      appendCat(v)
    } else if(v === 10){
      setCats([])
    }
  })
  
  console.log(cats)
  return (
    <div className="App">
      <header className="App-header">
        <div style={{position: 'fixed', top: 0, width: '100vw', height: '100vh'}}>
          <PoseGroup>{cats && cats.map(el => <Img key={el.x+el.y} style={{position: 'fixed', bottom: `${el.y}vh `, left: `${el.x}vw`}} src={catpics[Math.floor(Math.random() * catpics.length)]} alt="a cat" width={el.volume} />)}</PoseGroup>
        </div>
      </header>
    </div>
  );
}

export default App;
