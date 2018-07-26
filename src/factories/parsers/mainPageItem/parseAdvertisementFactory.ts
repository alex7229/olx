import * as cheerio from "cheerio";
import {
  convertAdvertisement,
  IAdvertisement
} from "../../../application/parsers/mainPageItem/convertAdvertisement";
import { parseAdvertisement } from "../../../application/parsers/mainPageItem/parseAdvertisement";
import { parseLocation } from "../../../application/parsers/mainPageItem/parseLocation";
import { parsePrice } from "../../../application/parsers/mainPageItem/parsePrice";
import { parseUrl } from "../../../application/parsers/mainPageItem/parseUrl";
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
