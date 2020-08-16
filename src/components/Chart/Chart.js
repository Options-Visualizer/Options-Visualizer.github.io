import React, { useState } from 'react';
import './Chart.css';
import {Line, Scatter} from 'react-chartjs-2';
import 'chartjs-plugin-annotation';
import { useSelector } from 'react-redux'

function Chart (props) {
  let verticalLines = [];
  let pldata = []
  let dataLabel = "";
  const [quote, setQuote] = useState(0);
  const [high, setHigh] = useState(0); 
  const [low, setLow] = useState(0);
  const [chartData, setChartData] = useState([]);
  const symbol = useSelector(state => state.currentSymbol)

<<<<<<< HEAD
  /*useEffect(() => {
=======
  let premium = 10; 
  let strike = quote;
  let strategy = "Short"

  let factor = -1; 
  if (strategy === "Short"){ 
    factor = 1;
  }
  
  useEffect(() => {

>>>>>>> Modified charts
    async function getTickerData(tick) {
      console.log(tick);
      let response = await fetch('https://cloud.iexapis.com/stable/stock/' + tick + '/quote?token=' + process.env.REACT_APP_IEX_API_KEY);
      let data = await response.json();
      return data;
    }
    if (symbol !== undefined && symbol !== ''){
      getTickerData(symbol).then(data => {
        console.log(data);
        let chart_data = []; 
        let cur_x = Math.ceil(data.week52Low - data.latestPrice/10 - 10);
        while (cur_x <= Math.ceil(data.week52High + data.latestPrice/10 + 10)){
          let cur_y = factor * premium;

          if (cur_x - data.latestPrice >= premium){
            cur_y = - factor * (cur_x - data.latestPrice - premium);
          }
          
          chart_data.push({x: Number(cur_x).toFixed(2), y: Number(cur_y).toFixed(2)});
          cur_x += 10;
        }
        console.log(chart_data);
        setHigh(data.week52High);
        setLow(data.week52Low);
        setQuote(data.latestPrice);
        setChartData(chart_data);
      });
    }
<<<<<<< HEAD
  }, [symbol]);*/

  async function getTickerData(tick) {
    console.log(tick);      
    let response = await fetch('https://cloud.iexapis.com/stable/stock/' + tick + '/quote?token=' + process.env.REACT_APP_IEX_API_KEY);
    let data = await response.json();
    return data;
  }

  if (symbol !== undefined ){
    getTickerData(symbol).then(data => {
      setHigh(data.week52High);
      setLow(data.week52Low);
      setQuote(data.latestPrice);
    });
  }

=======

  }, [symbol]);
  
>>>>>>> Modified charts
  if (high !== 0){
    const intQuote = Math.floor(quote / 5) * 5;
    let third = (quote - intQuote) * 100 - 150; 
    if (quote < intQuote) { 
      third = -150;
    }
    pldata = [1, 2,,4];
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
  const state = {
    datasets: [
      {
        label: dataLabel,
        fill: false,
        lineTension: 0,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: chartData
      }
    ]
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
                min: chartData[0] == undefined ? 0 :  Math.floor(chartData[0].x), 
                max: chartData[chartData.length -1] == undefined ? 1 : Math.floor(chartData[chartData.length -1].x),
              }
            }]
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