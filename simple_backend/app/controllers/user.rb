get '/dashboard' do
  content_type :json
  return { dashboardInfo: User.find(params[:userId]).favorite_recipes }.to_json
end
