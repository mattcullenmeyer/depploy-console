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
  mode: "development",
  resolve,
  module: {
    rules: [
      ...moduleRules,
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
    ],
  },
  devServer,
  plugins: [
    ...plugins,
    new Dotenv({
      path: "./environment/.env.staging",
    }),
  ],
};
