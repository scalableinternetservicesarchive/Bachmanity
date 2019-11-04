Rails.application.routes.draw do
  resources :lobby_playlists
  resources :lobby_messages
  resources :users
  resources :lobbies
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
