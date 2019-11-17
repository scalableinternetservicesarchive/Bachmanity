# Useful Guides and Resources
#   - https://guides.rubyonrails.org/routing.html#adding-more-restful-actions

Rails.application.routes.draw do
  scope :api do 
    get 'sessions/new'
    get 'sessions/create'
    get 'sessions/destroy'
    resources :users, only: [:create, :show, :update]

    # routes for the lobbies
    resources :lobbies do
      resources :lobby_messages, only: [:index, :create] do
        collection do 
          get 'new_messages/:seqno', to: "lobby_messages#new_messages"
        end 
      end
      resources :queued_videos, only: [:index, :create, :destroy]
    end

    # routes for sigup / signin / signout
    resources :sessions, only: [:new, :create, :destroy, :show]
    get 'signup', to: 'users#create', as: 'signup'
    get 'loggedin', to: 'sessions#show', as: 'loggedin'
    post 'login', to: 'sessions#create', as: 'login'
    get 'logout', to: 'sessions#destroy', as: 'logout'
  end
end
