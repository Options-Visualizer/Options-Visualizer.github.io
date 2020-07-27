import React, { useState, useEffect } from 'react';
import './Ticker.css';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import allActions from '../../redux/actions'

function Ticker(props) {
  const [curinput, setCurinput] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [symbols, setSymbols] = useState(new Set());
  const dispatch = useDispatch();

  useEffect(() => {
    async function getValidSymbols() {
      let response = await fetch('https://cloud.iexapis.com/stable/ref-data/iex/symbols?token=' + process.env.REACT_APP_IEX_API_KEY);
      let data = await response.json();
      return data;
    }
    getValidSymbols().then(data => {
      setSymbols(new Set(data.map(i => i.symbol)));
    });  
  }, []);

  function handleChange(event) {
    const cleanInput = event.target.value.trim().toUpperCase();
    if (cleanInput.length <= 5 && symbols.has(cleanInput)) {
      setDisabled(false);
    } else{ 
      setDisabled(true);
    }
    setCurinput(event.target.value);
  }

  function handleSubmit(event) {
    let cleanInput = curinput.trim().toUpperCase();
    dispatch(allActions.changeSymbol(cleanInput))
    event.preventDefault();
  }

  return (
    <div className="Ticker-div"> 
      <form onSubmit={handleSubmit}>
        <label style={{paddingRight:"5px"}}>
          <input type="text" placeholder="Enter Ticker Symbol Here" value={curinput} onChange={handleChange} className="Ticker-searchbar" />
        </label>
        <Button variant="outline-primary" type="submit" disabled={disabled} style={{float:"center", borderRadius: "0px"}}>Submit</Button>
      </form>
    </div>
  );
}

export default Ticker;

/*const mapStateToProps = (state) => ({
  ticker: state.ticker
});


export default connect(
  mapStateToProps, 
  { changeTickerAction }
)(Ticker);*/