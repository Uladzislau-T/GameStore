import { classNames } from "./classNames"

describe("classNames", () => {
  test("with one param", () => {
    expect(classNames("someClass")).toBe("someClass")
  })

  test("with additional classes", () => {
    expect(classNames("someClass", {hovered: true, scrollable:true}, ["class1", "class2"])).toBe("someClass class1 class2 hovered scrollable")
  })

  test("with false value", () => {
    expect(classNames("someClass", {hovered: true, scrollable:false}, ["class1", "class2"])).toBe("someClass class1 class2 hovered")
  })
})