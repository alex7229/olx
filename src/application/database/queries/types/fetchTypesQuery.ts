import { Collection, Db } from "mongodb";
import { Query } from "../../utils/runQuery";
import { IAdvertisementType } from "./saveNewTypeQuery";

export type FetchTypesQuery = (
  collectionName: string,
  type?: string
) => Query<IAdvertisementType[]>;

export const fetchTypesQuery: FetchTypesQuery = (
  collectionName,
  type
) => async (db: Db) => {
  const collection: Collection = db.collection(collectionName);
  const options = type ? { type: { $eq: type } } : {};
  return collection.find(options).toArray();
};
