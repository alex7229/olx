import { MongoClient } from "mongodb";
import {
  dbConnect,
  IDbConnection
} from "../../application/database/utils/dbConnect";
import { getConnectionInfoFactory } from "./utils/getConnectionInfoFactory";

type ConnectToTestDbFactory = (dbName: string) => Promise<IDbConnection>;

export const connectToTestDbFactory: ConnectToTestDbFactory = async dbName => {
  const connectionInfo = getConnectionInfoFactory();
  return dbConnect(connectionInfo.uri, dbName, MongoClient);
};
