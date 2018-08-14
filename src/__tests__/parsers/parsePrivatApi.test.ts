import { ICurrencyExchangeRate } from "../../application/database/queries/currencyRates/addCurrencyRatesQuery";
import { parsePrivatApi } from "../../application/parsers/parsePrivatApi";

it("should parse response properly", () => {
  const response = [
    { ccy: "USD", base_ccy: "UAH", buy: "27.30000", sale: "27.62431" },
    { ccy: "BTC", base_ccy: "USD", buy: "5792.5395", sale: "6402.2805" }
  ];
  const currencyRates: ICurrencyExchangeRate[] = [
    {
      baseCurrency: {
        name: "UAH",
        values: {
          buy: 27.3,
          sell: 27.62431
        }
      },
      convertedCurrency: "USD"
    },
    {
      baseCurrency: {
        name: "USD",
        values: {
          buy: 5792.5395,
          sell: 6402.2805
        }
      },
      convertedCurrency: "BTC"
    }
  ];
  expect(parsePrivatApi(response)).toEqual(currencyRates);
});
