import { DeleteWriteOpResultObject } from "mongodb";
import { removeTypeQuery } from "../../../../application/database/queries/types/removeTypeQuery";
import { runQueryFactory } from "../../utils/runQueryFactory";
import { typesCollectionName } from "./fetchTypesQueryFactory";

export type RemoveTypeQueryFactory = (
  type: string
) => Promise<DeleteWriteOpResultObject>;

export const removeTypeQueryFactory: RemoveTypeQueryFactory = async type => {
  const query = removeTypeQuery(typesCollectionName, type);
  return runQueryFactory(query);
};
