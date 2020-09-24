class Toy < ApplicationRecord

  def like
    update(likes: likes + 1)
  end
end
