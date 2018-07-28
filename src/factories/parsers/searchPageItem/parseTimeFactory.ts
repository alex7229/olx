import * as moment from "moment";
import {
  parseCloseDays,
  parseDate,
  parseTime
} from "../../../application/parsers/searchPageItem/parseTime";

export type ParseTimeFactory = (input: string) => number;

export const parseTimeFactory: ParseTimeFactory = input =>
  parseTime(input, moment, new Date().getTime(), parseDate, parseCloseDays);
