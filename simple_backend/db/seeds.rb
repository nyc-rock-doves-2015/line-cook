require 'faker'

password = '123'
users = []
recipes = []

10.times do
  users << User.create(name: Faker::Name.first_name, password: password)
end
