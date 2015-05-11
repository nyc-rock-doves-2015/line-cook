$(document).ready(function(){
  $('.container').on('click', '#favorite-icon', function(event) {
    var $favorite = $(event.target)
    $.ajax({
      type: "POST",
      //dan's localhost below
      url: "http://10.0.2.89:3000/favorites",
      data: $favorite.data()
    });
  });
});