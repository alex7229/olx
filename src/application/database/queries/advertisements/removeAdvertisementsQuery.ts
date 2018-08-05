import {
  Collection,
  Db,
  DeleteWriteOpResultObject,
  FilterQuery
} from "mongodb";
import { Query } from "../../databaseWrappers";

type RemoveAdvertisementsQuery = (
  collectionName: string,
  options: FilterQuery<any>
) => Query<DeleteWriteOpResultObject>;

export const removeAdvertisementsQuery: RemoveAdvertisementsQuery = (
  collectionName,
  options
) => async (db: Db) => {
  if (Object.keys(options).length === 0) {
    throw new Error("at least one option should be specified");
  }
  const collection: Collection = db.collection(collectionName);
  return collection.deleteMany(options);
};
