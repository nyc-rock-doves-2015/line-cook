var recipeSearchEvent = function(apiRequest){
  $('.container').on('submit', '#search-form', function(event) {
    event.preventDefault();
    var data = $('#search').val();
    $('#search').val('');
    renderSplash('#logged-in', '#logged-out', '.container');
    $('body').css("background-color", "#FFF");
    apiRequest(data);
  });
};