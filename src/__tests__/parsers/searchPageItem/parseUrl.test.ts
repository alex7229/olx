import { parseUrl } from "../../../application/parsers/searchPageItem/parseUrl";

it("should parse url properly", () => {
  const url = "https://www.olx.ua/obyavlenie/profik-81-IDB7Z3U.html#promoted";
  expect(parseUrl(url)).toEqual({
    fullUrl: "https://www.olx.ua/obyavlenie/profik-81-IDB7Z3U.html",
    uniqueName: "profik-81-IDB7Z3U"
  });
});

it('should throw if url doesn"t end with .html', () => {
  const badUrl = "sdff";
  expect(() => parseUrl(badUrl)).toThrow();
});
