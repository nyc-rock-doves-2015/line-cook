$(document).ready(function(){
  $('.container').on('click', '#favorite-icon', function(event) {
    var sessionInfo = window.localStorage.getItem("sessionId");
    if (sessionInfo){
      var $favorite = $(event.target)
      $.ajax({
        type: "POST",
        //dan's localhost below
        url: "http://10.0.2.89:3000/favorites",
        data: $favorite.data()
      }).then(function(response){
        alert(response.status);
      });
    } else { alert("Sorry, please sign in to create favorites!") }
  });
});