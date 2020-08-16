import React, {useState, useEffect} from 'react';
import './StratContainer.css';
import StratBody from './StratBody.js'
import { useSelector } from 'react-redux';
//import allActions from '../../redux/actions'

function StratContainer(props) {
  const strategies = useSelector((state) => state.currentStrategies)
  const [legTable, setLegTable] = useState({});

  useEffect(() => {
    setLegTable({
        "Custom (1 Leg)": ['+C'],
        "Custom (2 Legs)": ['+C', '+C'],
        "Custom (3 Legs)": ['+C', '+C', '+C'],
        "Custom (4 Legs)": ['+C', '+C', '+C', '+C'],
        "Bull Call Spread": ['+C', '-C'],
        "Bear Call Spread": ['+C', '-C'],
        "Bull Put Spread": ['+P', '-P'],
        "Bear Put Spread": ['+P', '-P'],
        "Long Straddle": ['+C', '+P'],
        "Long Strangle": ['+C', '+P'],
        "Long Call Butterfly": ['+C', '-C', '-C', '+C'],
        "Short Call Butterfly": ['-C', '+C', '+C', '-C'],
        "Long Put Butterfly": ['+P', '-P', '-P', '+P'],
        "Short Put Butterfly": ['-P', '+P', '+P', '-P'],
        "Iron Butterfly": ['+P', '-P', '-C', '+C'],
        "Reverse Iron Butterfly": ['-P', '+P', '+C', '-C'],
        "Iron Condor": ['+P', '-P', '-C', '+C'],
        "Jade Lizard": ['-P', '-C', '+C'],
        "Long Guts": ['+C', '+P']
    })
  }, []);

  return (
    <div className="StratContainer-div"> 
        {strategies.map((strategy, i) => 
            <StratBody id = {i} strat = {strategy.strat} legs = {strategy.legs} table = {legTable} thisStrategy = {strategies[i]}/>)}
    </div>
  );
}

export default StratContainer; 