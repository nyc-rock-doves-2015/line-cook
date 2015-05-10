get '/users/:id' do |id|
  @user = User.find(id)
  content_type :json
  return { status: "success", id: user.id, name: user.name }.to_json
end
