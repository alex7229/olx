import * as _ from "lodash";
import { InsertWriteOpResult } from "mongodb";
import {
  addCurrencyRatesQuery,
  ICurrencyExchangeRate
} from "../../../../application/database/queries/currencyRates/addCurrencyRatesQuery";
import { runQueryFactory } from "../../utils/runQueryFactory";
import { fetchCurrencyRateQueryFactory } from "./fetchCurrencyRateQueryFactory";

export const currencyRateCollection = "currency_rate";

export type AddCurrencyRateQueryFactory = (
  exchangeRates: ICurrencyExchangeRate[]
) => Promise<InsertWriteOpResult>;

export const addCurrencyRateQueryFactory: AddCurrencyRateQueryFactory = exchangeRates => {
  const query = addCurrencyRatesQuery(
    currencyRateCollection,
    exchangeRates,
    fetchCurrencyRateQueryFactory,
    _.uniqWith
  );
  return runQueryFactory(query);
};
