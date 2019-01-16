(function($) {
  $(function() {
    $(".sidenav").sidenav();

    //initialize select list
    $("select").formSelect();
    //initialize modals
    $(".modal").modal();
  }); // end of document ready
})(jQuery); // end of jQuery name space
