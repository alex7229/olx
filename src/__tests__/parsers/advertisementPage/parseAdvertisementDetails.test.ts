import {
  IAdvertisementDetails,
  parseAdvertisementDetails
} from "../../../application/parsers/advertisementPage/parseAdvertisementDetails";
import { parseAdvertisementId } from "../../../application/parsers/advertisementPage/parseAdvertisementId";
import { IAdvertisementPageRaw } from "../../../application/parsers/advertisementPage/parseAdvertisementPage";
import { parseUserLink } from "../../../application/parsers/advertisementPage/parseUserLink";

it("should parse data properly", () => {
  const advPage: IAdvertisementPageRaw = {
    advertisementIdText: "Номер объявления: 3232",
    user: {
      link: "https://www.olx.ua/list/user/8rq1Q/",
      name:
        "\n" +
        "                                            Віталій                                    ",
      phoneToken: "fsdf"
    }
  };
  const advDetails: IAdvertisementDetails = {
    id: 3232,
    user: {
      id: "8rq1Q",
      name: "Віталій",
      phoneToken: advPage.user.phoneToken
    }
  };
  expect(
    parseAdvertisementDetails(advPage, parseAdvertisementId, parseUserLink)
  ).toEqual(advDetails);
});
