import { parsePrice } from "../../../application/parsers/searchPageItem/parsePrice";

it("should parse price properly", () => {
  expect(parsePrice("5 000 грн.")).toEqual({ currency: "UAH", value: 5000 });
  expect(parsePrice("758 $")).toEqual({ currency: "USD", value: 758 });
  expect(parsePrice("178 €")).toEqual({ currency: "EUR", value: 178 });
});

it("should return null if price is set as exchange", () => {
  const price = "Обмен";
  expect(parsePrice(price)).toBe(null);
});

it("should throw if price format is incorrect", () => {
  expect(() => parsePrice("5 000 грнsdffdf.")).toThrow();
  expect(() => parsePrice("грн.")).toThrow();
});
