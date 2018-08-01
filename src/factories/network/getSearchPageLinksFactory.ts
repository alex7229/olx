import { getSearchPageLinks } from "../../application/network/getSearchPageLinks";
import { parseSearchPageFactory } from "../parsers/searchPage/parseSearchPageFactory";
import { fetchFactory } from "./utils/fetchFactory";

type GetSearchPageLinksFactory = (link: string) => Promise<string[]>;

export const getSearchPageLinksFactory: GetSearchPageLinksFactory = link =>
  getSearchPageLinks(link, parseSearchPageFactory, fetchFactory);
