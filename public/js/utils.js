function isLoggedIn(callback) {
  console.log("isLogged got called");
  $.ajax({
    type: "GET",
    url: "/api/isLoggedIn/",
    success: function(data) {
      console.log("user is logged in");
      console.log(data.email);
      displayUserDropDown(data.email);
      callback(true, data.email);
    },
    error: function() {
      console.log("user is not logged in");
      callback(false);
    }
  });
}
