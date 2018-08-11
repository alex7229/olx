import { InsertWriteOpResult } from "mongodb";
import { IAdvertisement } from "../../../../application/database/queries/advertisements/fetchAdvertisementsQuery";
import { saveAdvertisementsQuery } from "../../../../application/database/queries/advertisements/saveAdvertisementsQuery";
import { getConnectionInfo } from "../../../../application/database/utils/getConnectionInfo";
import { runQueryFactory } from "../../utils/runQueryFactory";
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
  return runQueryFactory(connectionInfo.uri, connectionInfo.dbName, query);
};
