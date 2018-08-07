import { Db, DeleteWriteOpResultObject } from "mongodb";
import { Query } from "../../databaseWrappers";

export type RemoveTypeQuery = (
  collectionName: string,
  type: string
) => Query<DeleteWriteOpResultObject>;

export const removeTypeQuery: RemoveTypeQuery = (
  collectionName,
  type
) => async (db: Db) => {
  const collection = db.collection(collectionName);
  const filter = { type: { $eq: type } };
  return collection.deleteOne(filter);
};
