import React, { useState, useEffect } from 'react';
import './Chart.css';
import {Line} from 'react-chartjs-2';
import 'chartjs-plugin-annotation';
import { useSelector } from 'react-redux'

function Chart (props) {
  let chartLabels = []; 
  let verticalLines = [];
  let pldata = []
  let dataLabel = "";
  const [quote, setQuote] = useState(0);
  const [high, setHigh] = useState(0); 
  const [low, setLow] = useState(0);
  const symbol = useSelector(state => state.currentSymbol)

  useEffect(() => {
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
  }, [symbol]);
  
  if (high !== 0){
    const intQuote = Math.floor(quote / 5) * 5;
    let third = (quote - intQuote) * 100 - 150; 
    if (quote < intQuote) { 
      third = -150;
    }
    pldata = [-150, -150, third, (high - intQuote) * 100 - 150, 2 * (high - intQuote) * 100 - 150]
    dataLabel = "Long " + intQuote + " call @ 1.50";
    chartLabels = [0, low, quote, high, high + high - quote];
    verticalLines = [
      {
        type: "line",
        mode: "vertical",
        scaleID: "x-axis-0",
        value: 1,
        borderColor: "#38677D",
        borderWidth: 2,
        label: {
          backgroundColor: "#959296",
          content: "52 wk Low",
          enabled: true
        }
      },
      {
        type: "line",
        mode: "vertical",
        scaleID: "x-axis-0",
        value: 2,
        borderColor: "#38677D",
        borderWidth: 2,
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
        value: 3,
        borderColor: "#38677D",
        borderWidth: 2,
        label: {
          backgroundColor: "#959296",
          content: "52 wk High",
          enabled: true
        }
      }      
    ];
  }
  const state = {
    labels: chartLabels,
    datasets: [
      {
        
        label: dataLabel,
        fill: false,
        lineTension: 0,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: pldata,
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
              scaleLabel: {
                display: true, 
                labelString: 'Price at Expiration',
                fontSize: 18
              },
              ticks: {
                callback: function(value, index, values) { 
                  return '$' + value;
                }
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
/*const mapStateToProps = (state) => ({
  ticker: state.ticker
});

export default connect(
  mapStateToProps, 
)(Chart);*/