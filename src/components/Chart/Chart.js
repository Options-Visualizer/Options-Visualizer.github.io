import React, { useState, useEffect } from 'react';
import './Chart.css';
import {Line, Scatter} from 'react-chartjs-2';
import 'chartjs-plugin-annotation';
import { useSelector } from 'react-redux'
import * as zoom from 'chartjs-plugin-zoom';

const borderColors = ["#191716", "#E6AF2E", "#E0E2DB", "#BEB7A4"];

function Chart (props) {
  let verticalLines = [];
  let dataLabel = "";
  const [quote, setQuote] = useState(0);
  const [high, setHigh] = useState(0); 
  const [low, setLow] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [chartBounds, setChartBounds] = useState([0, 0]);

  const symbol = useSelector(state => state.currentSymbol);
  const strategies = useSelector(state => state.currentStrategies);



  useEffect(() => {

    async function getTickerData(tick) {
      let response = await fetch('https://cloud.iexapis.com/stable/stock/' + tick + '/quote?token=' + process.env.REACT_APP_IEX_API_KEY);
      let data = await response.json();
      return data;
    }
    if (symbol !== undefined && symbol !== ''){
      getTickerData(symbol).then(data => {
        //TODO: Add y calculation here as well 
        setHigh(data.week52High);
        setLow(data.week52Low);
        setQuote(data.latestPrice);
      });
    }

  }, [symbol]);

  let lower_bound = Math.ceil(low - quote/10 - 10);
  let upper_bound = Math.ceil(high + quote/10 + 10);
  useEffect(() => { 
    let chart_data = [];

    for (let i = 0; i < strategies.length; i++){
      for (let j = 0; strategies[i].legs !== undefined && j < Object.keys(strategies[i].legs).length; j++){
        if (Number(strategies[i].legs[j].strike) + quote/10 > upper_bound){ 
          upper_bound = Number(strategies[i].legs[j].strike) + quote/10;
        }
      }
    }

    for (let i = 0; i < strategies.length; i++){
      chart_data.push([]);
      if (low + high + quote !== 0){
        let cur_x = lower_bound;
        while (cur_x <= upper_bound){
          
          chart_data[i].push({x: Number(cur_x).toFixed(2), y: 0});
          cur_x += 10;
        }
      }
      for (let j = 0; strategies[i].legs !== undefined && j < Object.keys(strategies[i].legs).length; j++){
        for (let k = 0; k < chart_data[i].length; k++){
  
          let factor = strategies[i].legs[j].direction === "-" ? 1 : -1
          let type = strategies[i].legs[j].type; 
          let premium = strategies[i].legs[j].premium * 100;
          let strike = strategies[i].legs[j].strike;
          let quantity = strategies[i].legs[j].quantity;
          let x = parseFloat(chart_data[i][k].x);
  
          let cur_y = factor * premium;
  
          // Handle calls 
          if (type === "C" && x >= strike){
            cur_y = - factor * (x - strike - premium);
          }
          
          // Handle puts 
          if (type === "P" && x <= strike){ 
            cur_y = -factor * (strike - x - premium)
          }
          if (premium !== 0 && strike !== 0 && premium !== undefined && strike !== undefined){
            chart_data[i][k].y += cur_y * quantity;
          }
        }
      }
    }
    if (strategies.length == 0){
      setChartData([]);
    }
    else if (strategies[0].legs === undefined){ 
      setChartData([]);
    }
    else {
      setChartData(chart_data);
    }


  }, [strategies])
  
  if (high !== 0){
    const intQuote = Math.floor(quote / 5) * 5;
    let third = (quote - intQuote) * 100 - 150; 
    if (quote < intQuote) { 
      third = -150;
    }
    dataLabel = "Long " + intQuote + " call @ 1.50";
    verticalLines = [
      {
        type: "line",
        mode: "vertical",
        scaleID: "x-axis-0",
        value: Number(low).toFixed(2),
        borderColor: "#38677D",
        borderWidth: 2,
        borderDash: [2],

        label: {
          backgroundColor: "#959296",
          content: "52 wk Low",
          position: "bottom",
          enabled: true
        }
      },
      {
        type: "line",
        mode: "vertical",
        scaleID: "x-axis-0",
        value: Number(quote).toFixed(2),
        borderColor: "#38677D",
        borderWidth: 2,
        borderDash: [2],

        label: {
          backgroundColor: "#959296",
          content: "Current Price",
          enabled: true
        }
      } , 
      {
        type: "line",
        mode: "vertical",
        scaleID: "x-axis-0",
        value: Number(high).toFixed(2),
        borderColor: "#38677D",
        borderWidth: 2,
        borderDash: [2],

        label: {
          backgroundColor: "#959296",
          content: "52 wk High",
          position: "top",
          enabled: true
        }
      }      
    ];
  }
  
  
  let state = {datasets: []}; 

  for (let i = 0; i < chartData.length; i++){ 
    state.datasets.push({
      label: "Strategy " + (i + 1),
      fill: false, 
      lineTension: 0, 
      backgroundColor: 'rgba(75, 192, 192, 1)', 
      borderColor: borderColors[i], 
      borderWidth: 2, 
      data: chartData[i],
    })
  }
  return (
    <div className="Chart-div">
      <Line
        data={state}
        options={{
          title:{
            display:true,
            text: (symbol === undefined ? "" : symbol) + " Profit/Loss Chart",
            fontSize:20
          },
          legend:{
            display:true,
            position:'right'
          },
          scales:{
            yAxes: [{
              scaleLabel: {
                display: true, 
                labelString: 'Profit or Loss',
                fontSize: 18
              },
              ticks: {
                callback: function(value, index, values) { 
                  return '$' + value;
                }
              }
            }],
            xAxes: [{
              type: 'linear',
              scaleLabel: {
                display: true, 
                labelString: 'Price at Expiration',
                fontSize: 18
              },
              ticks: {
                callback: function(value, index, values) { 
                  return '$' + value;
                }, 
                min: lower_bound,
                max: upper_bound,
              },
            }],
          },
          plugins: {
            zoom: {
                // Container for pan options
                pan: {
                    // Boolean to enable panning
                    enabled: true,

                    // Panning directions. Remove the appropriate direction to disable 
                    // Eg. 'y' would only allow panning in the y direction
                    mode: 'xy'
                },

                // Container for zoom options
                zoom: {
                    // Boolean to enable zooming
                    enabled: true,

                    // Zooming directions. Remove the appropriate direction to disable 
                    // Eg. 'y' would only allow zooming in the y direction
                    mode: 'xy',
                }
            }
        }, 
        annotation: {
          drawTime: 'beforeDatasetsDraw',
          annotations: verticalLines,
        },
        }}
      />
    </div>
  );
}

export default Chart;