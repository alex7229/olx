import {
  convertAdvertisement,
  IAdvertisement
} from "../../../application/parsers/mainPageItem/convertAdvertisement";
import { IAdvertisementRaw } from "../../../application/parsers/mainPageItem/parseAdvertisement";

it("should convert advertisement properly", () => {
  const advertisement: IAdvertisementRaw = {
    location: "city",
    olxDelivery: true,
    price: "23",
    promoted: false,
    time: "23:17",
    title: "video card",
    url: "some url"
  };
  const parsePrice = jest.fn().mockReturnValue(23);
  const parseUrl = jest.fn().mockReturnValue("proper url");
  const parseTime = jest.fn().mockReturnValue(14231256456);
  const parseLocation = jest.fn().mockReturnValue({ city: "banga" });
  const convertedAdv: IAdvertisement = {
    location: {
      city: "banga"
    },
    olxDelivery: advertisement.olxDelivery,
    price: 23,
    promoted: advertisement.promoted,
    time: 14231256456,
    title: advertisement.title,
    url: "proper url"
  };
  expect(
    convertAdvertisement(
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
