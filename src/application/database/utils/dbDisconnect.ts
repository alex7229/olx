import { IMongoClientInstance } from "./dbConnect";

export type DbDisconnect = (client: IMongoClientInstance) => Promise<void>;

export const dbDisconnect: DbDisconnect = async client => {
  await client.close();
};
