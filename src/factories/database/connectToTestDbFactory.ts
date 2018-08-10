import * as dotenv from "dotenv";
import {
  connect,
  IDbConnection
} from "../../application/database/databaseWrappers";
import { getConnectionInfo } from "../../application/database/getConnectionInfo";

type ConnectToTestDbFactory = (dbName: string) => Promise<IDbConnection>;

dotenv.load();

export const connectToTestDbFactory: ConnectToTestDbFactory = async dbName => {
  const connectionInfo = getConnectionInfo(process.env);
  return connect(
    connectionInfo.uri,
    dbName
  );
};
