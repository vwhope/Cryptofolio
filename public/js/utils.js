"use strict";
// Checks if current user is logged in
function isLoggedIn(callback) {
  $.ajax({
    type: "GET",
    url: "/api/isLoggedIn/",
    success: function(data) {
      callback(true, data.email, data.userName);
    },
    error: function() {
      callback(false);
    }
  });
}

// Displays user email if logged in
function displayUserDropDown(userName) {
  $("#email").text(userName);
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

// Function to display account total
function renderAccountTotal(portfolio) {
  var total = 0;
  for (var i = 0; i < portfolio.length; i++) {
    total += parseFloat(portfolio[i].holdings) * portfolio[i].price;
  }
  var totalTitle = $("<div class='total-title'>")
    .addClass("account-total")
    .text("Account Balance:");
  var totalAmount = $("<div class='total-balance'>")
    .addClass("account-total")
    .text("$" + total.toFixed(2));
  $("#portfolio-total").append(totalTitle);
  $("#portfolio-total").append(totalAmount);
}

// Function to render coins
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
