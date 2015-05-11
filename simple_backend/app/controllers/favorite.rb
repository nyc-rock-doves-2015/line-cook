post '/favorites' do
  content_type :json
  if session[:user_id]
    user = User.find(session[:user_id])
  else
    return { alert: "Must be logged in to choose favorites." }.to_json
  end

  recipe = Recipe.find_or_create_by(title: params[:title],
                                    big_oven_id: params[:bigOvenId].to_i
                                    )

  p recipe
  # favorite = Favorite.new( user_id:   user.id,
  #                          recipe_id: recipe.id
  #                        )

  # if favorite.save
  #   return { status: "success" }.to_json
  # else
  #   return { status: "fail" }.to_json
  # end

end
