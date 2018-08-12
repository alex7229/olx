import { Db, DeleteWriteOpResultObject } from "mongodb";
import { Query } from "../../utils/runQuery";

export type RemoveFromSoldQuery = (
  collectionName: string,
  advertisementId: number
) => Query<DeleteWriteOpResultObject>;

export const removeFromSoldQuery: RemoveFromSoldQuery = (
  collectionName,
  advertisementId
) => async (db: Db) => {
  const collection = db.collection(collectionName);
  const options = { advertisementId: { $eq: advertisementId } };
  return collection.deleteOne(options);
};
