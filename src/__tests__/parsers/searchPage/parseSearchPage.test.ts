import * as cheerio from "cheerio";
import { parseSearchPage } from "../../../application/parsers/searchPage/parseSearchPage";
import { readFile } from "../searchPageItem/parseAdvertisement.test";

let regularFile: string;
let emptyFile: string;

beforeAll(async done => {
  const regularFilePath =
    "src/__tests__/parsers/searchPage/examples/3items21pages.html";
  const emptyFilePath =
    "src/__tests__/parsers/searchPage/examples/noItemsOnePage.html";
  regularFile = await readFile(regularFilePath, "utf-8");
  emptyFile = await readFile(emptyFilePath, "utf-8");
  done();
});

it("should return only items from the regular list, not promoted", () => {
  expect(parseSearchPage(regularFile, cheerio).items).toEqual([
    "<td>first item</td>",
    "<td>second item</td>"
  ]);
});

it("should return correct pages number", () => {
  expect(parseSearchPage(regularFile, cheerio).totalPages).toBe(21);
});

it("should not break if page has no items", () => {
  expect(parseSearchPage(emptyFile, cheerio)).toEqual({
    items: [],
    totalPages: 1
  });
});
