import { InsertOneWriteOpResult } from "mongodb";
import {
  IAdvertisementType,
  saveNewTypeQuery
} from "../../../../application/database/queries/types/saveNewTypeQuery";
import { runQueryFactory } from "../../utils/runQueryFactory";
import { typesCollectionName } from "./fetchTypesQueryFactory";

export type SaveNewTypeQueryFactory = (
  advertisementType: IAdvertisementType
) => Promise<InsertOneWriteOpResult>;

export const saveNewTypeQueryFactory: SaveNewTypeQueryFactory = async advertisementType => {
  const query = saveNewTypeQuery(typesCollectionName, advertisementType);
  return runQueryFactory(query);
};
