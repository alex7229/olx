import { IDbConnection } from "../../../application/database/utils/dbConnect";
import { Query, runQuery } from "../../../application/database/utils/runQuery";
import { dbConnectFactory } from "./dbConnectFactory";
import { getConnectionInfoFactory } from "./getConnectionInfoFactory";

export type RunQueryFactory = <T>(query: Query<T>) => Promise<T>;

let connection: IDbConnection | null = null;

export const runQueryFactory: RunQueryFactory = async query => {
  const { uri, dbName } = getConnectionInfoFactory();
  if (connection === null) {
    connection = await dbConnectFactory(uri, dbName);
  }
  const result = await runQuery(
    uri,
    dbName,
    query,
    dbConnectFactory,
    connection
  );
  connection = result.connection;
  return result.queryResult;
};
