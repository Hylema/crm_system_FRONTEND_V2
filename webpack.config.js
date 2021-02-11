module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /\.useable\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.useable\.css$/i,
        use: [
          {
            loader: 'style-loader',
            options: { injectType: 'lazySingletonStyleTag' }
          },
          'css-loader'
        ]
      },
      {
        test: /\.module\.sass$/,
        use: [
          {
            loader: 'style-loader',
            options: { attributes: { id: 'theme-sheet' }, injectType: 'lazySingletonStyleTag' }
          },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      }
    ]
  }
}
