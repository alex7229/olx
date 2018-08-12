import { InsertWriteOpResult } from "mongodb";
import {
  addToSoldQuery,
  ISoldItem
} from "../../../../application/database/queries/soldItems/addToSoldQuery";
import { runQueryFactory } from "../../utils/runQueryFactory";

export const soldItemsCollectionName = "sold_items";

export type AddToSoldQueryFactory = (
  soldItems: ISoldItem[]
) => Promise<InsertWriteOpResult>;

export const addToSoldQueryFactory: AddToSoldQueryFactory = soldItems => {
  const query = addToSoldQuery(soldItemsCollectionName, soldItems);
  return runQueryFactory(query);
};
