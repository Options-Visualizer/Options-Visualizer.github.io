import React from 'react';
import './AddClear.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import allActions from '../../redux/actions'

function AddClear() {
  const dispatch = useDispatch();
  const numStrategies = useSelector((state) => state.currentStrategies.length)

  function handleAdd(event) {
    dispatch(allActions.updateStrategies.addStrategy())
    event.preventDefault();
  }

  function handleClear(event) {
    dispatch(allActions.updateStrategies.clearAll())
    event.preventDefault();
  }

  return (
    <div className="AddClear-div"> 
      <ButtonGroup aria-label="Add/Clear Group">
        <Button disabled={numStrategies === 4 ? true : false} onClick={handleAdd}>+ New Strategy ({numStrategies})</Button>
        <Button disabled={numStrategies === 0 ? true : false} onClick={handleClear}>Clear All</Button>
      </ButtonGroup>
    </div>
  );
}

export default AddClear; 