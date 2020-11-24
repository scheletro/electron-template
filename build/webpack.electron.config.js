const path = require("path");
const nodeExternals = require("webpack-node-externals");
const merge = require("webpack-merge");

const base = require("./webpack.base.config");

module.exports = env => {
  return merge(base(env), {
    entry: {
      app: "./src/app.js"
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "../app")
    },
    target: "electron-renderer",
    node: {
      __dirname: false,
      __filename: false
    },
    externals: [nodeExternals()],
  });
};
