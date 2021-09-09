import React from "react";
import { Bar, Line, defaults } from "react-chartjs-2";
// import {} from "react-chartjs-2"
// import Chart from "./Loader/Chart";

import "../views/graph2.css";

const LineChart = (props) => {
  const labelarray = props.label;
  const namearray = props.name;
  const dataarray = props.data;
  const linecolour = props.colour;
  const xstring = "Date";

  const namearray2 = props.name2;
  const dataarray2 = props.data2;
  const linecolour2 = props.colour2;

  const statess = {
    labels: labelarray,
    datasets: [
      {
        label: "Systolic Pressure",
        fill: false,
        lineTension: 0.2,
        backgroundColor: "rgba(155, 99, 132, 0.3)",
        borderColor: "blue",
        borderWidth: 3,
        data: dataarray,
      },
      {
        label: "Diastolic Pressure",
        fill: false,
        lineTension: 0.2,
        backgroundColor: "rgba(155, 99, 132, 0.3)",
        borderColor: "red",
        borderWidth: 3,
        data: dataarray2,
      },
    ],
  };

  return (
    <div>
      <div className="w-full p-2 sm:p-4 md:p-8 items-center justify-center">
        <div class="chart-container">
          <Line
            data={statess}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                title: {
                  display: true,
                  text: "Patient's Blood Pressure History",
                  color: "red",
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
                    text: "Data received time",
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

export default LineChart;
