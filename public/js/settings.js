(function() {
  "use strict";
  window.addEventListener(
    "load",
    function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName("needs-validation");
      // Loop over them and prevent submission
      Array.prototype.filter.call(forms, function(form) {
        form.addEventListener(
          "submit",
          function(event) {
            event.preventDefault();
            checkAndUpdatePassword();
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    false
  );
})();

// Check if user is logged in and display email on top right
$.ajax({
  type: "GET",
  url: "/api/isLoggedIn/",
  success: function(data) {
    $("#email").text(data.email);
  },
  error: function() {
    console.log("user is not logged in");
    callback(false);
  }
});

function checkAndUpdatePassword() {
  // Grab input values
  var currentPassword = $("#current-password").val();
  var newPassword1 = $("#new-password-1").val();
  var newPassword2 = $("#new-password-2").val();
  // Check if new passwords are matching
  if (newPassword1 !== newPassword2) {
    console.log("newPassword1 and newPassword2 are not equal!");
    clearNewPasswordInput();
    $("#error-message").html("New password does not match!");
  } else if (
    // Check if new password is same as current password
    newPassword1 === newPassword2 &&
    newPassword1 === currentPassword
  ) {
    clearNewPasswordInput();
    $("#error-message").html(
      "New password cannot be the same as current password"
    );
  } else {
    // If all checks are passed, update password
    updatePassword(currentPassword, newPassword1);
  }
}

function updatePassword(currentPassword, newPassword) {
  // First make AJAX call to get user email
  $.ajax({
    type: "GET",
    url: "/api/isLoggedIn",
    success: function(data) {
      console.log("AJAX call successful.");
      console.log("ajax success:", data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("AJAX call failed.");
      console.log(textStatus + ": " + errorThrown);
    }
    // Then call update password api
  }).then(function(data) {
    console.log("ajax then:", data);
    // TODO: Call update password api
    console.log(data);
    $.ajax({
      type: "PUT",
      url: "/api/updatePassword",
      data: {
        email: data.email,
        current: currentPassword,
        password: newPassword
      },
      success: function() {
        console.log("AJAX call successful.");
        console.log("ajax success: updated password");
        $("#changeModal").modal("toggle");
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log("AJAX call failed.");
        console.log(textStatus + ": " + errorThrown);
      }
    });
  });
}

function clearNewPasswordInput() {
  $("#new-password-1").val("");
  $("#new-password-2").val("");
}
