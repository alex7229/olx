import {
  IAdvertisementDetails,
  parseAdvertisementDetails
} from "../../../application/parsers/advertisementPage/parseAdvertisementDetails";
import { parseAdvertisementId } from "../../../application/parsers/advertisementPage/parseAdvertisementId";
import { IAdvertisementPageRaw } from "../../../application/parsers/advertisementPage/parseAdvertisementPage";
import { parseUserLink } from "../../../application/parsers/advertisementPage/parseUserLink";

it("should parse data properly", () => {
  const phoneToken = "fsdf";
  const advPage: IAdvertisementPageRaw = {
    active: true,
    advertisementIdText: "Номер объявления: 3232",
    user: {
      link: "https://www.olx.ua/list/user/8rq1Q/",
      name:
        "\n" +
        "                                            Віталій                                    ",
      phoneToken
    }
  };
  const advDetails: IAdvertisementDetails = {
    active: advPage.active,
    id: 3232,
    user: {
      id: "8rq1Q",
      name: "Віталій",
      phoneToken
    }
  };
  expect(
    parseAdvertisementDetails(advPage, parseAdvertisementId, parseUserLink)
  ).toEqual(advDetails);
});

it("should parse data without user", () => {
  const advPage: IAdvertisementPageRaw = {
    active: false,
    advertisementIdText: "Номер объявления: 113"
  };
  const advDetails: IAdvertisementDetails = {
    active: advPage.active,
    id: 113
  };
  expect(
    parseAdvertisementDetails(advPage, parseAdvertisementId, jest.fn())
  ).toEqual(advDetails);
});

it("should parse adv. with private user data", () => {
  const advPage: IAdvertisementPageRaw = {
    active: true,
    advertisementIdText: "Номер объявления: 113",
    user: {
      name: "\t\t\n    Alex  \t\n   ",
      phoneToken: "23g"
    }
  };
  const user = {
    name: "Alex",
    phoneToken: "23g"
  };
  expect(
    parseAdvertisementDetails(advPage, jest.fn(), parseUserLink).user
  ).toEqual(user);
});
