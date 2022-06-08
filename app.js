"use strict";

const getChartData = () => {
  // Get data from local json file
  fetch("data.json")
    .then((res) => res.json())
    .then((chartData) => {
      console.log(new Date().getDay());
      // Chart JS
      const ctx = document.getElementById("myChart").getContext("2d");
      const myChart = new Chart(ctx, {
        type: "bar",
        data: {
          // Get labels dynamically from local data file that was fetched
          labels: chartData.map((data) => data.day),
          datasets: [
            {
              // Get price data dynamically from local data file that was fetched
              data: chartData.map((data) => data.amount),
              // Show blue bar for current day and dark red for other days of the week
              backgroundColor: chartData.map((_, i) => {
                if (i === new Date().getDay() - 1) {
                  // Remove one from current day because i starts at 0
                  return "hsl(186, 34%, 60%)";
                } else {
                  return "hsl(10, 79%, 65%)";
                }
              }),
              // Remove Y Axis grid line at start of chart
              borderWidth: 1,
              // Add borderRadius to each bar
              borderRadius: 3,
              borderSkipped: false,
            },
          ],
        },
        options: {
          plugins: {
            // Remove legend on the top of chart
            legend: {
              display: false,
            },
          },
          scales: {
            // Remove grid lines for X & Y axis
            x: {
              grid: {
                display: false,
                borderWidth: 0,
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                display: false,
                borderWidth: 0,
              },
              ticks: {
                display: false,
              },
            },
          },
        },
      });
    });
};

getChartData();
