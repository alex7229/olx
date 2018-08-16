import { ICurrencyExchangeRate } from "../database/queries/currencyRates/addCurrencyRatesQuery";

interface IPrivatApiExchangeRate {
  base_ccy: string;
  buy: string;
  ccy: string;
  sale: string;
}

export type PrivatApiResponse = IPrivatApiExchangeRate[];

export type ParsePrivatApi = (
  response: PrivatApiResponse
) => ICurrencyExchangeRate[];

export const parsePrivatApi: ParsePrivatApi = response =>
  response.map(exchangeRate => ({
    baseCurrency: {
      name: exchangeRate.base_ccy,
      values: {
        buy: parseFloat(exchangeRate.buy),
        sell: parseFloat(exchangeRate.sale)
      }
    },
    convertedCurrency: exchangeRate.ccy
  }));
