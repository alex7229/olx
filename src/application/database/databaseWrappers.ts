// this file is originally copypasted from https://github.com/tup1tsa/running_statistics/
import { Db, MongoClient } from "mongodb";

export type Query<T> = (db: Db) => Promise<T>;

export const connect = async (uri: string, dbName: string) => {
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

export const disconnect = async (client: MongoClient) => {
  await client.close();
};

export const runQuery = async <T>(
  uri: string,
  dbName: string,
  query: Query<T>
) => {
  const { clientInstance, db } = await connect(
    uri,
    dbName
  );
  const result = await query(db);
  await clientInstance.close();
  return result;
};
