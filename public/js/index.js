"use strict";

(function() {
  $(document).on("click", ".coin-button", coinButtonHandler);
  getSevenDayCoinPerformance("BTH");
  getSnapshot("demoUser");
})();

// function getSnapshot(user) {
//   $.get("/api/snapshot/" + user)
// }

function coinButtonHandler() {
  var coin = $(this).data("button");
  $("#seven-day-performance").empty();
  getSevenDayCoinPerformance(coin);
}

function getSevenDayCoinPerformance(coin) {
  $.get("/api/" + coin, function(data) {
    var ChartData = {
      closingPoints: [],
      day: []
    };
    for (var close in data) {
      if (data.hasOwnProperty(close)) {
        ChartData.closingPoints.push(data[close].close);
        ChartData.day.push(moment(data[close].time * 1000).format("dddd"));
      }
    }
    renderLineChart(ChartData);
  });
}

function renderLineChart(chartData) {
  var sdpChartElem = document
    .getElementById("seven-day-performance")
    .getContext("2d");
  new Chart(sdpChartElem, {
    type: "line",
    data: {
      labels: chartData.day,
      datasets: [
        {
          label: "Seven Day Performance",
          data: chartData.closingPoints,
          borderColor: "#3cba9f",
          fill: false
        }
      ]
    }
  });
}
