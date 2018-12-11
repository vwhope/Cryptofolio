// media query event handler
if (matchMedia) {
  var mq = window.matchMedia("(max-width: 1100px)");
  mq.addListener(WidthChange);
  WidthChange(mq);
}
// media query change
function WidthChange(mq) {
  if (mq.matches) {
    $("#main-content-area")
      .addClass("col-12")
      .removeClass("col-10");
    $("#left-nav").hide();
  } else {
    $("#main-content-area")
      .addClass("col-10")
      .removeClass("col-12");
    $("#left-nav").show();
  }
}
