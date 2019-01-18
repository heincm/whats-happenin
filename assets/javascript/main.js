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
      let latPosition = localStorage.getItem("lat");
      let longPosition = localStorage.getItem("lng");
      getMovies(latPosition, longPosition, timeTokill);
    });
  }); // end of document ready
})(jQuery); // end of jQuery name space
