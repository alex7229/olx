import { IDbConnection } from "../../../application/database/utils/dbConnect";
import { Query, runQuery } from "../../../application/database/utils/runQuery";
import { dbConnectFactory } from "./dbConnectFactory";

export type RunQueryFactory = <T>(
  uri: string,
  dbName: string,
  query: Query<T>
) => Promise<T>;

let connection: IDbConnection | null = null;

export const runQueryFactory: RunQueryFactory = async (uri, dbName, query) => {
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
