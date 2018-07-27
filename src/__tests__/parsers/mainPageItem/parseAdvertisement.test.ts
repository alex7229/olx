import * as cheerio from "cheerio";
import * as fs from "fs";
import { promisify } from "util";
import {
  IAdvertisementRaw,
  parseAdvertisement
} from "../../../application/parsers/mainPageItem/parseAdvertisement";

export const readFile = promisify(fs.readFile);

it("should parse regular advertisement properly", async done => {
  const html = await readFile(
    "src/__tests__/parsers/mainPageItem/examples/RegularAdvertisement.html",
    "utf-8"
  );
  // whitespaces are preserved
  const rawAdvertisement: IAdvertisementRaw = {
    location: `
                                        Одесса, Киевский                                    `,
    olxDelivery: false,
    price: "7 200 грн.",
    promoted: false,
    time: `
                            Вчера 23:33                    `,
    title: "Gigabyte GeForce GTX 1060 Windforce OC 6GB",
    url:
      "https://www.olx.ua/obyavlenie/gigabyte-geforce-gtx-1060-windforce-oc-6gb-IDABvV8.html#86402a11fc"
  };
  expect(parseAdvertisement(html, cheerio)).toEqual(rawAdvertisement);
  done();
});

it("should parse olx delivery properly", async done => {
  const html = await readFile(
    "src/__tests__/parsers/mainPageItem/examples/OlxDeliveryAdv.html",
    "utf-8"
  );
  expect(parseAdvertisement(html, cheerio).olxDelivery).toBe(true);
  done();
});

it("should show that advertisement is highlighted (promoted)", async done => {
  const html = await readFile(
    "src/__tests__/parsers/mainPageItem/examples/HighlightedAdvertisement.html",
    "utf-8"
  );
  expect(parseAdvertisement(html, cheerio).promoted).toBe(true);
  done();
});
