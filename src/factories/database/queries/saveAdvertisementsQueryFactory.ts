import { InsertWriteOpResult } from "mongodb";
import { runQuery } from "../../../application/database/databaseWrappers";
import { getConnectionInfo } from "../../../application/database/getConnectionInfo";
import { IAdvertisement } from "../../../application/database/queries/fetchAdvertisementsQuery";
import { saveAdvertisementsQuery } from "../../../application/database/queries/saveAdvertisementsQuery";
import { advertisementsCollectionName } from "./fetchAdvertisementQueryFactory";

type SaveAdvertisementsQueryFactory = (
  advertisements: IAdvertisement[]
) => Promise<InsertWriteOpResult>;

export const saveAdvertisementsQueryFactory: SaveAdvertisementsQueryFactory = async advertisements => {
  const connectionInfo = getConnectionInfo(process.env);
  const query = saveAdvertisementsQuery(
    advertisementsCollectionName,
    advertisements
  );
  return runQuery(connectionInfo.uri, connectionInfo.dbName, query);
};
