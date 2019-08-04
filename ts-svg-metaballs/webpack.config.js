// https://github.com/juristr/webpack-typescript-starter

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const SRC = path.resolve(__dirname, "src");
const DIST = path.resolve(__dirname, "dist");

module.exports = {
  optimization: {
    namedModules: true,
    namedChunks: true
  },
  context: SRC,
  entry: {
    index: "./index.ts"
  },

  output: {
    filename: "bundle.js",
    path: DIST
  },

  resolve: {
    extensions: [".ts", ".js"],
    modules: [SRC, "node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        enforce: "pre",
        test: /\.js$/,
        use: "source-map-loader"
      },
      {
        enforce: "pre",
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "tslint-loader"
      },
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: "awesome-typescript-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${SRC}/index.html`
    })
  ],
  devtool: "cheap-module-source-map",
  devServer: {
    host: "localhost",
    port: 8080,
    quiet: true,
    watchContentBase: true,
    contentBase: DIST,
    publicPath: "/",
    hot: false
  }
};
