import { DeleteWriteOpResultObject, InsertWriteOpResult } from "mongodb";
import { runQuery } from "../../application/database/databaseWrappers";
import {
  generateQueryOptions,
  IQueryOptions
} from "../../application/database/generateQueryOptions";
import { getConnectionInfo } from "../../application/database/getConnectionInfo";
import {
  fetchAdvertisements,
  IAdvertisement,
  removeAdvertisements,
  saveAdvertisements
} from "../../application/database/queries";

type SaveAdvertisementsFactory = (
  advertisements: IAdvertisement[]
) => Promise<InsertWriteOpResult>;

type FetchAdvertisementsFactory = (
  options: IQueryOptions
) => Promise<IAdvertisement[]>;

type RemoveAdvertisementsFactory = (
  options: IQueryOptions
) => Promise<DeleteWriteOpResultObject>;

const advertisementsCollectionName = "advertisements";

export const saveAdvertisementsFactory: SaveAdvertisementsFactory = async advertisements => {
  const connectionInfo = getConnectionInfo(process.env);
  const query = saveAdvertisements(
    advertisementsCollectionName,
    advertisements
  );
  return runQuery(connectionInfo.uri, connectionInfo.dbName, query);
};

export const fetchAdvertisementsFactory: FetchAdvertisementsFactory = async options => {
  const connectionInfo = getConnectionInfo(process.env);
  const query = fetchAdvertisements(
    advertisementsCollectionName,
    generateQueryOptions(options)
  );
  return runQuery(connectionInfo.uri, connectionInfo.dbName, query);
};

export const removeAdvertisementsFactory: RemoveAdvertisementsFactory = async options => {
  const connectionInfo = getConnectionInfo(process.env);
  const query = removeAdvertisements(
    advertisementsCollectionName,
    generateQueryOptions(options)
  );
  return runQuery(connectionInfo.uri, connectionInfo.dbName, query);
};
