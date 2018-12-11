$("#submit").on("click", function(event) {
  event.preventDefault();
  var $email = $("#input-email").val();
  var $password = $("#input-password").val();
  
  console.log($email, $password);
});
