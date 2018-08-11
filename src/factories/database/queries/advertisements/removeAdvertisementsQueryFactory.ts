import { DeleteWriteOpResultObject } from "mongodb";
import {
  generateAdvertisementsQueryOptions,
  IAdvertisementsQueryOptions
} from "../../../../application/database/generateAdvertisementsQueryOptions";
import { removeAdvertisementsQuery } from "../../../../application/database/queries/advertisements/removeAdvertisementsQuery";
import { getConnectionInfo } from "../../../../application/database/utils/getConnectionInfo";
import { runQueryFactory } from "../../utils/runQueryFactory";
import { advertisementsCollectionName } from "./fetchAdvertisementQueryFactory";

type RemoveAdvertisementsQueryFactory = (
  options: IAdvertisementsQueryOptions
) => Promise<DeleteWriteOpResultObject>;

export const removeAdvertisementsQueryFactory: RemoveAdvertisementsQueryFactory = async options => {
  const connectionInfo = getConnectionInfo(process.env);
  const query = removeAdvertisementsQuery(
    advertisementsCollectionName,
    generateAdvertisementsQueryOptions(options)
  );
  return runQueryFactory(connectionInfo.uri, connectionInfo.dbName, query);
};
