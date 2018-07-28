interface IMainPage {
  items: Array<string | null>;
  totalPages: number;
}

type ParseMainPage = (html: string, cheerio: CheerioAPI) => IMainPage;

export const parseMainPage: ParseMainPage = (html, cheerio) => {
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
