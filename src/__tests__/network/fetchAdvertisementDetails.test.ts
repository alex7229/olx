import { fetchAdvertisementDetails } from "../../application/network/fetchAdvertisementDetails";
import { IAdvertisementDetails } from "../../application/parsers/advertisementPage/parseAdvertisementDetails";
import { IAdvertisementMainInfo } from "../../application/parsers/searchPageItem/parseAdvertisementMainInfo";

const mainInfo: IAdvertisementMainInfo = {
  location: {
    city: "LA"
  },
  olxDelivery: true,
  price: {
    currency: "UAH",
    value: 17000
  },
  promoted: true,
  time: 3232323,
  title: "super cool car",
  url: {
    fullUrl: "long url.html",
    uniqueName: "fsdf"
  }
};

const details: IAdvertisementDetails = {
  active: true,
  id: 222,
  user: {
    id: "sdfsd",
    name: "Alex",
    phoneToken: "fsdfsdfsfs"
  }
};

it("should fetch advertisement details", async done => {
  const parseAdvertisementDetails = jest.fn().mockReturnValue(details);
  const fetch = jest.fn().mockResolvedValue({ data: "html", status: 200 });
  const result = await fetchAdvertisementDetails(
    mainInfo,
    parseAdvertisementDetails,
    fetch
  );
  expect(result).toEqual(details);
  done();
});
