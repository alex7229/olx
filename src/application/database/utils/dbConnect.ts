import { Db, MongoClientOptions } from "mongodb";

export interface IMongoClientInstance {
  connect(): Promise<IMongoClientInstance>;
  isConnected(): boolean;
  close(): Promise<void>;
  db(dbName?: string): Db;
}

export interface IMongoClient {
  new (uri: string, options?: MongoClientOptions): IMongoClientInstance;
}

export interface IDbConnection {
  clientInstance: IMongoClientInstance;
  db: Db;
}

export type DbConnect = (
  uri: string,
  dbName: string,
  MongoClient: IMongoClient
) => Promise<IDbConnection>;

export const dbConnect: DbConnect = async (uri, dbName, MongoClient) => {
  let clientInstance = new MongoClient(uri, { useNewUrlParser: true });
  clientInstance = await clientInstance.connect();
  return {
    clientInstance,
    db: clientInstance.db(dbName)
  };
};
