import { FetchFactory } from "../../factories/network/utils/fetchFactory";
import { ParseAdvertisementDetailsFactory } from "../../factories/parsers/advertisementPage/parseAdvertisementDetailsFactory";
import { IAdvertisementDetails } from "../parsers/advertisementPage/parseAdvertisementDetails";
import { IAdvertisementMainInfo } from "../parsers/searchPageItem/parseAdvertisementMainInfo";

type FetchAdvertisementDetails = (
  advertisement: IAdvertisementMainInfo,
  parseAdvertisementDetails: ParseAdvertisementDetailsFactory,
  fetch: FetchFactory
) => Promise<IAdvertisementDetails>;

export const fetchAdvertisementDetails: FetchAdvertisementDetails = async (
  advertisement,
  parseAdvertisementDetails,
  fetch
) => {
  const detailsHtml = await fetch(advertisement.url.fullUrl);
  return parseAdvertisementDetails(detailsHtml.data);
};
