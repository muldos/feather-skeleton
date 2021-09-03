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
      { from: "./config", to: resolve(__dirname, "./../distapp/config") },
      { from: "./public", to: resolve(__dirname, "./../distapp/public") },
    ],
  }),
];
base.stats = {
  warningsFilter: /require\.extensions/,
};
base.entry = ["./src/index.js"];
base.output = {
  filename: "index.js",
  path: resolve(__dirname, "./../distapp/src"),
};
base.optimization = {
  usedExports: true,
};
module.exports = base;
