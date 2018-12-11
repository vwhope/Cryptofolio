(function() {
  // Event listner to listen to coin drop down option

  var selectedCoin;
  var allCoinPrices;
  $quantityElement = $("#quantity");
  $coinToTradeElement = $("#coin-to-trade");
  $totalPriceElement = $("#total-price");

  $coinToTradeElement.on("change", function() {
    $quantityElement.val("");
  });

  $quantityElement.keyup(function() {
    displayTotal(allCoinPrices);
  });

  isLoggedIn(function(condition, email, userName) {
    if (condition) {
      var symbols = "BTC,LTC,ETH,XRP,XMR";

      $.get("/api/getMultipleCoinPrices/" + symbols, function(data) {
        for (var symbol in data) {
          var newTableRow = $("<tr>")
            .append($("<td>").text(getcoinNameFromSymbol(symbol)))
            .append($("<td>").text(data[symbol].USD));
          $("#price-table-body").append(newTableRow);
        }
      }).then(function(pricesObj) {
        allCoinPrices = pricesObj;

      
        function displayTotal(coinPrice) {
          var quantity = parseFloat($quantityElement.val());
          if (!isNaN(quantity)) {
            $totalPriceElement.text(
              quantity * parseFloat(coinPrice[selectedCoin].USD)
            );
          }
        }
      });
      

    
      $.get("/api/snapshot/" + email, function(data) {
        renderHoldingsPiChart(data.Portfolios);
        renderThreeOrLessCoins(data.Portfolios);
        renderAccountTotal(data.Portfolios);
        displayUserDropDown(userName);

        // Logic to buy/sell any coin
        $("#submit-trade").on("click", function(event) {
          console.log(
            $("input[name='trade-radio']:checked").val() +
              $quantityElement.val()
          );
          event.preventDefault();
          var transactionType = $("input[name='trade-radio']:checked").val();
          // Validation to make sure an input was made for quantity and a selection was made for
          // buy or sell.
          if (
            !isNaN(parseFloat($quantityElement.val())) &&
            typeof transactionType !== "undefined"
          ) {
            // Get input values from user
            console.log("test");
            var coin = $coinToTradeElement.val();
            var quantity = $quantityElement.val();
            var transactionType = $("input[name='trade-radio']:checked").val();
            // Switch statement to get coinName
            var coinName = getcoinNameFromSymbol(coin);
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
          }
        });
      });
    }
  });

  function getcoinNameFromSymbol(coin) {
    var coinName;
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
    return coinName;
  }
})();
