import { parsePrice } from "../../../application/parsers/mainPageItem/parsePrice";

it("should parse price properly", () => {
  const price = "5 000 грн.";
  expect(parsePrice(price)).toBe(5000);
});

it("should return null if price is set as exchange", () => {
  const price = "Обмен";
  expect(parsePrice(price)).toBe(null);
});

it("should throw if price format is incorrect", () => {
  expect(() => parsePrice("5 000 грнsdffdf.")).toThrow();
  expect(() => parsePrice("грн.")).toThrow();
});
