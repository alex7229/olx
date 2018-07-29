import * as cheerio from "cheerio";
import { parseAdvertisement } from "../../../application/parsers/searchPageItem/parseAdvertisement";
import {
  IAdvertisement,
  parseAdvertisementMainInfo
} from "../../../application/parsers/searchPageItem/parseAdvertisementMainInfo";
import { parseLocation } from "../../../application/parsers/searchPageItem/parseLocation";
import { parsePrice } from "../../../application/parsers/searchPageItem/parsePrice";
import { parseUrl } from "../../../application/parsers/searchPageItem/parseUrl";
import { parseTimeFactory } from "./parseTimeFactory";

type ParseAdvertisementMainInfoFactory = (html: string) => IAdvertisement;

export const parseAdvertisementMainInfoFactory: ParseAdvertisementMainInfoFactory = html =>
  parseAdvertisementMainInfo(
    parseAdvertisement(html, cheerio),
    parsePrice,
    parseUrl,
    parseTimeFactory,
    parseLocation
  );
