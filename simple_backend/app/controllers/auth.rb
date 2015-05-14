post '/signin' do
  content_type :json
  user = User.find_by(name: params[:user][:name])
  if user && user.authenticate(params[:user][:password])
    puts "Successfully signed in!!!!"
    return { status: "success", id: user.id, name: user.name }.to_json
  else
    return { status: "failed" }.to_json
  end
end

post '/signup' do
  puts "made it to signup"
  content_type :json
  user = User.create(params[:user])
  return { status: "success", id: user.id, name: user.name }.to_json
end
