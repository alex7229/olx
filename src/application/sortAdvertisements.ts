import { IAdvertisement } from "./database/queries/advertisements/fetchAdvertisementsQuery";

export type SortAdvertisements = (
  unsortedAdvertisements: IAdvertisement[],
  removeEmptySpace?: boolean
) => IAdvertisement[];

export const sortAdvertisements: SortAdvertisements = (
  unsortedAdvertisements,
  removeEmptySpace = false
) => {
  const sortedAdvertisements: IAdvertisement[] = [];
  unsortedAdvertisements.forEach(advertisement => {
    sortedAdvertisements[advertisement.id] = advertisement;
  });
  return removeEmptySpace
    ? sortedAdvertisements.filter(() => true)
    : sortedAdvertisements;
};
