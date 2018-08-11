import { Collection, Db, InsertWriteOpResult } from "mongodb";
import { Query } from "../../utils/runQuery";
import { IAdvertisement } from "./fetchAdvertisementsQuery";

type SaveAdvertisementsQuery = (
  collectionName: string,
  advertisements: IAdvertisement[]
) => Query<InsertWriteOpResult>;

export const saveAdvertisementsQuery: SaveAdvertisementsQuery = (
  collectionName,
  advertisements
) => async (db: Db) => {
  const collection: Collection = db.collection(collectionName);
  return collection.insertMany(advertisements);
};
