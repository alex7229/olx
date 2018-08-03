export interface ISearchPage {
  items: string[];
  totalPages: number;
}

type ParseSearchPage = (html: string, cheerio: CheerioAPI) => ISearchPage;

export const parseSearchPage: ParseSearchPage = (html, cheerio) => {
  const $ = cheerio.load(html);
  const items = $("table#offers_table tr.wrap")
    .toArray()
    .map(elem => $(elem).html())
    // as string[] is used here because typescript cannot infer type after
    // array filter properly
    .filter(elemHtml => elemHtml !== null) as string[];
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
