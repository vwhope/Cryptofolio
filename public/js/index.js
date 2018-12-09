"use strict";

$(document).ready(function() {
  $(document).on("click", ".coin-button", coinButtonHandler);
  $(document).on("click", "#submit-login-btn", loginHandler);
  isLoggedIn(function(value, email) {
    if (!value) {
      $("#myModal").modal("show");
    } else {
      $("#myModal").modal("hide");
      $("#main-content-area").css("visibility", "visible");
      displayInfoAfterLogin(email);
    }
  });
});

function loginHandler(event) {
  // Prevent page from reloading
  event.preventDefault();

  // Get email and password from DOM
  var email = $("#user-email").val();
  var password = $("#password").val();

  // Validation to make sure email and password is not empty.
  if (email !== "" && password !== "") {
    var payload = {
      email: email,
      password: password
    };

    // Make request to authenticate
    $.ajax({
      type: "POST",
      data: payload,
      url: "/api/authenticate",
      success: function() {
        console.log("AJAX call successful.");
        displayInfoAfterLogin(email);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        // When AJAX call has failed
        console.log("AJAX call failed.");
        console.log(textStatus + ": " + errorThrown);
      }
    });
  }
}

function isLoggedIn(callback) {
  console.log("isLogged got called");
  $.ajax({
    type: "GET",
    url: "/api/isLoggedIn/",
    success: function(data) {
      console.log("user is logged in");
      console.log(data.email);
      callback(true, data.email);
    },
    error: function() {
      console.log("user is not logged in");
      callback(false);
    }
  });
}

function displayInfoAfterLogin(user) {
  $("#myModal").modal("hide");
  $("#main-content-area").css("visibility", "visible");
  getSevenDayCoinPerformance("BTH");
  getSnapshot(user);
}

function getSnapshot(user) {
  $.get("/api/snapshot/" + user, function(data) {
    renderHoldingsPiChart(data.Portfolios);
    renderRecentTransactions(data.Transactions);
    renderThreeOrLessCoins(data.Portfolios);
    renderAccountTotal(data.Portfolios);
  });
}

function renderThreeOrLessCoins(portfolioData) {
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
    coin: [],
    color: [],
    highlights: []
  };

  var numberOfCoins = portfolioData.length;
  var i;
  for (i = 0; i < numberOfCoins; i++) {
    var r = Math.floor(Math.random() * 200);
    var g = Math.floor(Math.random() * 200);
    var b = Math.floor(Math.random() * 200);
    var c = "rgb(" + r + ", " + g + ", " + b + ")";
    var h = "rgb(" + (r + 20) + ", " + (g + 20) + ", " + (b + 20) + ")";
    chartData.holdings.push(portfolioData[i].holdings);
    chartData.coin.push(portfolioData[i].coin);
    chartData.color.push(c);
    chartData.highlights.push(h);
  }

  var sdpChartElem = document
    .getElementById("holdings-doughnut-chart")
    .getContext("2d");
  new Chart(sdpChartElem, {
    type: "pie",
    data: {
      labels: chartData.coin,
      datasets: [
        {
          data: chartData.holdings,
          backgroundColor: chartData.color
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

function renderAccountTotal(portfolio) {
  var total = 0;
  for (var i = 0; i < portfolio.length; i++) {
    total += parseFloat(portfolio[i].holdings) * portfolio[i].price;
  }
  var newPTag = $("<p>")
    .addClass("account-total")
    .text(total.toFixed(2));
  $(".balance-section").append(newPTag);
}
