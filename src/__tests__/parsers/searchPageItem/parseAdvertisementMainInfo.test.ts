import { IAdvertisementRaw } from "../../../application/parsers/searchPageItem/parseAdvertisement";
import {
  IAdvertisementMainInfo,
  parseAdvertisementMainInfo
} from "../../../application/parsers/searchPageItem/parseAdvertisementMainInfo";

const advertisement: IAdvertisementRaw = {
  location: "city",
  olxDelivery: true,
  price: "23",
  promoted: false,
  time: "23:17",
  title: "video card",
  url: "some url"
};

it("should convert advertisement properly", () => {
  const parsedUrl = {
    fullUrl: "long url",
    uniqueName: "some name"
  };
  const parsePrice = jest.fn().mockReturnValue(23);
  const parseUrl = jest.fn().mockReturnValue(parsedUrl);
  const parseTime = jest.fn().mockReturnValue(14231256456);
  const parseLocation = jest.fn().mockReturnValue({ city: "banga" });
  const convertedAdv: IAdvertisementMainInfo = {
    location: {
      city: "banga"
    },
    olxDelivery: advertisement.olxDelivery,
    price: 23,
    promoted: advertisement.promoted,
    time: 14231256456,
    title: advertisement.title,
    url: parsedUrl
  };
  expect(
    parseAdvertisementMainInfo(
      advertisement,
      parsePrice,
      parseUrl,
      parseTime,
      parseLocation
    )
  ).toEqual(convertedAdv);

  expect(parseTime.mock.calls.length).toBe(1);
  expect(parseTime.mock.calls[0][0]).toBe(advertisement.time);

  expect(parseLocation.mock.calls.length).toBe(1);
  expect(parseLocation.mock.calls[0][0]).toBe(advertisement.location);

  expect(parseUrl.mock.calls.length).toBe(1);
  expect(parseUrl.mock.calls[0][0]).toBe(advertisement.url);

  expect(parsePrice.mock.calls.length).toBe(1);
  expect(parsePrice.mock.calls[0][0]).toBe(advertisement.price);
});

it("should throw if location was not found", () => {
  const advertisementCopy = {
    ...advertisement,
    location: ""
  };
  expect(() =>
    parseAdvertisementMainInfo(
      advertisementCopy,
      jest.fn(),
      jest.fn(),
      jest.fn(),
      jest.fn()
    )
  ).toThrow();
});

it("should throw if title was not found", () => {
  const advertisementCopy = {
    ...advertisement,
    title: ""
  };
  expect(() =>
    parseAdvertisementMainInfo(
      advertisementCopy,
      jest.fn(),
      jest.fn(),
      jest.fn(),
      jest.fn()
    )
  ).toThrow();
});

it("should throw if time was not found", () => {
  const advertisementCopy = {
    ...advertisement,
    time: ""
  };
  expect(() =>
    parseAdvertisementMainInfo(
      advertisementCopy,
      jest.fn(),
      jest.fn(),
      jest.fn(),
      jest.fn()
    )
  ).toThrow();
});
