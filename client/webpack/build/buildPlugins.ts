import HTMLWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import { BuildOptions } from "./types/config";
import MiniCssExtractPlugin from "mini-css-extract-plugin";


export function buildPlugins({paths, isDev}: BuildOptions): webpack.WebpackPluginInstance[]{
  return [
    new HTMLWebpackPlugin({template: paths.html}),     // для работы с штмл
    new webpack.ProgressPlugin(),                     //The ProgressPlugin provides a way to customize how progress is reported during a compilation.
    new MiniCssExtractPlugin({                        //нужен для того, чтобы css были в отдельном файле после билда
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
    })
  ]
}