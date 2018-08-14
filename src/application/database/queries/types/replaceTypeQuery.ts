import { Db, ReplaceWriteOpResult } from "mongodb";
import { Query } from "../../utils/runQuery";
import { IAdvertisementType } from "./saveNewTypeQuery";

export type ReplaceTypeQuery = (
  collectionName: string,
  typeName: string,
  advertisementType: IAdvertisementType
) => Query<ReplaceWriteOpResult>;

export const replaceTypeQuery: ReplaceTypeQuery = (
  collectionName,
  typeName,
  advertisementType
) => async (db: Db) => {
  const collection = db.collection(collectionName);
  const filterOptions = { type: { $eq: typeName } };
  return collection.replaceOne(filterOptions, advertisementType);
};
