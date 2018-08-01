import {
  Collection,
  Db,
  DeleteWriteOpResultObject,
  FilterQuery,
  InsertWriteOpResult
} from "mongodb";
import { ILocation } from "../parsers/searchPageItem/parseLocation";
import { Price } from "../parsers/searchPageItem/parsePrice";
import { Query } from "./databaseWrappers";

export interface IAdvertisement {
  id: number;
  location: ILocation;
  olxDelivery: boolean;
  price: Price;
  promoted: boolean;
  time: number;
  title: string;
  type: string;
  url: {
    fullUrl: string;
    uniqueName: string;
  };
  user: {
    id: string;
    name: string;
  };
}

type SaveAdvertisements = (
  collectionName: string,
  advertisements: IAdvertisement[]
) => Query<InsertWriteOpResult>;

type FetchAdvertisements = (
  collectionName: string,
  options: FilterQuery<any>
) => Query<IAdvertisement[]>;

type RemoveAdvertisements = (
  collectionName: string,
  options: FilterQuery<any>
) => Query<DeleteWriteOpResultObject>;

export const saveAdvertisements: SaveAdvertisements = (
  collectionName,
  advertisements
) => async (db: Db) => {
  const collection: Collection = db.collection(collectionName);
  return collection.insertMany(advertisements);
};

export const fetchAdvertisements: FetchAdvertisements = (
  collectionName,
  options
) => async (db: Db) => {
  const collection: Collection = db.collection(collectionName);
  const cursor = await collection.find(options);
  return cursor.toArray();
};

export const removeAdvertisements: RemoveAdvertisements = (
  collectionName,
  options
) => async (db: Db) => {
  if (Object.keys(options).length === 0) {
    throw new Error("at least one option should be specified");
  }
  const collection: Collection = db.collection(collectionName);
  return collection.deleteMany(options);
};