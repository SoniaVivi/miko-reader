import toCamelCase from "../toCamelCase";
// import { expect, it } from "jest";

it("converts to CamelCase", () => {
  expect(toCamelCase("camel case")).toBe("camelCase");
  expect(toCamelCase("Camel Case")).toBe("camelCase");
  expect(toCamelCase("cAMEL Case")).toBe("camelCase");
  expect(toCamelCase("CAMEL CASE")).toBe("camelCase");
  expect(toCamelCase("camel")).toBe("camel");
});
