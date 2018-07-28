import * as cheerio from "cheerio";
import { parseMainPage } from "../../../application/parsers/mainPage/parseMainPage";
import { readFile } from "../mainPageItem/parseAdvertisement.test";

let regularFile: string;
let emptyFile: string;

beforeAll(async done => {
  regularFile = await readFile(
    "src/__tests__/parsers/mainPage/examples/3items21pages.html",
    "utf-8"
  );
  emptyFile = await readFile(
    "src/__tests__/parsers/mainPage/examples/noItemsOnePage.html",
    "utf-8"
  );
  done();
});

it("should return only items from the regular list, not promoted", () => {
  expect(parseMainPage(regularFile, cheerio).items).toEqual([
    "<td>first item</td>",
    "<td>second item</td>"
  ]);
});

it("should return correct pages number", () => {
  expect(parseMainPage(regularFile, cheerio).totalPages).toBe(21);
});

it("should not break if page has no items", () => {
  expect(parseMainPage(emptyFile, cheerio)).toEqual({
    items: [],
    totalPages: 1
  });
});
