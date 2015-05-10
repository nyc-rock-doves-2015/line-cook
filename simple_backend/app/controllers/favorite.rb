post '/favorites' do
  content_type :json

  big_oven_id = params[:bigOvenId].to_s
  user_name = params[:userName]
  recipe = Recipe.find_or_create_by(big_oven_id: big_oven_id)
  user = User.find_or_create_by(name: user_name)

  favorite = Favorite.new( user_id:   user.id,
                           recipe_id: recipe.id
                         )

  if favorite.save
    return { status: "success" }.to_json
  else
    return { status: "fail" }.to_json
  end

end
