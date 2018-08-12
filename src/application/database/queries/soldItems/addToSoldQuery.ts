import { Db, InsertWriteOpResult } from "mongodb";
import { Query } from "../../utils/runQuery";

export interface ISoldItem {
  advertisementId: number;
  price: number;
  type: string;
}

export type AddToSoldQuery = (
  collectionName: string,
  soldItems: ISoldItem[]
) => Query<InsertWriteOpResult>;

export const addToSoldQuery: AddToSoldQuery = (
  collectionName,
  soldItems
) => async (db: Db) => {
  const collection = db.collection(collectionName);
  await collection.createIndex({ advertisementId: 1 }, { unique: true });
  return collection.insertMany(soldItems);
};
