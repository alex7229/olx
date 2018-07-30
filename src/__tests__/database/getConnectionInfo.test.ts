// this file is originally copypasted from https://github.com/tup1tsa/running_statistics/

import { getConnectionInfo } from "../../application/database/getConnectionInfo";

const defaultProcessEnv = {
  MONGODB_NAME: "prod db name",
  MONGODB_NAME_LOCAL: "local db name",
  MONGODB_URI: "prod db uri",
  MONGODB_URI_LOCAL: "local db uri",

  NODE_ENV: "production"
};

it("should get correct connection info", () => {
  const processEnv = { ...defaultProcessEnv };

  let info = getConnectionInfo(processEnv);
  expect(info.uri).toBe(processEnv.MONGODB_URI);
  expect(info.dbName).toBe(processEnv.MONGODB_NAME);

  delete processEnv.NODE_ENV;
  info = getConnectionInfo(processEnv);
  expect(info.uri).toBe(processEnv.MONGODB_URI_LOCAL);
  expect(info.dbName).toBe(processEnv.MONGODB_NAME_LOCAL);
});

it("should throw if connection info is undefined", () => {
  const error = "db uri or db name is not set in .env";
  const processEnv = { ...defaultProcessEnv };
  delete processEnv.MONGODB_NAME;
  expect(getConnectionInfo.bind(null, processEnv)).toThrow(error);
});
