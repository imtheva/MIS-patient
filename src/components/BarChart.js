import React from "react";
import { Bar, Line, defaults } from "react-chartjs-2";
// import {} from "react-chartjs-2"
// import Chart from "./Loader/Chart";

import "../views/graph.css";

const BarChart = (props) => {
  const labelarray = props.label;
  const namearray = props.name;
  const dataarray = props.data;
  const linecolour = props.colour;
  const topic = props.topic;

  const statess = {
    labels: labelarray,
    datasets: [
      {
        label: namearray,
        fill: false,
        lineTension: 0.2,
        backgroundColor: "rgba(155, 99, 132, 0.3)",
        borderColor: linecolour,
        borderWidth: 3,
        data: dataarray,
      },
    ],
  };

  return (
    <div>
      <div className="w-full items-center justify-center">
        <div class="chart-container">
          <Line
            data={statess}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                title: {
                  display: true,
                  color: "red",
                  text: topic,
                  font: {
                    size: 20,
                  },
                },
                legend: {
                  position: "right",
                },
              },

              animations: {
                borderWidth: {
                  duration: 800,
                  // easing: 'linear',
                  from: 7,
                  to: 1,
                  loop: true,
                },
                borderColor: {
                  type: "color",
                  duration: 1000,
                  from: "gray",
                  to: linecolour,
                },

                // tension: {
                //   duration: 1000,
                //   easing: 'linear',
                //   from: 0.2,
                //   to: 0,
                //   loop: true
                // }
              },
              scales: {
                x: {
                  display: true,
                  title: {
                    display: true,
                    text: "Date and Time of Updates",
                    color: "blue",
                    font: {
                      size: "16",
                    },
                  },
                  grid: {
                    color: "cyan",
                  },
                  ticks: {
                    // color:"red",
                    font: {
                      size: 10,
                    },
                  },
                },
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: "Readings",
                    color: "blue",
                    font: {
                      size: "16",
                    },
                  },
                  grid: {
                    color: "cyan",
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BarChart;

{
  /* <Line
        data={{
          labels: labelarray,
          datasets: [
            {
              
              label: namearray,
              data: dataarray,
              backgroundColor: [
                'rgba(155, 99, 132, 0.2)'
              ],
              borderColor: [
                linecolour                
              ],
              borderWidth: 2,
            },
            // {
            // //   label: 'Quantity',
            // //   data: [47, 52, 67, 58, 9, 50],
            //   // backgroundColor: 'orange',
            //   // borderColor: 'red',
            // },
          ],
          options: {           
            scales:{
              x:[
                {
                  grid:{
                    color: 'red',
                    borderColor: 'grey',
                    tickColor: 'grey',
                  },
                  title:{
                    display:true,
                    text: "Date",
                    
                  },
                  ticks: {
                    
                    
                    fontColor:'green'
                  }
                }
              ],
              yAxes: [
                {
                  scaleLabel:{
                    display:true,
                    text:'Date',
                    
                  },
                  
                  ticks: {
                    
                    beginAtZero: true,
                    fontColor:'green'
                  }
                }
              ]
            },
            legend: {
              labels: {
                fontSize: 25,
              }
            }
          }}
        }
          
          
        /> */
}
