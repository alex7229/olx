import { DeleteWriteOpResultObject } from "mongodb";
import {
  IRemoveAdvertisementsOptions,
  removeAdvertisementsQuery
} from "../../../../application/database/queries/advertisements/removeAdvertisementsQuery";
import { runQueryFactory } from "../../utils/runQueryFactory";
import { advertisementsCollectionName } from "./fetchAdvertisementQueryFactory";

type RemoveAdvertisementsQueryFactory = (
  options: IRemoveAdvertisementsOptions
) => Promise<DeleteWriteOpResultObject>;

export const removeAdvertisementsQueryFactory: RemoveAdvertisementsQueryFactory = async options => {
  const query = removeAdvertisementsQuery(
    advertisementsCollectionName,
    options
  );
  return runQueryFactory(query);
};
