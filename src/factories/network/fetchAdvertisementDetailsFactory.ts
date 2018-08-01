import { fetchAdvertisementDetails } from "../../application/network/fetchAdvertisementDetails";
import { IAdvertisementDetails } from "../../application/parsers/advertisementPage/parseAdvertisementDetails";
import { IAdvertisementMainInfo } from "../../application/parsers/searchPageItem/parseAdvertisementMainInfo";
import { parseAdvertisementDetailsFactory } from "../parsers/advertisementPage/parseAdvertisementDetailsFactory";
import { fetchFactory } from "./utils/fetchFactory";

export type FetchAdvertisementDetailsFactory = (
  advertisement: IAdvertisementMainInfo
) => Promise<IAdvertisementDetails>;

export const fetchAdvertisementDetailsFactory: FetchAdvertisementDetailsFactory = advertisement =>
  fetchAdvertisementDetails(
    advertisement,
    parseAdvertisementDetailsFactory,
    fetchFactory
  );
