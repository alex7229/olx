import { FilterQuery } from "mongodb";

export interface IAdvertisementsQueryOptions {
  type?: string;
  fromTime?: number;
  toTime?: number;
  ids?: number[];
}

export type GenerateAdvertisementsQueryOptions = (
  options: IAdvertisementsQueryOptions
) => FilterQuery<any>;

export const generateAdvertisementsQueryOptions: GenerateAdvertisementsQueryOptions = options => {
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
