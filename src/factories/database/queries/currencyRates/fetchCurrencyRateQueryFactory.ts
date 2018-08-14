import { ObjectID } from "mongodb";
import {
  fetchCurrencyRateQuery,
  ICurrencyExchangeRateWithTime
} from "../../../../application/database/queries/currencyRates/fetchCurrencyRateQuery";
import { runQueryFactory } from "../../utils/runQueryFactory";
import { currencyRateCollection } from "./addCurrencyRateQueryFactory";

export type FetchCurrencyRateQueryFactory = (
  specificCurrencies?: {
    baseCurrency: string;
    convertedCurrency: string;
  }
) => Promise<ICurrencyExchangeRateWithTime | null>;

export const fetchCurrencyRateQueryFactory: FetchCurrencyRateQueryFactory = async specificCurrencies => {
  const query = fetchCurrencyRateQuery(
    currencyRateCollection,
    ObjectID,
    specificCurrencies
  );
  return runQueryFactory(query);
};
