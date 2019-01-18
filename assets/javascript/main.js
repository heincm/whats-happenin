(function($) {
  $(function() {
    $("#searchLabel").hide();
    $("#resultsList").hide();
    $("#actionPanel").hide();

    $("#doIt").on("click", function() {
      $("#searchLabel").show();
      $("#resultsList").show();
      let timeTokill = $("#timeOptions option:selected").val();
      console.log(timeTokill);
    });
  }); // end of document ready
})(jQuery); // end of jQuery name space
