import { Db, ObjectID } from "mongodb";
import { Query } from "../../utils/runQuery";
import { ICurrencyExchangeRate } from "./addCurrencyRatesQuery";

interface IObjectIdStatic {
  new (id?: string | number | ObjectID): ObjectID;
}

export interface ICurrencyExchangeRateWithTime extends ICurrencyExchangeRate {
  updateTime: number;
}

export type FetchCurrencyRateQuery = (
  collectionName: string,
  ObjectId: IObjectIdStatic,
  specificCurrencies?: {
    baseCurrency: string;
    convertedCurrency: string;
  }
) => Query<ICurrencyExchangeRateWithTime | null>;

export const fetchCurrencyRateQuery: FetchCurrencyRateQuery = (
  collectionName,
  ObjectIdStatic,
  specificCurrencies
) => async (db: Db) => {
  const collection = db.collection(collectionName);
  const options = specificCurrencies
    ? {
        "baseCurrency.name": { $eq: specificCurrencies.baseCurrency },
        convertedCurrency: { $eq: specificCurrencies.convertedCurrency }
      }
    : {};
  const result = await collection
    .find(options)
    .sort({ _id: -1 })
    .limit(1)
    .toArray();
  if (result.length === 0) {
    return null;
  }
  return {
    ...result[0],
    updateTime: new ObjectIdStatic(result[0]._id).getTimestamp().getTime()
  };
};
