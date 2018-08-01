import { fetchAllAdvertisements } from "../../application/network/fetchAllAdvertisements";
import { IAdvertisementMainInfo } from "../../application/parsers/searchPageItem/parseAdvertisementMainInfo";
import { parseSearchPageFactory } from "../parsers/searchPage/parseSearchPageFactory";
import { parseAdvertisementMainInfoFactory } from "../parsers/searchPageItem/parseAdvertisementMainInfoFactory";
import { fetchFactory } from "./utils/fetchFactory";

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
