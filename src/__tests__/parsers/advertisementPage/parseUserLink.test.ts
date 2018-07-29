import { parseUserLink } from "../../../application/parsers/advertisementPage/parseUserLink";

it("should throw if link has incorrect format", () => {
  expect(() => parseUserLink("fsdf")).toThrow();
});

it("should parse link properly", () => {
  const link = "https://www.olx.ua/list/user/8rq1Q/";
  expect(parseUserLink(link)).toBe("8rq1Q");
});
