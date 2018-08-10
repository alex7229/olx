// this file is originally copypasted from https://github.com/tup1tsa/running_statistics/
import { Db, MongoClient } from "mongodb";

export interface IDbConnection {
  clientInstance: MongoClient;
  db: Db;
}

export type Connect = (uri: string, dbName: string) => Promise<IDbConnection>;

type Disconnect = (client: MongoClient) => Promise<void>;

export type Query<T> = (db: Db) => Promise<T>;
export type RunQuery = <T>(
  uri: string,
  dbName: string,
  query: Query<T>
) => Promise<T>;

export const connect: Connect = async (uri, dbName) => {
  const clientInstance = await MongoClient.connect(
    uri,
    {
      useNewUrlParser: true
    }
  );
  return {
    clientInstance,
    db: clientInstance.db(dbName)
  };
};

export const disconnect: Disconnect = async client => {
  await client.close();
};

export const runQuery: RunQuery = async (uri, dbName, query) => {
  const connection = await connect(
    uri,
    dbName
  );
  const result = await query(connection.db);
  await connection.clientInstance.close();
  return result;
};
