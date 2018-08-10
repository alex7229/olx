import * as dotenv from "dotenv";
import { Db, MongoClient } from "mongodb";
import { connect } from "../../application/database/databaseWrappers";
import { getConnectionInfo } from "../../application/database/getConnectionInfo";

export interface IDbConnection {
  client: MongoClient;
  db: Db;
}

type ConnectToTestDbFactory = (dbName: string) => Promise<IDbConnection>;

dotenv.load();

export const connectToTestDbFactory: ConnectToTestDbFactory = async name => {
  const connectionInfo = getConnectionInfo(process.env);
  const result = await connect(
    connectionInfo.uri,
    name
  );
  return { client: result.clientInstance, db: result.db };
};
