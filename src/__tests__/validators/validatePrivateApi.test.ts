import * as Ajv from "ajv";
import { validatePrivatApi } from "../../application/validators/validatePrivatApi";

it("should return false if response is incorrect", () => {
  const totallyBadResponse = { cat: "meow" };
  const invalidKey = [
    { ccy: "USD", base_ccy: "UAH", buy: "27.30000", sale: "27.62431" },
    { ccy: "BTC", bcy: "USD", buy: "5792.5395", sale: "6402.2805" }
  ];
  const extraKey = [
    {
      base_ccy: "UAH",
      buy: "27.30000",
      ccy: "USD",
      dog: "woof",
      sale: "27.62431"
    }
  ];
  const invalidSale = [
    { ccy: "USD", base_ccy: "UAH", buy: "27.30000", sale: "notNumber" }
  ];
  const invalidBuy = [
    { ccy: "USD", base_ccy: "UAH", buy: "25.56.54", sale: "56" }
  ];
  expect(validatePrivatApi(totallyBadResponse, Ajv)).toBe(false);
  expect(validatePrivatApi(invalidKey, Ajv)).toBe(false);
  expect(validatePrivatApi(extraKey, Ajv)).toBe(false);
  expect(validatePrivatApi(invalidSale, Ajv)).toBe(false);
  expect(validatePrivatApi(invalidBuy, Ajv)).toBe(false);
});
