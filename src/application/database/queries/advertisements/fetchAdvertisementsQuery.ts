import { Collection, Db, FilterQuery } from "mongodb";
import { ILocation } from "../../../parsers/searchPageItem/parseLocation";
import { Price } from "../../../parsers/searchPageItem/parsePrice";
import { Query } from "../../utils/runQuery";

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
    id?: string;
    name: string;
  };
}

type FetchAdvertisementsQuery = (
  collectionName: string,
  options: FilterQuery<any>
) => Query<IAdvertisement[]>;

export const fetchAdvertisementsQuery: FetchAdvertisementsQuery = (
  collectionName,
  options
) => async (db: Db) => {
  const collection: Collection = db.collection(collectionName);
  const cursor = await collection.find(options);
  return cursor.toArray();
};
