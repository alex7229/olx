import { ReplaceWriteOpResult } from "mongodb";
import { replaceTypeQuery } from "../../../../application/database/queries/types/replaceTypeQuery";
import { IAdvertisementType } from "../../../../application/database/queries/types/saveNewTypeQuery";
import { runQueryFactory } from "../../utils/runQueryFactory";
import { typesCollectionName } from "./fetchTypesQueryFactory";

export type ReplaceTypeQueryFactory = (
  typeName: string,
  advertisementType: IAdvertisementType
) => Promise<ReplaceWriteOpResult>;

export const replaceTypeQueryFactory: ReplaceTypeQueryFactory = async (
  typeName,
  advertisementType
) => {
  const query = replaceTypeQuery(
    typesCollectionName,
    typeName,
    advertisementType
  );
  return runQueryFactory(query);
};
