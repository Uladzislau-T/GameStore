import { ResolveOptions } from "webpack";


export function buildResolvers(): ResolveOptions {
  return {
      extensions: ['.tsx', '.ts', '.js'],   //для того, чтобы корректно находило модули без их расшираений
      // preferAbsolute:true    //когда хотим использовать пути без слешей и точек вначале
      // modules:[options.paths.src, 'node_modules']
      // mainFiles:['index'],
      alias:{

      }
  }
}