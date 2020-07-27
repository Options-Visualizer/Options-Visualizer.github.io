import React from 'react';
import './App.css';
import { Provider } from 'react-redux'; 
import { store } from '../../redux';

//components 
import Ticker from '../Ticker/Ticker';
import Chart from '../Chart/Chart';

function App() {

  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
