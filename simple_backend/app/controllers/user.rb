get '/dashboard' do
  content_type :json
  user = User.find(params[:userId])
  return { dashboardInfo: user.favorite_recipes,
           userName: user.name
         }.to_json
end
