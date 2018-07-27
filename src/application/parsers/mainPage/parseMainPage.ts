interface IMainPage {
  items: Array<string | null>;
  totalPages: number;
}

type ParseMainPage = (html: string, cheerio: CheerioAPI) => IMainPage;

export const parseMainPage: ParseMainPage = (html, cheerio) => {
  const totalPages = 0;
  const $ = cheerio.load(html);
  const items = $("table#offers_table tr.wrap")
    .toArray()
    .map(elem => $(elem).html());

  return { items, totalPages };
};
