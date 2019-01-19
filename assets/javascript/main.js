(function($) {
  $(function() {
    $("#searchLabel").hide();
    $("#resultsList").hide();
    $("#actionPanel").hide();
    $("#map").hide();
    $("#doIt").on("click", function() {
      $("#searchLabel").show();
      $("#resultsList").show();
      $("#google-gitmaps-placeholder").hide();
      $("#map").show();
      let timeTokill = $("#timeOptions option:selected").val();
      let latPosition = localStorage.getItem("lat");
      let longPosition = localStorage.getItem("lng");
      getMovies(latPosition, longPosition, timeTokill);
    });
  }); // end of document ready
})(jQuery); // end of jQuery name space
