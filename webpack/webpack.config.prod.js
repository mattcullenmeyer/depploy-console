const {
  entry,
  output,
  resolve,
  moduleRules,
  devServer,
  plugins,
} = require("./webpack.config.base.js");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry,
  output,
  mode: "production",
  resolve,
  module: {
    rules: moduleRules,
  },
  devServer,
  plugins: [
    ...plugins,
    new Dotenv({
      path: "./environment/.env.prod",
    }),
  ],
};
