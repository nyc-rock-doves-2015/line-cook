var User = function(data){
  this.name = data.name;
  this.favorites = [];
}

User.prototype.addFavorite(favorite){
  this.favorites.push(favorite);
}