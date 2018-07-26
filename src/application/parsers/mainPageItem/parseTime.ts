import {
  Moment as IMoment,
  MomentFormatSpecification,
  MomentInput
} from "moment";

export type MomentFunc = (
  input?: MomentInput,
  format?: MomentFormatSpecification,
  lang?: string
) => IMoment;

export type ParseDate = (
  input: string,
  moment: MomentFunc,
  currentTimestamp: number
) => number;

export type ParseCloseDays = (
  input: string,
  moment: MomentFunc,
  currentTimestamp: number
) => number;

type ParseTime = (
  input: string,
  moment: MomentFunc,
  currentTimestamp: number,
  parseDate: ParseDate,
  parseCloseDays: ParseCloseDays
) => number;

export const parseDate: ParseDate = (input, moment, currentTimestamp) => {
  const pureTime = input.replace(/[ \n]/g, "");
  const time = moment(pureTime, "DoMMMM", "ru");
  if (!time.isValid()) {
    throw new Error("time format is not recognized");
  }
  if (time.valueOf() > currentTimestamp) {
    time.subtract(1, "year");
  }
  return time.valueOf();
};

export const parseCloseDays: ParseCloseDays = (
  input,
  moment,
  currentTimestamp
) => {
  const regExp = /(Вчера|Сегодня) (\d+):(\d+)/i;
  const match = input.match(regExp);
  if (match === null) {
    throw new Error("date has bad format");
  }

  const isYesterday = match[1] === "Вчера";
  const hours = parseInt(match[2], 10);
  const minutes = parseInt(match[3], 10);

  const time = moment(currentTimestamp);
  if (isYesterday) {
    time.subtract(1, "day");
  }
  time
    .hours(hours)
    .minutes(minutes)
    .seconds(0)
    .milliseconds(0);
  return time.valueOf();
};

export const parseTime: ParseTime = (
  input,
  moment,
  currentTimestamp,
  parseDateFunc,
  parseCloseDaysFunc
) => {
  let time: null | number = null;
  try {
    time = parseCloseDaysFunc(input, moment, currentTimestamp);
    // tslint:disable-next-line no-empty
  } catch (e) {}
  try {
    time = parseDateFunc(input, moment, currentTimestamp);
    // tslint:disable-next-line no-empty
  } catch (e) {}
  if (time === null) {
    throw new Error("time format is incorrect");
  }
  return time;
};
