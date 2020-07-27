import React from 'react';
import './App.css';
//components 
import Ticker from '../Ticker/Ticker';
import Chart from '../Chart/Chart';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          Options Visualizer &nbsp;    
        <img src={process.env.PUBLIC_URL + '/favicon.ico'} style={{verticalAlign: "middle"}} alt="Logo"></img>
        </div>
      </header>
      <Ticker />
      <Chart />
    </div>
  );
}