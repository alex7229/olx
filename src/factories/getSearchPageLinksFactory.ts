import { getSearchPageLinks } from "../application/getSearchPageLinks";
import { fetchFactory } from "./network/fetchFactory";
import { parseSearchPageFactory } from "./parsers/searchPage/parseSearchPageFactory";

type GetSearchPageLinksFactory = (link: string) => Promise<string[]>;

export const getSearchPageLinksFactory: GetSearchPageLinksFactory = link =>
  getSearchPageLinks(link, parseSearchPageFactory, fetchFactory);
