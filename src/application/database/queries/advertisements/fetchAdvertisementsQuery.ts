import { Collection, Db, FilterQuery, ObjectID } from "mongodb";
import { ILocation } from "../../../parsers/searchPageItem/parseLocation";
import { Price } from "../../../parsers/searchPageItem/parsePrice";
import { Query } from "../../utils/runQuery";

export interface IAdvertisement {
  _id?: ObjectID;
  active: boolean;
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
  user?: {
    id?: string;
    name: string;
  };
}

export interface IFetchAdvertisementsOptions {
  ids?: number[];
  timeLimit?: {
    fromTime: number;
    toTime: number;
  };
  type?: string;
}

type FetchAdvertisementsQuery = (
  collectionName: string,
  options: IFetchAdvertisementsOptions
) => Query<IAdvertisement[]>;

export const fetchAdvertisementsQuery: FetchAdvertisementsQuery = (
  collectionName,
  options
) => async (db: Db) => {
  const collection: Collection = db.collection(collectionName);
  const queryOptions: FilterQuery<any> = {};
  if (options.type) {
    queryOptions.type = { $eq: options.type };
  }
  if (options.ids) {
    queryOptions.id = { $in: options.ids };
  }
  if (options.timeLimit) {
    queryOptions.time = {
      $gte: options.timeLimit.fromTime,
      $lte: options.timeLimit.toTime
    };
  }
  const cursor = await collection.find(queryOptions);
  return cursor.toArray();
};
