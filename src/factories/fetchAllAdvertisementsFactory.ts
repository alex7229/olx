import { fetchAllAdvertisements } from "../application/fetchAllAdvertisements";
import { IAdvertisementMainInfo } from "../application/parsers/searchPageItem/parseAdvertisementMainInfo";
import { fetchFactory } from "./network/fetchFactory";
import { parseSearchPageFactory } from "./parsers/searchPage/parseSearchPageFactory";
import { parseAdvertisementMainInfoFactory } from "./parsers/searchPageItem/parseAdvertisementMainInfoFactory";

export type FetchAllAdvertisementsFactory = (
  links: string[]
) => Promise<IAdvertisementMainInfo[]>;

export const fetchAllAdvertisementsFactory: FetchAllAdvertisementsFactory = links =>
  fetchAllAdvertisements(
    links,
    parseSearchPageFactory,
    parseAdvertisementMainInfoFactory,
    fetchFactory
  );
