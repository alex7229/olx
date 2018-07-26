export interface IAdvertisementRaw {
  title: string;
  url: string;
  time: string;
  price: string;
  olxDelivery: boolean;
  promoted: boolean;
  location: string;
}
type ParseAdvertisement = (
  html: string,
  cheerio: CheerioAPI
) => IAdvertisementRaw;

export const parseAdvertisement: ParseAdvertisement = (html, cheerio) => {
  const $ = cheerio.load(html);
  return {
    location: $("small span").text(),
    olxDelivery: $(".olx-delivery-badge").length === 1,
    price: $(".price strong").text(),
    promoted: $("span.paid").length === 1,
    time: $("p.x-normal").text(),
    title: $("a strong").text(),
    url: $("h3 a").attr("href")
  };
};
