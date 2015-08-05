Rails.application.routes.draw do
 
  post 'home/sign_document' => 'home#sign_document', as: :sign_document
  root 'home#index'
end
