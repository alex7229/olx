import { Db } from "mongodb";
import { DbConnectFactory } from "../../../factories/database/utils/dbConnectFactory";
import { IDbConnection } from "./dbConnect";

export type Query<T> = (db: Db) => Promise<T>;
export type RunQuery = <T>(
  uri: string,
  dbName: string,
  query: Query<T>,
  connectFunc: DbConnectFactory,
  previousConnection: IDbConnection
) => Promise<{ queryResult: T; connection: IDbConnection }>;

export const runQuery: RunQuery = async (
  uri,
  dbName,
  query,
  connectFunc,
  previousConnection
) => {
  const connection =
    previousConnection && previousConnection.clientInstance.isConnected()
      ? previousConnection
      : await connectFunc(uri, dbName);
  const queryResult = await query(connection.db);
  return { queryResult, connection };
};
