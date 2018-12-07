"use strict";

$(document).ready(function() {
  $("#myModal").modal("show");
  $(document).on("click", ".coin-button", coinButtonHandler);
  $(document).on("click", "#submit-login-btn", loginHandler);
});

function loginHandler(event) {
  // Prevent page from reloading
  event.preventDefault();

  // Get email and password from DOM
  var email = $("#user-email").val();
  var password = $("#password").val();

  var payload = {
    email: email,
    password: password
  };

  // Make request to authenticate
  $.ajax({
    type: "POST",
    data: payload,
    url: "/authenticate",
    success: function() {
      console.log("AJAX call successful.");
    },
    error: function(jqXHR, textStatus, errorThrown) {
      // When AJAX call has failed
      console.log("AJAX call failed.");
      console.log(textStatus + ": " + errorThrown);
    },
    complete: function() {
      // When AJAX call is complete, will fire upon success or when error is thrown
      // if (data.responseJSON.error || data.responseJSON.error === undefined) {
      //   $("#user-email").val("");
      //   $("#password").val("");
      //   $("#error-message").html("Invalid Email or Password!");
      // }
      getSevenDayCoinPerformance("BTH");
      getSnapshot("demoUser");
      $(document).ready(function() {
        $("#myModal").modal("hide");
      });
    }
  });
}

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
