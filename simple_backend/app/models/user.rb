class User < ActiveRecord::Base
  has_secure_password

  has_many :favorites
  has_many :recipes, through: :favorites
end
