import {
  fetchAdvertisementsQuery,
  IAdvertisement,
  IFetchAdvertisementsOptions
} from "../../../../application/database/queries/advertisements/fetchAdvertisementsQuery";
import { runQueryFactory } from "../../utils/runQueryFactory";

export const advertisementsCollectionName = "advertisements";

type FetchAdvertisementsQueryFactory = (
  options: IFetchAdvertisementsOptions
) => Promise<IAdvertisement[]>;

export const fetchAdvertisementsQueryFactory: FetchAdvertisementsQueryFactory = async options => {
  const query = fetchAdvertisementsQuery(advertisementsCollectionName, options);
  return runQueryFactory(query);
};
