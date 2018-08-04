import { DeleteWriteOpResultObject } from "mongodb";
import { runQuery } from "../../../application/database/databaseWrappers";
import {
  generateAdvertisementsQueryOptions,
  IAdvertisementsQueryOptions
} from "../../../application/database/generateAdvertisementsQueryOptions";
import { getConnectionInfo } from "../../../application/database/getConnectionInfo";
import { removeAdvertisementsQuery } from "../../../application/database/queries/removeAdvertisementsQuery";
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
  return runQuery(connectionInfo.uri, connectionInfo.dbName, query);
};
