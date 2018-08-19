import { IAdvertisement } from "./database/queries/advertisements/fetchAdvertisementsQuery";
import { ISoldItem } from "./database/queries/soldItems/addToSoldQuery";

interface ISoldItemsIntersection {
  db: ISoldItem;
  web: IAdvertisement;
}

interface ICurrentItemsIntersection {
  db: IAdvertisement;
  web: IAdvertisement;
}

export interface IIntersectedAdvertisements {
  currentItemsIntersection: ICurrentItemsIntersection[];
  newWeb: IAdvertisement[];
  soldItemsIntersection: ISoldItemsIntersection[];
}

export type FindIntersectedAdvertisements = (
  webItems: IAdvertisement[],
  advertisementCollection: IAdvertisement[],
  soldCollection: ISoldItem[]
) => IIntersectedAdvertisements;

export const findIntersectedAdvertisements: FindIntersectedAdvertisements = (
  webItems,
  advertisementCollection,
  soldCollection
) => {
  const advertisementCollectionSorted: IAdvertisement[] = [];
  const soldItemsSorted: ISoldItem[] = [];

  advertisementCollection.forEach(
    item => (advertisementCollectionSorted[item.id] = item)
  );
  soldCollection.forEach(
    item => (soldItemsSorted[item.advertisementId] = item)
  );

  const intersectedAdvertisements: IIntersectedAdvertisements = {
    currentItemsIntersection: [],
    newWeb: [],
    soldItemsIntersection: []
  };

  webItems.forEach(webItem => {
    const id = webItem.id;
    const soldItem = soldItemsSorted[id];
    const advertisementItem = advertisementCollectionSorted[id];
    if (advertisementItem) {
      intersectedAdvertisements.currentItemsIntersection.push({
        db: advertisementItem,
        web: webItem
      });
      return;
    }
    if (soldItem) {
      intersectedAdvertisements.soldItemsIntersection.push({
        db: soldItem,
        web: webItem
      });
    }
    if (!advertisementItem && !soldItem) {
      intersectedAdvertisements.newWeb.push(webItem);
    }
  });

  return intersectedAdvertisements;
};
