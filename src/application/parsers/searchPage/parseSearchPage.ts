export interface ISearchPage {
  items: Array<string | null>;
  totalPages: number;
}

type ParseSearchPage = (html: string, cheerio: CheerioAPI) => ISearchPage;

export const parseSearchPage: ParseSearchPage = (html, cheerio) => {
  const $ = cheerio.load(html);
  const items = $("table#offers_table tr.wrap")
    .toArray()
    .map(elem => $(elem).html());
  const totalPagesString = $("span.item.fleft")
    .last()
    .find("span")
    .text();
  const totalPages =
    totalPagesString === "" ? 1 : parseInt(totalPagesString, 10);
  return {
    items,
    totalPages
  };
};
