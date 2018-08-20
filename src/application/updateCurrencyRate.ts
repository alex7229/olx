import { InsertWriteOpResult } from "mongodb";
import { AddCurrencyRateQueryFactory } from "../factories/database/queries/currencyRates/addCurrencyRateQueryFactory";
import { FetchFactory } from "../factories/network/utils/fetchFactory";
import { ValidatePrivatApiFactory } from "../factories/validators/validatePrivatApiFactory";
import { ParsePrivatApi } from "./parsers/parsePrivatApi";

export type UpdateCurrencyRate = (
  fetch: FetchFactory,
  validatePrivatApi: ValidatePrivatApiFactory,
  parsePrivatApi: ParsePrivatApi,
  addCurrencyRateQuery: AddCurrencyRateQueryFactory
) => Promise<InsertWriteOpResult>;

export const updateCurrencyRate: UpdateCurrencyRate = async (
  fetch,
  validatePrivatApi,
  parsePrivatApi,
  addCurrencyRateQuery
) => {
  const response = await fetch(
    "https://api.privatbank.ua/p24api/pubinfo?json=true&exchange=&coursid=11",
    true
  );
  if (!validatePrivatApi(response.data)) {
    throw new Error("privat api response is not valid");
  }
  const exchangeRates = parsePrivatApi(response.data);
  return addCurrencyRateQuery(exchangeRates);
};
