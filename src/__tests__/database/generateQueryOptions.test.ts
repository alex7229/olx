import { generateQueryOptions } from "../../application/database/generateQueryOptions";

it("should return empty objects if no options are specified", () => {
  expect(generateQueryOptions({})).toEqual({});
});

it("should create equality comparison for type", () => {
  expect(generateQueryOptions({ type: "car" })).toEqual({
    type: { $eq: "car" }
  });
});

it("should create time limits for time option", () => {
  const fromTime = 20;
  const toTime = 50;
  expect(generateQueryOptions({ fromTime })).toEqual({
    time: { $gte: fromTime }
  });
  expect(generateQueryOptions({ toTime })).toEqual({ time: { $lte: toTime } });
  expect(generateQueryOptions({ fromTime, toTime })).toEqual({
    time: { $lte: toTime, $gte: fromTime }
  });
});

it("should use in operator for array of ids", () => {
  const ids = [2, 15];
  expect(generateQueryOptions({ ids })).toEqual({ id: { $in: ids } });
});

it("should use all options and provide correct query object", () => {
  const fromTime = 20;
  const toTime = 50;
  const ids = [2, 5];
  const type = "car";
  expect(generateQueryOptions({ fromTime, toTime, ids, type })).toEqual({
    id: { $in: ids },
    time: { $gte: fromTime, $lte: toTime },
    type: { $eq: type }
  });
});