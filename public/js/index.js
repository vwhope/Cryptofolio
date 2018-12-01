"use strict";

(function() {
  function getSevenDayCoinPerformance(coin) {
    $.get("/api/" + coin, function(data) {
      var chartData = [];
      for (var close in data) {
        if (data.hasOwnProperty(close)) {
          chartData.push(data[close].close);
        }
      }
      renderLineChart(chartData);
    });
  }

  function renderLineChart(chartData) {
    var sdpChartElem = document
      .getElementById("seven-day-performance")
      .getContext("2d");
    new Chart(sdpChartElem, {
      type: "line",
      data: {
        labels: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Friday",
          "Saturday"
        ],
        datasets: [
          {
            label: "Seven Day Performance",
            data: chartData,
            borderColor: "#3cba9f"
            //fill: false
          }
        ]
      }
    });
  }

  getSevenDayCoinPerformance("BTH");
})();
