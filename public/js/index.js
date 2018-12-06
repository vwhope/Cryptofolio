"use strict";

(function() {
  $(document).on("click", ".coin-button", coinButtonHandler);
  getSevenDayCoinPerformance("BTH");
  getSnapshot("demoUser");
})();

function getSnapshot(user) {
  $.get("/api/snapshot/" + user, function(data) {
    renderHoldingsPiChart(data.Portfolios);
    renderRecentTransactions(data.Transactions);
    renderThreeOrLessCoins(data.Portfolios);
  });
}

function renderThreeOrLessCoins(portfolioData) {
  console.log(portfolioData);
  var numberOfCoinsToDisplay = 3;
  var iterator = 0;
  var newUl = $("<ul>").addClass("list-group list-group-flush coin-snapshot");

  if (portfolioData.length > numberOfCoinsToDisplay) {
    while (iterator < numberOfCoinsToDisplay) {
      newUl.append(
        $("<li>")
          .addClass("list-group-item")
          .text(
            portfolioData[iterator].coin +
              " " +
              portfolioData[iterator].holdings
          )
      );
      iterator += 1;
    }
    $("#partial-coin-snapshot").append(newUl);
  } else {
    for (var coin in portfolioData) {
      if (portfolioData.hasOwnProperty(coin)) {
        newUl.append(
          $("<li>")
            .addClass("list-group-item")
            .text(portfolioData[coin].coin + " " + portfolioData[coin].holdings)
        );
      }
    }
  }
  $("#partial-coin-snapshot").append(newUl);
}

function renderHoldingsPiChart(portfolioData) {
  var chartData = {
    holdings: [],
    coin: []
  };
  for (var holdings in portfolioData) {
    if (portfolioData.hasOwnProperty(holdings)) {
      chartData.holdings.push(portfolioData[holdings].holdings);
      chartData.coin.push(portfolioData[holdings].coin);
    }
  }
  var sdpChartElem = document
    .getElementById("holdings-doughnut-chart")
    .getContext("2d");
  new Chart(sdpChartElem, {
    type: "doughnut",
    data: {
      labels: chartData.coin,
      datasets: [
        {
          data: chartData.holdings
        }
      ]
    }
  });
}

function renderRecentTransactions(transactionsData) {
  var newUl = $("<ul>").addClass(
    "list-group list-group-flush recent-transactions"
  );
  for (var type in transactionsData) {
    if (transactionsData.hasOwnProperty(type)) {
      newUl.append(
        $("<li>")
          .addClass("list-group-item")
          .text(
            transactionsData[type].type +
              " " +
              transactionsData[type].currency +
              " " +
              transactionsData[type].quantity
          )
      );
    }
  }
  $("#transaction-list").append(newUl);
}

function coinButtonHandler() {
  var coin = $(this).data("button");
  $("#seven-day-performance").empty();
  getSevenDayCoinPerformance(coin);
}

function getSevenDayCoinPerformance(coin) {
  $.get("/api/" + coin, function(data) {
    var chartData = {
      closingPoints: [],
      day: []
    };
    for (var close in data) {
      if (data.hasOwnProperty(close)) {
        chartData.closingPoints.push(data[close].close);
        chartData.day.push(moment(data[close].time * 1000).format("dddd"));
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
