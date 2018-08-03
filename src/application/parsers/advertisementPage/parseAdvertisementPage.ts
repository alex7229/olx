export interface IAdvertisementPageRaw {
  advertisementIdText: string;
  active: boolean;
  user?: {
    link: string;
    name: string;
    phoneToken: string;
  };
}

type ParseAdvertisementPage = (
  html: string,
  cheerio: CheerioAPI
) => IAdvertisementPageRaw;

export const parseAdvertisementPage: ParseAdvertisementPage = (
  html,
  cheerio
) => {
  const phoneRegExp = /phoneToken = '([^']+)'/;
  const match = html.match(phoneRegExp);
  if (match === null) {
    throw new Error("page data is corrupted. Cannot find phone token");
  }

  const isActive = !/Объявление не активно/.test(html);

  const $ = cheerio.load(html);
  const advertisementIdText = $("div.offer-titlebox__details small").text();
  if (advertisementIdText === "") {
    throw new Error("page data is corrupted. Cannot find adv block");
  }

  const userBlock = $("div.offer-user__details h4 a");
  const user = {
    link: userBlock.attr("href"),
    name: userBlock.text(),
    phoneToken: match[1]
  };

  const advertisement: IAdvertisementPageRaw = {
    active: isActive,
    advertisementIdText
  };
  if (isActive) {
    advertisement.user = user;
  }
  return advertisement;
};
