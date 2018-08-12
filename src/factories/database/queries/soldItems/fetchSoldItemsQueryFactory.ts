import { ISoldItem } from "../../../../application/database/queries/soldItems/addToSoldQuery";
import { fetchSoldItemsQuery } from "../../../../application/database/queries/soldItems/fetchSoldItemsQuery";
import { runQueryFactory } from "../../utils/runQueryFactory";
import { soldItemsCollectionName } from "./addToSoldQueryFactory";

export type FetchSoldItemsQueryFactory = (
  type?: string
) => Promise<ISoldItem[]>;

export const fetchSoldItemsQueryFactory: FetchSoldItemsQueryFactory = async type => {
  const query = fetchSoldItemsQuery(soldItemsCollectionName, type);
  return runQueryFactory(query);
};
