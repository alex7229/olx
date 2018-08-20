import { Db, FilterQuery } from "mongodb";
import { Query } from "../../utils/runQuery";
import { ISoldItem } from "./addToSoldQuery";

export type FetchSoldItemsQuery = (
  collectionName: string,
  options?: {
    ids?: number[];
    type?: string;
  }
) => Query<ISoldItem[]>;

export const fetchSoldItemsQuery: FetchSoldItemsQuery = (
  collectionName,
  options
) => async (db: Db) => {
  const collection = db.collection(collectionName);
  const queryOptions: FilterQuery<any> = {};
  if (options && options.type) {
    queryOptions.type = { $eq: options.type };
  }
  if (options && options.ids) {
    queryOptions.advertisementId = { $in: options.ids };
  }
  return collection.find(queryOptions).toArray();
};
