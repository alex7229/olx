import { getSearchPageLinks } from "../../application/network/getSearchPageLinks";

const fetchResult = { status: 200, data: "some html" };
const fetch = jest.fn().mockResolvedValue(fetchResult);

it("should produce correct links", async done => {
  const link = "link/";
  const parsePageMock = jest.fn().mockReturnValue({ items: [], totalPages: 3 });
  const links = await getSearchPageLinks(link, parsePageMock, fetch);
  expect(links).toEqual([link, "link/?page=2", "link/?page=3"]);
  expect(parsePageMock.mock.calls.length).toBe(1);
  expect(parsePageMock.mock.calls[0][0]).toBe("some html");
  done();
});

it("should return only original link if number of pages is one", async done => {
  const link = "some link/";
  const parsePageMock = jest.fn().mockReturnValue({ items: [], totalPages: 1 });
  const links = await getSearchPageLinks(link, parsePageMock, fetch);
  expect(links).toEqual([link]);
  done();
});

it("should add slash to links if it was not added before", async done => {
  const link = "link";
  const parsePageMock = jest.fn().mockReturnValue({ items: [], totalPages: 2 });
  const links = await getSearchPageLinks(link, parsePageMock, fetch);
  expect(links).toEqual(["link/", "link/?page=2"]);
  done();
});
