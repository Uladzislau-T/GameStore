import { resolve } from "path";
import { lazy } from "react";

export const CatalogAsync = lazy(() => new Promise(resolve => {
  //@ts-ignore
  setTimeout(() => resolve(import("./catalog")), 1500)
}))