import { ISoldItem } from "../application/database/queries/soldItems/addToSoldQuery";
import {
  findIntersectedAdvertisements,
  IIntersectedAdvertisements
} from "../application/findIntersectedAdvertisements";
import { getTestAdvertisements } from "../testData/getTestAdvertisements";

it("should sort advertisements properly", () => {
  const webAdvertisements = getTestAdvertisements();
  const advertisementsCollection = [webAdvertisements[0], webAdvertisements[1]];
  const soldItem: ISoldItem = {
    advertisementId: webAdvertisements[2].id,
    price: {
      currency: "usd",
      value: 44
    },
    type: webAdvertisements[2].type
  };
  const expectedIntersection: IIntersectedAdvertisements = {
    currentItemsIntersection: [
      { web: webAdvertisements[0], db: advertisementsCollection[0] },
      { web: webAdvertisements[1], db: advertisementsCollection[1] }
    ],
    newWeb: [webAdvertisements[3]],
    soldItemsIntersection: [{ web: webAdvertisements[2], db: soldItem }]
  };
  expect(
    findIntersectedAdvertisements(webAdvertisements, advertisementsCollection, [
      soldItem
    ])
  ).toEqual(expectedIntersection);
});
