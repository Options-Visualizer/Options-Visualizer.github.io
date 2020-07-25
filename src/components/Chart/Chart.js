import React from 'react';
import './Chart.css';
import {Line} from 'react-chartjs-2';
import 'chartjs-plugin-annotation';



function Chart(info) {
  let chartLabels = []; 
  let verticalLines = [];
  if (info.high !== 0){
    chartLabels = [0, info.low, info.quote, info.high, info.high + info.high - info.quote];
    verticalLines = [
      {
        type: "line",
        mode: "vertical",
        scaleID: "x-axis-0",
        value: 1,
        borderColor: "blue",
        borderWidth: 5,
        label: {
          backgroundColor: "red",
          content: "52 wk Low",
          enabled: true
        }
      },
      {
        type: "line",
        mode: "vertical",
        scaleID: "x-axis-0",
        value: 2,
        borderColor: "blue",
        borderWidth: 5,
        label: {
          backgroundColor: "red",
          content: "Current Price",
          enabled: true
        }
      } , 
      {
        type: "line",
        mode: "vertical",
        scaleID: "x-axis-0",
        value: 3,
        borderColor: "blue",
        borderWidth: 5,
        label: {
          backgroundColor: "red",
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
        label: 'Call',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: []
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
            text: info.ticker + " P/L Chart",
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
          }
        }}
      />
    </div>
  );
}

export default Chart;
