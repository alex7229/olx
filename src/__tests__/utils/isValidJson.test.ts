import { isValidJson } from "../../application/utils/isValidJson";

it("should return false if json is not string", () => {
  expect(isValidJson([])).toBe(false);
});

it("should return false if json is incorrect", () => {
  const json = "fsdfdf[]";
  expect(isValidJson(json)).toBe(false);
});

it("should validate json properly", () => {
  const data = { cat: "meow" };
  const json = JSON.stringify(data);
  expect(isValidJson(json)).toBe(true);
});
