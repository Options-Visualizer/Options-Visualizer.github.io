import React, { useState } from 'react';
import './Ticker.css';
import Chart from '../Chart/Chart'
import Button from 'react-bootstrap/Button';

function Ticker() {
  const [curinput, setCurinput] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [ticker, setTicker] = useState('');
  const [quote, setQuote] = useState('');
  const [high, setHigh] = useState(0); 
  const [low, setLow] = useState(0);

  const finnhub = require('finnhub');
  
  const api_key = finnhub.ApiClient.instance.authentications['api_key'];
  api_key.apiKey = process.env.REACT_APP_API_KEY; 
  const finnhubClient = new finnhub.DefaultApi()
   
  function handleChange(event) {
    finnhubClient.quote(event.target.value.trim().toUpperCase(), (error, data, response) => {
      if (data.c !== undefined){ 
        setDisabled(false);
      } else{ 
        setDisabled(true);
      }
    });
    setCurinput(event.target.value);
  }
  async function getHighLow(tick) { 
    let response = await fetch('https://cloud.iexapis.com/stable/stock/' + tick + '/quote?token=' + process.env.REACT_APP_IEX_API_KEY);
    let data = await response.json();
    return data;
  }
  function handleSubmit(event) {
    let cleanInput = curinput.trim().toUpperCase();
    getHighLow(cleanInput).then(data => {
      setHigh(data.week52High);
      setLow(data.week52Low);
    });
    finnhubClient.quote(cleanInput, (error, data, response) => {
      setQuote(data.c)
    });    
    setTicker(cleanInput); 
    event.preventDefault();
  }

  return (
    <div>
      <div className="Ticker-div"> 
        <form onSubmit={handleSubmit}>
          <label style={{paddingRight:"5px"}}>
            <input type="text" placeholder="Enter Ticker Symbol Here" value={curinput} onChange={handleChange} className="Ticker-searchbar" />
          </label>
          <Button variant="outline-primary" type="submit" disabled = {disabled} style={{float:"center", borderRadius: "0px"}}>Use Ticker</Button>
        </form>
      </div>
       <Chart ticker={ticker} quote={quote} high={high} low={low} />
    </div>
  );
}

export default Ticker;
