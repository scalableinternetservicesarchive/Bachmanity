# Useful Guides and Resources
#   - https://guides.rubyonrails.org/routing.html#adding-more-restful-actions

Rails.application.routes.draw do
  resources :users
  resources :lobbies do
    resources :lobby_messages, only: [:index, :show, :create] do
      collection do 
        get 'new_messages/:seqno', to: "lobby_messages#new_messages"
      end 
    end
  end
end
