import * as dotenv from "dotenv";
import {
  getConnectionInfo,
  IConnectionInfo
} from "../../../application/database/utils/getConnectionInfo";

dotenv.load();

export type GetConnectionInfoFactory = () => IConnectionInfo;

export const getConnectionInfoFactory: GetConnectionInfoFactory = () =>
  getConnectionInfo(process.env);
