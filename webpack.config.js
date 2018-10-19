const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postcssPresetEnv = require(`postcss-preset-env`);
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = (env, { mode }) => {
  console.log(mode);
  return {
    output: {
      filename: "[name].[chunkhash].js"
    },
    devServer: {
      overlay: true
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              options: { minimize: true }
            }
          ]
        },
        {
          test: /\.(je?pg|png)$/,
          use: {
            loader: "url-loader",
            options: {
              limit: 1000,
              context: "./src",
              name: "[path][name].[hash].[ext]"
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            mode === "production"
              ? MiniCssExtractPlugin.loader
              : "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                plugins: [
                  require(`postcss-import`),
                  postcssPresetEnv({ stage: 0 })
                ]
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
      }),
      new MiniCssExtractPlugin({
        filename: "style.[contenthash].css"
      }),
      new OptimizeCSSAssetsPlugin()
    ]
  };
};
