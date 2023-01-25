
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function BarChart({ chartData }) {
  return <Bar 
              data={chartData}      
              
              options = {{

                  indexAxis: 'y',

                  scales: {
                      x: {
                          beginAtZero: false,
                          stacked: true
                      },
                      y: {
                          beginAtZero: false,
                          stacked: true
                      }
                  },

                  plugins: {

                    tooltip: {
                        enabled: true
                    },
                    legend: {
                        labels: {
                            filter: function(item, chart) {
                                // Logic to remove a particular legend item goes here
                                return !item.text.includes('interval');
                            }
                        }
                    }
                  }

              }}


  />;
}


export default BarChart;