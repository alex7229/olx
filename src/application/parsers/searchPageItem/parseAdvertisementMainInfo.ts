import { ParseTimeFactory } from "../../../factories/parsers/searchPageItem/parseTimeFactory";
import { IAdvertisementRaw } from "./parseAdvertisement";
import { ILocation, ParseLocation } from "./parseLocation";
import { ParsePrice, Price } from "./parsePrice";
import { ParseUrl } from "./parseUrl";

export interface IAdvertisementMainInfo {
  location: ILocation;
  olxDelivery: boolean;
  price: Price;
  promoted: boolean;
  time: number;
  title: string;
  url: {
    fullUrl: string;
    uniqueName: string;
  };
}

type ParseAdvertisementMainInfo = (
  advertisement: IAdvertisementRaw,
  parsePrice: ParsePrice,
  parseUrl: ParseUrl,
  parseTime: ParseTimeFactory,
  parseLocation: ParseLocation
) => IAdvertisementMainInfo;

export const parseAdvertisementMainInfo: ParseAdvertisementMainInfo = (
  advertisement,
  parsePrice,
  parseUrl,
  parseTime,
  parseLocation
) => ({
  ...advertisement,
  location: parseLocation(advertisement.location),
  price: parsePrice(advertisement.price),
  time: parseTime(advertisement.time),
  url: parseUrl(advertisement.url)
});
