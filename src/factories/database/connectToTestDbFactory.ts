import * as dotenv from "dotenv";
import { Db, MongoClient } from "mongodb";
import { connect } from "../../application/database/databaseWrappers";
import { getConnectionInfo } from "../../application/database/getConnectionInfo";

export interface IDbConnection {
  clientInstance: MongoClient;
  db: Db;
}

type ConnectToTestDbFactory = (dbName: string) => Promise<IDbConnection>;

dotenv.load();

export const connectToTestDbFactory: ConnectToTestDbFactory = async name => {
  const connectionInfo = getConnectionInfo(process.env);
  return connect(
    connectionInfo.uri,
    name
  );
};
