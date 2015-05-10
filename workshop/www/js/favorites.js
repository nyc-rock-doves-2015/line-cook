$(document).ready(function(){
  $('#favorites-form').on('submit', function(event) {
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: "http://10.0.2.89:3000/favorites",
      data: { bigOvenId: 123, userName: "dan" }
    });
  });
});