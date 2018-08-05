import { runQuery } from "../../../../application/database/databaseWrappers";
import {
  generateAdvertisementsQueryOptions,
  IAdvertisementsQueryOptions
} from "../../../../application/database/generateAdvertisementsQueryOptions";
import { getConnectionInfo } from "../../../../application/database/getConnectionInfo";
import {
  fetchAdvertisementsQuery,
  IAdvertisement
} from "../../../../application/database/queries/advertisements/fetchAdvertisementsQuery";

export const advertisementsCollectionName = "advertisements";

type FetchAdvertisementsQueryFactory = (
  options: IAdvertisementsQueryOptions
) => Promise<IAdvertisement[]>;

export const fetchAdvertisementsQueryFactory: FetchAdvertisementsQueryFactory = async options => {
  const connectionInfo = getConnectionInfo(process.env);
  const query = fetchAdvertisementsQuery(
    advertisementsCollectionName,
    generateAdvertisementsQueryOptions(options)
  );
  return runQuery(connectionInfo.uri, connectionInfo.dbName, query);
};
