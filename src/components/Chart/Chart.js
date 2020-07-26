import React from 'react';
import './Chart.css';
import {Line} from 'react-chartjs-2';
import 'chartjs-plugin-annotation';


function Chart(info) {
  let chartLabels = []; 
  let verticalLines = [];
  let pldata = []
  let dataLabel = "";

  if (info.high !== 0){
    const intQuote = Math.round(info.quote / 10) * 10;
    pldata = [-150, -150, (info.quote - intQuote) * 100 - 150, (info.high - intQuote) * 100 - 150, 2 * (info.high - intQuote) * 100 - 150]
    dataLabel = "Long " + intQuote + " call @ 1.50";
    chartLabels = [0, info.low, info.quote, info.high, info.high + info.high - info.quote];
    verticalLines = [
      {
        type: "line",
        mode: "vertical",
        scaleID: "x-axis-0",
        value: info.low,
        borderColor: "#38677D",
        borderWidth: 5,
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
        value: info.quote,
        borderColor: "#38677D",
        borderWidth: 5,
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
        value: info.high,
        borderColor: "#38677D",
        borderWidth: 5,
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
            text: info.ticker + " Profit/Loss Chart",
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
