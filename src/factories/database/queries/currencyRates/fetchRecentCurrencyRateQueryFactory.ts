import { ObjectID } from "mongodb";
import { ICurrencyExchangeRate } from "../../../../application/database/queries/currencyRates/addCurrencyRateQuery";
import { fetchRecentCurrencyRateQuery } from "../../../../application/database/queries/currencyRates/fetchRecentCurrencyRateQuery";
import { runQueryFactory } from "../../utils/runQueryFactory";
import { currencyRateCollection } from "./addCurrencyRateQueryFactory";

export type FetchRecentCurrencyRateQueryFactory = (
  mainCurrency: string,
  additionalCurrency: string
) => Promise<ICurrencyExchangeRate | null>;

export const fetchRecentCurrencyRateQueryFactory: FetchRecentCurrencyRateQueryFactory = async (
  mainCurrency,
  additionalCurrency
) => {
  const query = fetchRecentCurrencyRateQuery(
    currencyRateCollection,
    mainCurrency,
    additionalCurrency,
    ObjectID
  );
  return runQueryFactory(query);
};
