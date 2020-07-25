import React, { useState } from 'react';
import './Ticker.css';
import Chart from '../Chart/Chart'
import Button from 'react-bootstrap/Button';

function Ticker() {
  const [curinput, setCurinput] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [ticker, setTicker] = useState('');
  const [quote, setQuote] = useState('');
  const [finalquote, setFinalquote] = useState('');
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

  function handleSubmit(event) {
    finnhubClient.companyBasicFinancials(curinput.trim().toUpperCase(), "price", (error, data, response) => {
      setHigh(data.metric['52WeekHigh']); 
      setLow(data.metric['52WeekLow']);
    });
    finnhubClient.quote(curinput.trim().toUpperCase(), (error, data, response) => {
      setQuote(data.c)
    });    
    setTicker(curinput.trim().toUpperCase()); 
    event.preventDefault();
  }

  return (
    <div>
      <div className="Ticker-div"> 
        <form onSubmit={handleSubmit}>
          <label>
            <input type="text" placeholder="Enter Ticker Symbol Here" value={curinput} onChange={handleChange} className="Ticker-searchbar" />
          </label>
          <Button variant="outline-primary" type="submit" disabled={disabled} style={{float:"center"}}>Submit</Button>
        </form>
      </div>
       <Chart ticker={ticker} quote={quote} high={high} low={low} />
    </div>
  );
}

export default Ticker;
