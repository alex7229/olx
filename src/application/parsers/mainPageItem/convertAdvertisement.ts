import { ParseTimeFactory } from "../../../factories/parsers/mainPageItem/parseTimeFactory";
import { IAdvertisementRaw } from "./parseAdvertisement";
import { ILocation, ParseLocation } from "./parseLocation";
import { ParsePrice, Price } from "./parsePrice";
import { ParseUrl } from "./parseUrl";

export interface IAdvertisement {
  title: string;
  url: string;
  location: ILocation;
  time: number;
  promoted: boolean;
  olxDelivery: boolean;
  price: Price;
}

type ConvertAdvertisement = (
  advertisement: IAdvertisementRaw,
  parsePrice: ParsePrice,
  parseUrl: ParseUrl,
  parseTime: ParseTimeFactory,
  parseLocation: ParseLocation
) => IAdvertisement;

export const convertAdvertisement: ConvertAdvertisement = (
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
