module.exports = {
  context: __dirname,
  entry: {
    spec: [
      './spec/AuthSpec.js',
      './spec/DashboardSpec.js'
      './spec/PlayerSpec.js',
      './spec/AuthSpec.js',
      './spec/SearchForRecipeSpec.js'
    ]
  },

  output: {
    filename: '[name].js'
  },

  module: {
    loaders: [
      {
        test: /(\.js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
