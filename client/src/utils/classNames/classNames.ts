type Mods = Record<string, boolean | string>

export function classNames(cls: string, mods: Mods = {}, additional: string[] = []){
  return [
    cls,
    ...additional.filter(Boolean),
    ...Object.entries(mods).filter(([classNames, value]) => Boolean(value))  // in mods {[cls.collapsed]:collapsed})} where value is boolean
      .map(([classNames]) => classNames)
  ]
  .join(' ')
}