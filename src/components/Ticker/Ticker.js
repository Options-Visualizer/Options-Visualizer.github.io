import React, { useState } from 'react';
import './Ticker.css';

function Ticker() {
  const [curinput, setCurinput] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [ticker, setTicker] = useState('');
  const [quote, setQuote] = useState('');

  const finnhub = require('finnhub');
 
  const api_key = finnhub.ApiClient.instance.authentications['api_key'];
  api_key.apiKey = process.env.REACT_APP_API_KEY; 
  const finnhubClient = new finnhub.DefaultApi()
   
  function handleChange(event) {
    finnhubClient.quote(event.target.value.trim().toUpperCase(), (error, data, response) => {
      if (data.c !== undefined){ 
        setDisabled(false);
        setQuote(data.c); 
      } else{ 
        setDisabled(true);
      }
    });
    setCurinput(event.target.value);
  }

  function handleSubmit(event) {
    setTicker(curinput.trim().toUpperCase()); 
    event.preventDefault();
  }

  return (
    <div className="Ticker-header"> 
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" value={curinput} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" disabled={disabled}/>
      </form>
      {ticker !== '' && <p>{ticker} : {quote}</p>}
    </div>
  );
}

export default Ticker;
