import { Collection, Db, InsertOneWriteOpResult } from "mongodb";
import { Query } from "../../databaseWrappers";

export interface IAdvertisementType {
  regExp: string;
  type: string;
  url: string;
}

type SaveNewTypeQuery = (
  collectionName: string,
  advertisementType: IAdvertisementType
) => Query<InsertOneWriteOpResult>;

export const saveNewTypeQuery: SaveNewTypeQuery = (
  collectionName,
  advertisementType
) => async (db: Db) => {
  const collection: Collection = db.collection(collectionName);
  await collection.createIndex({ type: 1 }, { unique: true });
  await collection.createIndex({ url: 1, regExp: 1 }, { unique: true });
  return collection.insertOne(advertisementType);
};
