const withLess = require('@zeit/next-less')
module.exports = withLess({
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  }
});
