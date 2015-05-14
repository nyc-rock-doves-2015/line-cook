post '/signin' do
  user = User.find_by(name: params[:user][:name])
  if user && user.authenticate(params[:user][:password])
    return { id: user.id, name: user.name }.to_json
  else
    return status 401
  end
end

post '/signup' do
  user = User.create(params[:user])
  return { status: "success", id: user.id, name: user.name }.to_json
end
