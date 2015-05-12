$(document).ready(function(){
  $('.container').on('click', '#user-icon', function(){
    var userId = window.localStorage.getItem('sessionId');
    $.ajax({
      type: "GET",
      url: "http://10.0.2.89:3000/dashboard",
      data: { userId: userId }
    }).then(function(response){
      alert(response.dashboardInfo[0].title);
    });
  });
});