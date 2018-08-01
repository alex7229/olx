import { FetchFactory } from "../factories/network/fetchFactory";
import { ParseSearchPageFactory } from "../factories/parsers/searchPage/parseSearchPageFactory";
import { ParseAdvertisementMainInfoFactory } from "../factories/parsers/searchPageItem/parseAdvertisementMainInfoFactory";
import { IAdvertisementMainInfo } from "./parsers/searchPageItem/parseAdvertisementMainInfo";

type FetchAllAdvertisements = (
  links: string[],
  parseSearchPage: ParseSearchPageFactory,
  parseAdvertisementMainInfo: ParseAdvertisementMainInfoFactory,
  fetch: FetchFactory
) => Promise<IAdvertisementMainInfo[]>;

interface IAdvertisementsObj {
  [key: string]: IAdvertisementMainInfo;
}

export const fetchAllAdvertisements: FetchAllAdvertisements = async (
  links,
  parseSearchPage,
  parseAdvertisementMainInfo,
  fetch
) => {
  const pagesResponses = await Promise.all(links.map(link => fetch(link)));
  const itemsHtml = pagesResponses
    .filter(response => response.status === 200)
    .map(response => parseSearchPage(response.data))
    .map(parsedPage => parsedPage.items)
    .reduce((allItems, currentItems) => allItems.concat(currentItems), [])
    .filter(itemHtml => itemHtml !== null) as string[];
  // cast 'as string' used here because typescript cannot infer proper type
  // after array filter
  const allAdvertisements = itemsHtml.map(itemHtml =>
    parseAdvertisementMainInfo(itemHtml)
  );
  // advertisement obj is used to filter out advertisements based on url unique name
  const advertisementsObj: IAdvertisementsObj = {};
  for (const advertisement of allAdvertisements) {
    advertisementsObj[advertisement.url.uniqueName] = advertisement;
  }
  return Object.values(advertisementsObj);
};
