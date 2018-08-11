import {
  generateAdvertisementsQueryOptions,
  IAdvertisementsQueryOptions
} from "../../../../application/database/generateAdvertisementsQueryOptions";
import {
  fetchAdvertisementsQuery,
  IAdvertisement
} from "../../../../application/database/queries/advertisements/fetchAdvertisementsQuery";
import { getConnectionInfo } from "../../../../application/database/utils/getConnectionInfo";
import { runQueryFactory } from "../../utils/runQueryFactory";

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
  return runQueryFactory(connectionInfo.uri, connectionInfo.dbName, query);
};
