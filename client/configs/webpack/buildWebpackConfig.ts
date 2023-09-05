import webpack from "webpack";
import { BuildOptions } from "./types/config";
import { buildPlugins } from "./buildPlugins";
import { buildLoaders } from "./buildLoaders";
import { buildResolvers } from "./buildResolvers";
import { buildDevServer } from "./buildDevServer";


export function buildWebpackConfig(options: BuildOptions): webpack.Configuration{
  const {paths, mode, isDev} = options

  return {
    mode: mode,        // продакшен или дев
    entry: paths.entry,   // пути откуда беруться файлы для билда
    output: {             //куда билдятся
      filename: "[name].[contenthash].js",
      path: paths.build,
      clean: true,
      publicPath: "/"
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options)
    },
    resolve: buildResolvers(),
    devtool: isDev ? 'inline-source-map' : undefined,
    devServer: isDev ? buildDevServer(options) : undefined,
  }
}