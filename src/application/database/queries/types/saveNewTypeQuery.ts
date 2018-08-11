import { Collection, Db, InsertOneWriteOpResult } from "mongodb";
import { Query } from "../../utils/runQuery";

export interface IAdvertisementType {
  regExp: string;
  type: string;
  url: string;
}

export type SaveNewTypeQuery = (
  collectionName: string,
  advertisementType: IAdvertisementType
) => Query<InsertOneWriteOpResult>;

export const saveNewTypeQuery: SaveNewTypeQuery = (
  collectionName,
  advertisementType
) => async (db: Db) => {
  const collection: Collection = db.collection(collectionName);
  const typeIndex = collection.createIndex({ type: 1 }, { unique: true });
  const urlRegExpIndex = collection.createIndex(
    { url: 1, regExp: 1 },
    { unique: true }
  );
  await Promise.all([typeIndex, urlRegExpIndex]);
  return collection.insertOne(advertisementType);
};
