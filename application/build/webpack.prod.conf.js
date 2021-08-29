const base = require("./webpack.base.conf");
const webpack = require("webpack");
const resolve = require("path").resolve;
const CopyWebpackPlugin = require("copy-webpack-plugin");

base.mode = "development";
base.plugins = [
  new webpack.ContextReplacementPlugin(
    /express\/lib/,
    resolve(__dirname, "../node_modules"),
    {
      ejs: "ejs",
    }
  ),
  new CopyWebpackPlugin({
    patterns: [
      { from: "./config", to: resolve(__dirname, "./../dist/config") },
      { from: "./lambda.js", to: resolve(__dirname, "./../dist/lambda.js") },
    ],
  }),
];
base.stats = {
  warningsFilter: /require\.extensions/,
};

base.optimization = {
  usedExports: true,
};
module.exports = base;
