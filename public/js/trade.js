(function() {
  isLoggedIn(function(value, user) {
    if (value) {
      $.get("/api/snapshot/" + user, function(data) {
        renderHoldingsPiChart(data.Portfolios);
        renderThreeOrLessCoins(data.Portfolios);
        renderAccountTotal(data.Portfolios);
      });
    }
  });
})();
