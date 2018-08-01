import { FetchFactory } from "../../factories/network/utils/fetchFactory";
import { ParseSearchPageFactory } from "../../factories/parsers/searchPage/parseSearchPageFactory";

type GetSearchPageLinks = (
  link: string,
  parseSearchPage: ParseSearchPageFactory,
  fetch: FetchFactory
) => Promise<string[]>;

export const getSearchPageLinks: GetSearchPageLinks = async (
  link,
  parseSearchPage,
  fetch
) => {
  const linkWithSlash = link[link.length - 1] === "/" ? link : link + "/";
  const pageHtml = await fetch(linkWithSlash);
  const page = parseSearchPage(pageHtml.data);
  const links = [linkWithSlash];
  for (let i = 2; i <= page.totalPages; i++) {
    links.push(`${linkWithSlash}?page=${i}`);
  }
  return links;
};
