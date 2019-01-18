(function($) {
  $(function() {
    $("#searchLabel").hide();
    $("#resultsList").hide();
    $("#actionPanel").hide();

    $("#doIt").on("click", function() {
      $("#searchLabel").show();
      $("#resultsList").show();
      $("#googlePlaceholder").hide();
      $("#map").show();
      let timeTokill = $("#timeOptions option:selected").val();
    });
  }); // end of document ready
})(jQuery); // end of jQuery name space
