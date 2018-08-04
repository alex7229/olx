import { FilterQuery } from "mongodb";

export interface IQueryOptions {
  type?: string;
  fromTime?: number;
  toTime?: number;
  ids?: number[];
}

export type GenerateQueryOptions = (options: IQueryOptions) => FilterQuery<any>;

export const generateQueryOptions: GenerateQueryOptions = options => {
  const query: FilterQuery<any> = {};
  if (options.type) {
    query.type = { $eq: options.type };
  }
  if (options.fromTime || options.toTime) {
    query.time = {};
  }
  if (options.fromTime) {
    query.time.$gte = options.fromTime;
  }
  if (options.toTime) {
    query.time.$lte = options.toTime;
  }
  if (options.ids) {
    query.id = { $in: options.ids };
  }
  return query;
};
