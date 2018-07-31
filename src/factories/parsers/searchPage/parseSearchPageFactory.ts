import * as cheerio from "cheerio";
import {
  ISearchPage,
  parseSearchPage
} from "../../../application/parsers/searchPage/parseSearchPage";

export type ParseSearchPageFactory = (html: string) => ISearchPage;

export const parseSearchPageFactory: ParseSearchPageFactory = html =>
  parseSearchPage(html, cheerio);
