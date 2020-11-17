const path = require("path");
const resolve = (url) => path.resolve(__dirname, url);

const HtmlWebpackPlugin = require("html-webpack-plugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
// clear /dist
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    pageA: resolve("../src/entry/pageA.js"),
    pageB: resolve("../src/entry/pageB.js"),
  },
  output: {
    path: resolve("../dist/"),
    publicPath: "/",
    chunkFilename: "[name]_[chunkhash].min.js",
    filename: "js/[name].[hash].js",
  },
  resolve: {
    alias: {
      "@": resolve("../src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 50,
              outputPath: "assets",
              name: "[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "pageA.html",
      chunks: ["pageA"],
      inject: true,
      hash: true,
      template: resolve("../src/public/pageA.html"),
    }),
    new HtmlWebpackPlugin({
      filename: "pageB.html",
      chunks: ["pageB"],
      inject: true,
      hash: true,
      template: resolve("../src/public/pageB.html"),
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: resolve("../src/assets"),
    //       to: "./assets",
    //     },
    //   ],
    // }),
    new CleanWebpackPlugin(),
  ],
  performance: {
    hints: false,
  },
};
