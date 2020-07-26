import React, { useState } from 'react';
import './Ticker.css';
import Button from 'react-bootstrap/Button';
import { SYMBOL_SET } from './TickerConstants';
import { changeTickerAction } from '../../redux';
import { connect } from 'react-redux';

function Ticker(props) {
  const [curinput, setCurinput] = useState('');
  const [disabled, setDisabled] = useState(true);


  function handleChange(event) {
    const cleanInput = event.target.value.trim().toUpperCase();
    if (cleanInput.length <= 5 && SYMBOL_SET.has(cleanInput)) {
      setDisabled(false);
    } else{ 
      setDisabled(true);
    }
    setCurinput(event.target.value);
  }

  function handleSubmit(event) {
    let cleanInput = curinput.trim().toUpperCase();
    props.changeTickerAction({
      ticker: cleanInput
    })
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

const mapStateToProps = (state) => ({
  ticker: state.ticker
});


export default connect(
  mapStateToProps, 
  { changeTickerAction }
)(Ticker);