import { Db } from "mongodb";
import { Query } from "../../utils/runQuery";
import { ISoldItem } from "./addToSoldQuery";

export type FetchSoldItemsQuery = (
  collectionName: string,
  type?: string
) => Query<ISoldItem[]>;

export const fetchSoldItemsQuery: FetchSoldItemsQuery = (
  collectionName,
  type
) => async (db: Db) => {
  const collection = db.collection(collectionName);
  const options = type ? { type: { $eq: type } } : {};
  return collection.find(options).toArray();
};
