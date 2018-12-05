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

  console.log("ajax payload:", payload);

  $.ajax({
    type: "POST",
    data: payload,
    dataType: "json",
    url: "/authenticate",
    success: function(data) {
      // When AJAX call is successfuly
      console.log("AJAX call successful.");
      console.log(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      // When AJAX call has failed
      console.log("AJAX call failed.");
      console.log(textStatus + ": " + errorThrown);
    },
    complete: function() {
      // When AJAX call is complete, will fire upon success or when error is thrown
      console.log("AJAX call completed");
    }
  });
}
