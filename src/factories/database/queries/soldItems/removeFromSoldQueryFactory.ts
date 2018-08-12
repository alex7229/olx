import { DeleteWriteOpResultObject } from "mongodb";
import { removeFromSoldQuery } from "../../../../application/database/queries/soldItems/removeFromSoldQuery";
import { runQueryFactory } from "../../utils/runQueryFactory";
import { soldItemsCollectionName } from "./addToSoldQueryFactory";

export type RemoveFromSoldQueryFactory = (
  advertisementId: number
) => Promise<DeleteWriteOpResultObject>;

export const removeFromSoldQueryFactory: RemoveFromSoldQueryFactory = advertisementId => {
  const query = removeFromSoldQuery(soldItemsCollectionName, advertisementId);
  return runQueryFactory(query);
};
