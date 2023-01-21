const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "../src", "index.tsx"),
  output: {
    path: path.join(__dirname, "../build"),
    filename: "index.bundle.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  moduleRules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ["babel-loader"],
    },
    {
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: ["ts-loader"],
    },
    {
      test: /\.(css|scss)$/,
      use: ["style-loader", "css-loader", "sass-loader"],
    },
    {
      test: /\.(jpg|jpeg|png|gif|mp3)$/,
      use: ["file-loader"],
    },
    {
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    },
  ],
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../src", "index.html"),
    }),
  ],
};
