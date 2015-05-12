post '/favorites' do
  content_type :json
  # Why is this FOCB?  if I'm favoriting it, shouldn't we assume a find?
  # Since we soured it?
  #
  # And I think finding it by params or something would be
  # better you know (chocolate-cake-with-awesome-stuff) as Cassidy demonstrated

  recipe = Recipe.find_or_create_by(title: params[:title],
                                    big_oven_id: params[:bigOvenId].to_i
                                    )
  # Shouldn't that be in a session after auth?
  # Don't you already have a helper for this?
  user = User.find(params[:userId])

  # Using a foreign key is a smell...
  favorite = Favorite.new( user_id:   user.id,
                           recipe_id: recipe.id
                         )

  # So.....I'd expect this action to look like:
  # favorite = Recipe.lookup_by_recipe_slug(params[:slug]).favorites.build(user: current_user)

  if favorite.save
    return { status: "Favorited!" }.to_json
  else
    return { status: "Sorry, something went wrong." }.to_json
  end

end
