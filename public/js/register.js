// Hide the drop down menu
$(".navbar .btn-group").hide();
// Attach event listner for submit
$("#submit").on("click", function(event) {
  event.preventDefault();
  var $firstName = $("#input-first-name").val();
  var $lastName = $("#input-last-name").val();
  var $email = $("#input-email").val();
  var $password = $("#input-password").val();
  var payload = {
    firstName: $firstName,
    lastName: $lastName,
    email: $email,
    password: $password
  };
  // AJAX call to register new user
  $.ajax({
    type: "POST",
    data: payload,
    url: "/api/register",
    success: function(data) {
      console.log("AJAX call successful.");
      window.location.href = "/dashboard";
    },
    error: function(jqXHR, textStatus, errorThrown) {
      // When AJAX call has failed
      console.log("AJAX call failed.");
      console.log(textStatus + ": " + errorThrown);
    }
  });
});
