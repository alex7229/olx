import { MongoClient } from "mongodb";
import {
  dbConnect,
  IDbConnection
} from "../../../application/database/utils/dbConnect";

export type DbConnectFactory = (
  uri: string,
  dbName: string
) => Promise<IDbConnection>;

export const dbConnectFactory: DbConnectFactory = (uri, dbName) =>
  dbConnect(uri, dbName, MongoClient);
