$(document).ready(function(){
  $('.container').on('click', '#user-dashboard-link', function(event){
    event.preventDefault();
    $.ajax({
      type: "GET",
      url: "http://10.0.2.210:3000/favorites"
    }).then(function(response){
      var favoritesArray = response.favorites_array
      // why the space before ++?
      for(i = 0; i < favoritesArray.length; i ++){
        $('.container').append(favoritesArray[i] + ' recipe id');
        //next step is to create RecipePreviews here and
        // plug in data from response for recipe id, and later title
      };
    });
  });
});
