import { Db, InsertOneWriteOpResult, ObjectID } from "mongodb";
import { Query } from "../../utils/runQuery";
import {
  FetchRecentCurrencyRateQuery,
  IObjectId
} from "./fetchRecentCurrencyRateQuery";

export interface ICurrencyExchangeRate {
  _id?: ObjectID;
  additionalCurrency: {
    name: string;
    value: number;
  };
  mainCurrencyName: string;
}

export type AddCurrencyRateQuery = (
  collectionName: string,
  exchangeRate: ICurrencyExchangeRate,
  fetchRecentCurrencyExchangeRate: FetchRecentCurrencyRateQuery,
  ObjectId: IObjectId
) => Query<InsertOneWriteOpResult>;

export const addCurrencyRateQuery: AddCurrencyRateQuery = (
  collectionName,
  exchangeRate,
  fetchLatestCurrencyRateQuery,
  ObjectId
) => async (db: Db) => {
  const collection = db.collection(collectionName);
  const recentRate = await fetchLatestCurrencyRateQuery(
    collectionName,
    exchangeRate.mainCurrencyName,
    exchangeRate.additionalCurrency.name,
    ObjectId
  )(db);
  if (recentRate === null) {
    return collection.insertOne(exchangeRate);
  }
  throw new Error(
    "Cannot save new exchange rate. Non-obsolete rate is present"
  );
};
