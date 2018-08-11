import { fetchTypesQuery } from "../../../../application/database/queries/types/fetchTypesQuery";
import { IAdvertisementType } from "../../../../application/database/queries/types/saveNewTypeQuery";
import { runQueryFactory } from "../../utils/runQueryFactory";

export const typesCollectionName = "types";

export type FetchTypesQueryFactory = (
  type?: string
) => Promise<IAdvertisementType[]>;

export const fetchTypesQueryFactory: FetchTypesQueryFactory = async type => {
  const query = fetchTypesQuery(typesCollectionName, type);
  return runQueryFactory(query);
};
