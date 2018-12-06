"use strict";

(function() {
  $(document).on("click", "#submit-login-btn", loginHandler);
})();

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
    complete: function(data) {
      // When AJAX call is complete, will fire upon success or when error is thrown
      if (data.responseJSON.error) {
        $("#user-email").val("");
        $("#password").val("");
        $("#error-message").html("Invalid Email or Password!");
      }
    }
  });
}
