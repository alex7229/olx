import { IResponse } from "../application/network/utils/handleRedirect";
import { updateCurrencyRate } from "../application/updateCurrencyRate";

it("should call all the methods with correct props", async done => {
  const json = {};
  const response: IResponse = { data: json, status: 200 };
  const fetchMock = jest.fn().mockResolvedValue(response);
  const validateMock = jest.fn().mockReturnValue(true);
  const exchangeRate = { currency: "usd", value: 23 };
  const parseApiMock = jest.fn().mockReturnValue(exchangeRate);
  const addCurrencyQueryMock = jest.fn().mockResolvedValue(true);

  const url =
    "https://api.privatbank.ua/p24api/pubinfo?json=true&exchange=&coursid=11";
  await updateCurrencyRate(
    fetchMock,
    validateMock,
    parseApiMock,
    addCurrencyQueryMock
  );

  expect(fetchMock.mock.calls.length).toBe(1);
  expect(fetchMock.mock.calls[0]).toEqual([url, true]);

  expect(validateMock.mock.calls.length).toBe(1);
  expect(validateMock.mock.calls[0][0]).toBe(json);

  expect(parseApiMock.mock.calls.length).toBe(1);
  expect(parseApiMock.mock.calls[0][0]).toBe(json);

  expect(addCurrencyQueryMock.mock.calls.length).toBe(1);
  expect(addCurrencyQueryMock.mock.calls[0][0]).toBe(exchangeRate);

  done();
});

it("should throw if response is not valid", async () => {
  const response: IResponse = { data: {}, status: 200 };
  const fetchMock = jest.fn().mockResolvedValue(response);
  const validateMock = jest.fn().mockReturnValue(false);
  try {
    await updateCurrencyRate(fetchMock, validateMock, jest.fn(), jest.fn());
  } catch (e) {
    expect(e.message).toBe("privat api response is not valid");
    return;
  }
  throw new Error("expected function to throw but it did not");
});
