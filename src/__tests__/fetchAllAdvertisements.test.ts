import { fetchAllAdvertisements } from "../application/fetchAllAdvertisements";
import { IResponse } from "../application/network/handleRedirect";

const firstPageAdvertisements = [
  {
    price: 60,
    url: {
      uniqueName: "first"
    }
  },
  {
    price: 70,
    url: {
      uniqueName: "second"
    }
  }
];
const secondPageAdvertisement = {
  price: 80,
  url: {
    uniqueName: "first"
  }
};

it("should fetch advertisements from one page properly", async done => {
  const links = ["first link"];
  const fetch = jest.fn().mockResolvedValue({ data: "html", status: 200 });
  const parseSearchPageMock = jest.fn().mockReturnValue({
    items: ["first item html", "second item html"],
    totalPages: 1
  });
  const parseMainInfoMock = jest
    .fn()
    .mockReturnValueOnce(firstPageAdvertisements[0])
    .mockReturnValueOnce(firstPageAdvertisements[1]);
  const advertisements = await fetchAllAdvertisements(
    links,
    parseSearchPageMock,
    parseMainInfoMock,
    fetch
  );
  expect(advertisements).toEqual(firstPageAdvertisements);
  done();
});

it("should throw if any search page is unavailable", async done => {
  const links = ["first link", "second link"];
  const error = new Error("fetch problem");
  const fetch = jest
    .fn()
    .mockResolvedValueOnce({ data: "html", status: 200 })
    .mockRejectedValueOnce(error);
  await expect(
    fetchAllAdvertisements(links, jest.fn(), jest.fn(), fetch)
  ).rejects.toBe(error);
  done();
});

it("should ignore pages that are redirected", async done => {
  const links = ["third link"];
  const response: IResponse = {
    data: "html",
    status: 301
  };
  const fetch = jest.fn().mockResolvedValue(response);
  const parseSearchPageMock = jest.fn().mockReturnValue({
    items: ["item 1", "item 2", "item 3"],
    totalPages: 500
  });
  const parseMainInfoMock = jest.fn();
  const advertisements = await fetchAllAdvertisements(
    links,
    parseSearchPageMock,
    parseMainInfoMock,
    fetch
  );
  expect(advertisements.length).toBe(0);
  done();
});

it("should overwrite old advertisements based on url unique name", async done => {
  const links = ["first", "second"];
  const fetch = jest.fn().mockResolvedValue({ data: "html", status: 200 });
  const parseSearchPageMock = jest
    .fn()
    .mockReturnValueOnce({
      items: ["first item html", "second item html"],
      totalPages: 2
    })
    .mockReturnValueOnce({
      items: ["first item html again"],
      totalPages: 2
    });

  const parseMainInfoMock = jest
    .fn()
    .mockReturnValueOnce(firstPageAdvertisements[0])
    .mockReturnValueOnce(firstPageAdvertisements[1])
    .mockReturnValueOnce(secondPageAdvertisement);
  const advertisements = await fetchAllAdvertisements(
    links,
    parseSearchPageMock,
    parseMainInfoMock,
    fetch
  );
  expect(advertisements).toEqual([
    secondPageAdvertisement,
    firstPageAdvertisements[1]
  ]);
  done();
});
