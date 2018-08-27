import assetsHook from 'asset-require-hook';

assetsHook({
  limit: 10000,
  publicPath: '/',
  name: 'assets/[name].[hash:8].[ext]',
  extensions: ['jpg', 'png', 'gif', 'jpeg', 'bmp']
});

assetsHook({
  limit: 1,
  publicPath: '/',
  name: 'assets/[name].[hash:8].[ext]',
  extensions: ['ttf', 'woff', 'svg', 'eot', 'woff2', 'ico']
});
