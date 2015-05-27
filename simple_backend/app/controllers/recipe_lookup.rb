get '/search_recipes' do
  title_keyword = URI.escape(params[:title_keyword])
  RestClient.get "https://api.bigoven.com/recipes?pg=1&rpp=25&title_kw=#{title_keyword}&api_key=#{ENV['API_KEY']}",{:Accept => 'application/json'}
end
