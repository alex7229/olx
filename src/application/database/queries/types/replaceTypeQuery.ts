import { Db, ReplaceWriteOpResult } from "mongodb";
import { Query } from "../../utils/runQuery";
import { IAdvertisementType } from "./saveNewTypeQuery";

export type ReplaceTypeQuery = (
  collectionName: string,
  mongoId: string,
  advertisementType: IAdvertisementType
) => Query<ReplaceWriteOpResult>;

export const replaceTypeQuery: ReplaceTypeQuery = (
  collectionName,
  mongoId,
  advertisementType
) => async (db: Db) => {
  const collection = db.collection(collectionName);
  const filterOptions = { _id: { $eq: mongoId } };
  return collection.replaceOne(filterOptions, advertisementType);
};
