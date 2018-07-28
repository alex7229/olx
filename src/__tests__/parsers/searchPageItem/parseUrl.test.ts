import { parseUrl } from "../../../application/parsers/searchPageItem/parseUrl";

it("should remove trailing symbols after #", () => {
  const url = "some long url.html#some_data";
  expect(parseUrl(url)).toBe("some long url.html");
});

it('should throw if url doesn"t end with .html', () => {
  const badUrl = "sdff";
  expect(() => parseUrl(badUrl)).toThrow();
});
