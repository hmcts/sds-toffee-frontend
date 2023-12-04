'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const setupDev = (app, developmentMode) => {
  if (developmentMode) {
    const webpackDev = require('webpack-dev-middleware');
    const webpack = require('webpack');
    const webpackconfig = require('../../webpack.config');
    const compiler = webpack(webpackconfig);
    app.use(
      webpackDev(compiler, {
        publicPath: '/',
      })
    );
  }
};
module.exports = { setupDev };
