class User < ActiveRecord::Base
  has_secure_password

  has_many :favorites
  has_many :recipes, through: :favorites

  def favorite_recipes
    self.favorites.map do |favorite|
      {:title => favorite.recipe.title,
       :bigOvenId => favorite.recipe.big_oven_id
      }
    end
  end
end
