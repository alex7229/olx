import {
  Collection,
  Db,
  DeleteWriteOpResultObject,
  FilterQuery
} from "mongodb";
import { Query } from "../../utils/runQuery";

export interface IRemoveAdvertisementsOptions {
  ids?: number[];
  timeLimit?: {
    fromTime: number;
    toTime: number;
  };
}

type RemoveAdvertisementsQuery = (
  collectionName: string,
  options: IRemoveAdvertisementsOptions
) => Query<DeleteWriteOpResultObject>;

export const removeAdvertisementsQuery: RemoveAdvertisementsQuery = (
  collectionName,
  options
) => async (db: Db) => {
  if (Object.keys(options).length === 0) {
    throw new Error("at least one option should be specified");
  }
  const queryOptions: FilterQuery<any> = {};
  if (options.timeLimit) {
    queryOptions.time = {
      $gte: options.timeLimit.fromTime,
      $lte: options.timeLimit.toTime
    };
  }
  if (options.ids) {
    queryOptions.id = { $in: options.ids };
  }
  const collection: Collection = db.collection(collectionName);
  return collection.deleteMany(queryOptions);
};
