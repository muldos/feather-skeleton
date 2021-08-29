const resolve = require("path").resolve;

module.exports = {
  target: "node14",
  node: {
    __dirname: false,
    __filename: false,
  },
  entry: ["./lambda.js"],
  output: {
    filename: "lambda.js",
    library: { name: "handler", type: "commonjs" },
    path: resolve(__dirname, "./../dist/"),
  },
};
