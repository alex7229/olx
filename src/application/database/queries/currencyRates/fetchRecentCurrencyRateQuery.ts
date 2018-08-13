import { Db } from "mongodb";
import { Query } from "../../utils/runQuery";
import { ICurrencyExchangeRate } from "./addCurrencyRateQuery";

export interface IObjectId {
  createFromTime(
    time: number
  ): {
    toHexString(): string;
  };
}

export type FetchRecentCurrencyRateQuery = (
  collectionName: string,
  mainCurrency: string,
  additionalCurrency: string,
  ObjectId: IObjectId
) => Query<ICurrencyExchangeRate | null>;

export const fetchRecentCurrencyRateQuery: FetchRecentCurrencyRateQuery = (
  collectionName,
  mainCurrency,
  additionalCurrency,
  ObjectId
) => async (db: Db) => {
  const collection = db.collection(collectionName);
  const currentTime = new Date().getTime();
  const oneDayAgo = currentTime - 24 * 60 * 60 * 1000;
  const mongoId = ObjectId.createFromTime(oneDayAgo);
  const options = { _id: { $gt: mongoId } };
  const result = await collection.find(options).toArray();
  if (result.length === 0) {
    return null;
  }
  if (result.length === 1) {
    return result[0];
  }
  throw new Error(
    "Multiple recent rates are available. " +
      "Something is wrong with currency collection"
  );
};
