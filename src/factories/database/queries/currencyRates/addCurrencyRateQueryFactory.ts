import { InsertOneWriteOpResult, ObjectID } from "mongodb";
import {
  addCurrencyRateQuery,
  ICurrencyExchangeRate
} from "../../../../application/database/queries/currencyRates/addCurrencyRateQuery";
import { fetchRecentCurrencyRateQuery } from "../../../../application/database/queries/currencyRates/fetchRecentCurrencyRateQuery";
import { runQueryFactory } from "../../utils/runQueryFactory";

export const currencyRateCollection = "currency_rate";

export type AddCurrencyRateQueryFactory = (
  exchangeRate: ICurrencyExchangeRate
) => Promise<InsertOneWriteOpResult>;

export const addCurrencyRateQueryFactory: AddCurrencyRateQueryFactory = exchangeRate => {
  const query = addCurrencyRateQuery(
    currencyRateCollection,
    exchangeRate,
    fetchRecentCurrencyRateQuery,
    ObjectID
  );
  return runQueryFactory(query);
};
