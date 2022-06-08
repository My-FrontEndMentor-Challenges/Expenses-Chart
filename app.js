"use strict";

const getChartData = () => {
  // Get data from local json file
  fetch("data.json")
    .then((res) => res.json())
    .then((chartData) => {
      // Chart JS

      const labelTooltip = (chartData) => {
        // Function to remove hover title on each bar
        return "";
      };

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
              // Hover Color Change
              hoverBackgroundColor: chartData.map((_, i) => {
                if (i === new Date().getDay() - 1) {
                  // Remove one from current day because i starts at 0
                  return "hsl(186, 34%, 70%)";
                } else {
                  return "hsl(10, 79%, 75%)";
                }
              }),
              // Remove Y Axis grid line at start of chart
              borderWidth: 1,
              // Add borderRadius to each bar
              borderRadius: 5,
              borderSkipped: false,
            },
          ],
        },
        options: {
          // Make cursor pointer on hover of each bar
          onHover: (e, chartEl) => {
            if (chartEl.length === 1) {
              e.native.target.style.cursor = "pointer";
            } else {
              e.native.target.style.cursor = "default";
            }
          },
          // Remove aspect ratio for custom sizing
          maintainAspectRatio: false,
          plugins: {
            // Remove legend on the top of chart
            legend: {
              display: false,
            },
            tooltip: {
              displayColors: false,
              callbacks: {
                title: labelTooltip,
              },
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
