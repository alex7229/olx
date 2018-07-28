import * as moment from "moment";
import {
  ParseCloseDays,
  parseCloseDays,
  ParseDate,
  parseDate,
  parseTime
} from "../../../application/parsers/searchPageItem/parseTime";

describe("parse close days function", () => {
  const format = "DO.MM.YYYY HH:mm";
  const currentTime = moment("17.02.2018 07:56", format).valueOf();

  it("should parse today time properly", () => {
    const time = "\n" + "              Сегодня 00:19               ";
    const expectedTime = moment("17.02.2018 00:19", format).valueOf();
    expect(parseCloseDays(time, moment, currentTime)).toBe(expectedTime);
  });

  it("should parse yesterday time properly", () => {
    const expectedTime = moment("16.02.2018 23:10", format).valueOf();
    const time = `     
                    Вчера 23:10                 `;
    expect(parseCloseDays(time, moment, currentTime)).toBe(expectedTime);
  });

  it("should throw if time has bad format", () => {
    expect(() => parseCloseDays("23:17 Вчера", moment, currentTime)).toThrow();
  });
});

describe("parse date function", () => {
  const format = "DO.MM.YYYY";
  const currentTime = moment("17.02.2018", format).valueOf();

  it("should parse date from the previous year", () => {
    const date = "     \n        21  июль               ";
    const expectedTime = moment("21.07.2017", format).valueOf();

    expect(parseDate(date, moment, currentTime)).toBe(expectedTime);
  });

  it("should parse date from the current year", () => {
    const date = "     \n        08  январь               ";
    const expectedTime = moment("08.01.2018", format).valueOf();
    expect(parseDate(date, moment, currentTime)).toBe(expectedTime);
  });

  it("should throw if date had bad format", () => {
    expect(() => parseDate("", moment, currentTime)).toThrow();
    expect(() => parseDate("fsdf", moment, currentTime)).toThrow();
  });
});

describe("parse time function", () => {
  it("should throw if both formats are not applicable to the input", () => {
    const parseCloseDaysMock: ParseCloseDays = () => {
      throw new Error("");
    };
    const parseDateMock: ParseDate = () => {
      throw new Error("");
    };
    expect(() =>
      parseTime("fsdf", moment, 232, parseDateMock, parseCloseDaysMock)
    ).toThrow();
  });

  it("should return date parsing if parse close days throws", () => {
    const parseCloseDaysMock: ParseCloseDays = () => {
      throw new Error("");
    };
    const parseDateMock: ParseDate = () => 25;
    expect(
      parseTime("fsdf", moment, 232, parseDateMock, parseCloseDaysMock)
    ).toBe(25);
  });

  it("should return close days parsing if date func throws", () => {
    const parseCloseDaysMock: ParseCloseDays = () => 44;
    const parseDateMock: ParseDate = () => {
      throw new Error("");
    };
    expect(
      parseTime("fsdf", moment, 232, parseDateMock, parseCloseDaysMock)
    ).toBe(44);
  });
});
