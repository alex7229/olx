import * as cheerio from "cheerio";
import {
  convertAdvertisement,
  IAdvertisement
} from "../../../application/parsers/searchPageItem/convertAdvertisement";
import { parseAdvertisement } from "../../../application/parsers/searchPageItem/parseAdvertisement";
import { parseLocation } from "../../../application/parsers/searchPageItem/parseLocation";
import { parsePrice } from "../../../application/parsers/searchPageItem/parsePrice";
import { parseUrl } from "../../../application/parsers/searchPageItem/parseUrl";
import { parseTimeFactory } from "./parseTimeFactory";

type ParseAdvertisementFactory = (html: string) => IAdvertisement;

export const parseAdvertisementFactory: ParseAdvertisementFactory = html =>
  convertAdvertisement(
    parseAdvertisement(html, cheerio),
    parsePrice,
    parseUrl,
    parseTimeFactory,
    parseLocation
  );
