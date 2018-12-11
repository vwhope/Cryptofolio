(function() {
  isLoggedIn(function(value, user, userName) {
    if (value) {
      $.get("/api/snapshot/" + user, function(data) {
        renderHoldingsPiChart(data.Portfolios);
        renderThreeOrLessCoins(data.Portfolios);
        renderAccountTotal(data.Portfolios);
        displayUserDropDown(userName)
      });
    }
  });
})();

// Logic to buy/sell any coin
$("#submit-trade").on("click", function(event) {
  event.preventDefault();
  // Get input values from user
  var email = $("#email").text();
  var coin = $("#coin-to-trade").val();
  var quantity = $("#quantity").val();
  var transactionType = $("input[name='trade-radio']:checked").val();
  var coinName;
  // Switch statement to get coinName
  switch (coin) {
  case "BTC":
    coinName = "bitcoin";
    break;
  case "ETH":
    coinName = "ethereum";
    break;
  case "LTC":
    coinName = "litecoin";
    break;
  case "XRP":
    coinName = "ripple";
    break;
  case "XMR":
    coinName = "monero";
    break;
  }

  console.log(email, coin, coinName, quantity, transactionType);

  // Build the payload data to send
  var tradeData = {
    email: email,
    symbol: coin,
    coinName: coinName,
    quantity: quantity,
    transactionType: transactionType
  };
  // AJAX call to /api/trade endpoint to perform buy/sell operations
  $.ajax({
    type: "POST",
    url: "/api/trade",
    data: tradeData,
    success: function(data) {
      location.reload();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("AJAX call failed.");
      console.log(textStatus + ": " + errorThrown);
    }
  });
});
