import * as cheerio from "cheerio";
import {
  IAdvertisementDetails,
  parseAdvertisementDetails
} from "../../../application/parsers/advertisementPage/parseAdvertisementDetails";
import { parseAdvertisementId } from "../../../application/parsers/advertisementPage/parseAdvertisementId";
import { parseAdvertisementPage } from "../../../application/parsers/advertisementPage/parseAdvertisementPage";
import { parseUserLink } from "../../../application/parsers/advertisementPage/parseUserLink";

export type ParseAdvertisementDetailsFactory = (
  html: string
) => IAdvertisementDetails;

export const parseAdvertisementDetailsFactory: ParseAdvertisementDetailsFactory = html =>
  parseAdvertisementDetails(
    parseAdvertisementPage(html, cheerio),
    parseAdvertisementId,
    parseUserLink
  );
