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
  const isActive = !/Объявление не активно/.test(html);

  const $ = cheerio.load(html);
  const advertisementIdText = $("div.offer-titlebox__details small").text();
  if (advertisementIdText === "") {
    throw new Error("page data is corrupted. Cannot find adv id block");
  }

  if (!isActive) {
    return {
      active: false,
      advertisementIdText
    };
  }

  const phoneRegExp = /phoneToken = '([^']+)'/;
  const match = html.match(phoneRegExp);
  if (match === null) {
    throw new Error("page data is corrupted. Cannot find phone token");
  }

  const userBlock = $("div.offer-user__details h4 a");
  const user = {
    link: userBlock.attr("href"),
    name: userBlock.text(),
    phoneToken: match[1]
  };
  if (user.link === "" || user.name === "") {
    throw new Error("advertisement is active but user data is incorrect");
  }

  return {
    active: true,
    advertisementIdText,
    user
  };
};
