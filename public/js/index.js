"use strict";

$(document).ready(function() {
  $(document).on("click", ".coin-button", coinButtonHandler);
  $(document).on("click", "#submit-login-btn", loginHandler);
  isLoggedIn(function(value, email, userName) {
    if (!value) {
      $("#myModal").modal("show");
    } else {
      $("#myModal").modal("hide");
      $("#main-content-area").css("visibility", "visible");
      displayInfoAfterLogin(email);
      displayUserDropDown(userName);
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
      success: function(data) {
        console.log("AJAX call successful.");
        displayInfoAfterLogin(data.email);
        displayUserDropDown(data.userName);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        // When AJAX call has failed
        console.log("AJAX call failed.");
        console.log(textStatus + ": " + errorThrown);
        $("#user-email").val("");
        $("#password").val("");
        $("#login-error-message").css("visibility", "visible");
      }
    });
  }
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

function renderRecentTransactions(transactionsData) {
  var newUl = $("<ul>").addClass(
    "list-group list-group-flush recent-transactions"
  );
  for (var type in transactionsData) {
    if (transactionsData.hasOwnProperty(type)) {
      if (transactionsData[type].type === "buy") {
        newUl.append(
          $("<li>")
            .addClass("list-group-item")
            .text(
              "Bought " +
                transactionsData[type].currency +
                " " +
                transactionsData[type].quantity
            )
        );
      } else {
        newUl.append(
          $("<li>")
            .addClass("list-group-item")
            .text(
              "Sold " +
                transactionsData[type].currency +
                " " +
                transactionsData[type].quantity
            )
        );
      }
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
  $("seven-day-performance").empty();
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
