interface IAdvertisementPage {
  id: number;
  phoneToken: string;
}

type ParseAdvertisementPage = (html: string) => IAdvertisementPage;

export const parseAdvertisementPage: ParseAdvertisementPage = html => {
  const regExp = /phoneToken = '([^']+)'[\s\S]+Номер объявления: ([\d]+)/;
  const match = html.match(regExp);
  if (match === null) {
    throw new Error("page data is corrupted");
  }
  return {
    id: parseInt(match[2], 10),
    phoneToken: match[1]
  };
};
