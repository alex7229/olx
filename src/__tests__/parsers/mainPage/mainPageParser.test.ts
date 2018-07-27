import * as cheerio from "cheerio";
import { parseMainPage } from "../../../application/parsers/mainPage/parseMainPage";
import { readFile } from "../mainPageItem/parseAdvertisement.test";

it("should return only items from the regular list, not promoted", async done => {
  const file = await readFile(
    "src/__tests__/parsers/mainPage/examples/itemsAndPages.html",
    "utf-8"
  );
  expect(parseMainPage(file, cheerio).items).toEqual([
    "<td>first item</td>",
    "<td>second item</td>"
  ]);
  done();
});
