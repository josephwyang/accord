Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: "static_pages#root"

  namespace :api, format: :json do
    resources :users, only: [:index, :show, :create]
    get "/servers/explore", to: "servers#index_public"
    resource :session, only: [:create, :destroy]
    resources :servers, only: [:index, :show, :create, :update, :destroy]
    resources :channels, only: [:index, :show, :create, :update, :destroy]
    resources :messages, only: [:index, :create, :update, :destroy]

    mount ActionCable.server => '/cable'
  end
end