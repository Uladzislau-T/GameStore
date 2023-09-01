import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";
import { BuildOptions } from "./types/config";


export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[]{
  const svgrLoader = {
    test: /\.svg$/,
    use: ['@svgr/webpack']
}

  const cssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
        options.isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        {
          loader:"css-loader",
          options:{
            modules:{
              auto: (resPath: string) => Boolean(resPath.includes('.module')),             //модульный подход только к тем, кто имеет модуль в названии
              localIdentName: options.isDev ? '[path][name]__[local]' : '[hash:base64:8]'  //позволяет в деве использовать путь к css как название класса
            }            
          }
        },
        'sass-loader',
    ]
  }

  const typescriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
}

  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  }

  return [
    svgrLoader,
    fileLoader,
    typescriptLoader,   //важна очередность
    cssLoader    
  ]
}