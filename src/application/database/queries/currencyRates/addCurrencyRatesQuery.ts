import { Db, InsertWriteOpResult, ObjectID } from "mongodb";
import { FetchCurrencyRateQueryFactory } from "../../../../factories/database/queries/currencyRates/fetchCurrencyRateQueryFactory";
import { Query } from "../../utils/runQuery";

type Comparator<T> = (a: T, b: T) => boolean;

export type UniqWith<T> = (list: T[], comparator?: Comparator<T>) => T[];

export interface ICurrencyExchangeRate {
  _id?: ObjectID;
  baseCurrency: {
    name: string;
    values: {
      buy: number;
      sell: number;
    };
  };
  convertedCurrency: string;
}

export type AddCurrencyRatesQuery = (
  collectionName: string,
  exchangeRates: ICurrencyExchangeRate[],
  fetchCurrencyRateQueryFactory: FetchCurrencyRateQueryFactory,
  uniqWith: UniqWith<ICurrencyExchangeRate>
) => Query<InsertWriteOpResult>;

export const addCurrencyRatesQuery: AddCurrencyRatesQuery = (
  collectionName,
  exchangeRates,
  fetchCurrencyRateQueryFactory,
  uniqWith
) => async (db: Db) => {
  const comparator: Comparator<ICurrencyExchangeRate> = (a, b) =>
    a.baseCurrency.name === b.baseCurrency.name &&
    a.convertedCurrency === b.convertedCurrency;
  const uniqueRates = uniqWith(exchangeRates, comparator);
  if (uniqueRates.length < exchangeRates.length) {
    throw new Error("duplicate rates entries");
  }

  const collection = db.collection(collectionName);
  const anyRecentRate = await fetchCurrencyRateQueryFactory();
  if (anyRecentRate === null) {
    return collection.insertMany(exchangeRates);
  }
  const currentTime = new Date().getTime();
  const oneDayMs = 24 * 60 * 60 * 1000;
  const isObsolete = currentTime - anyRecentRate.updateTime > oneDayMs;
  if (isObsolete) {
    return collection.insertMany(exchangeRates);
  }
  throw new Error("rates were updated recently");
};
