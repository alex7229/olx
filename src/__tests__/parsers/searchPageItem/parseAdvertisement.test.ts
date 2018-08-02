import * as cheerio from "cheerio";
import * as fs from "fs";
import { promisify } from "util";
import {
  IAdvertisementRaw,
  parseAdvertisement
} from "../../../application/parsers/searchPageItem/parseAdvertisement";

export const readFile = promisify(fs.readFile);

it("should parse regular advertisement properly", async done => {
  const html = await readFile(
    "src/__tests__/parsers/searchPageItem/examples/RegularAdvertisement.html",
    "utf-8"
  );
  // whitespaces are preserved
  const rawAdvertisement: IAdvertisementRaw = {
    location: `
										Тернополь                                    `,
    olxDelivery: false,
    price: "9 000 грн.",
    promoted: false,
    time: `
										Сегодня 12:11									`,
    title: "видеокарта Palit GeForce GTX 1060 6gb гарантия разетки 23месяца",
    url:
      "https://www.olx.ua/obyavlenie/videokarta-palit-geforce-gtx-1060-6gb-garantiya-razetki-23mesyatsa-IDBd3DN.html#a3e3b8c752"
  };
  expect(parseAdvertisement(html, cheerio)).toEqual(rawAdvertisement);
  done();
});

it("should parse olx delivery properly", async done => {
  const html = await readFile(
    "src/__tests__/parsers/searchPageItem/examples/OlxDeliveryAdv.html",
    "utf-8"
  );
  expect(parseAdvertisement(html, cheerio).olxDelivery).toBe(true);
  done();
});

it("should show that advertisement is highlighted (promoted)", async done => {
  const html = await readFile(
    "src/__tests__/parsers/searchPageItem/examples/HighlightedAdvertisement.html",
    "utf-8"
  );
  expect(parseAdvertisement(html, cheerio).promoted).toBe(true);
  done();
});

it("should parse html encoded advertisement properly", async done => {
  const html = await readFile(
    "src/__tests__/parsers/searchPageItem/examples/HtmlEncodedAdv.html",
    "utf-8"
  );
  const decodedAdvertisement: IAdvertisementRaw = {
    location: `
                      Днепр, Амур-Нижнеднепровский                                    `,
    olxDelivery: true,
    price: "1 900 грн.",
    promoted: false,
    time: `
                      Сегодня 11:32									`,
    title: 'Велосипед ARDIS CLASSIC 20" Белый',
    url:
      "https://www.olx.ua/obyavlenie/velosiped-ardis-classic-20-belyy-IDBd1TX.html?sd=1#d1647b0506"
  };
  expect(parseAdvertisement(html, cheerio)).toEqual(decodedAdvertisement);
  done();
});
