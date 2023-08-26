import { ResolveOptions } from "webpack";


export function buildResolvers(): ResolveOptions {
  return {
      extensions: ['.tsx', '.ts', '.js'],   //для того, чтобы корректно находило модули без их расшираений
  }
}