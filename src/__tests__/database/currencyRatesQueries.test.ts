import * as _ from "lodash";
import { ObjectID } from "mongodb";
import {
  addCurrencyRatesQuery,
  ICurrencyExchangeRate
} from "../../application/database/queries/currencyRates/addCurrencyRatesQuery";
import {
  fetchCurrencyRateQuery,
  ICurrencyExchangeRateWithTime
} from "../../application/database/queries/currencyRates/fetchCurrencyRateQuery";
import { IDbConnection } from "../../application/database/utils/dbConnect";
import { connectToTestDbFactory } from "../../factories/database/connectToTestDbFactory";

let connection: IDbConnection;

beforeAll(async done => {
  connection = await connectToTestDbFactory("currency_test_db");
  await connection.db.dropDatabase();
  done();
});

afterAll(async done => {
  await connection.db.dropDatabase();
  await connection.clientInstance.close();
  done();
});

const currentRate: ICurrencyExchangeRate = {
  baseCurrency: {
    name: "UAH",
    values: {
      buy: 25,
      sell: 26
    }
  },
  convertedCurrency: "USD"
};

const oldRate: ICurrencyExchangeRate = {
  baseCurrency: {
    name: "UAH",
    values: {
      buy: 8,
      sell: 8.2
    }
  },
  convertedCurrency: "USD"
};

describe("add new currency exchange query", () => {
  const uniqWithMock = <T>(list: T[]) => list;

  it("should add one completely new exchange currency rate", async done => {
    const collectionName = "simple insert";
    const fetchQueryMock = jest.fn().mockResolvedValue(null);
    const rates = [_.cloneDeep(currentRate)];
    const query = addCurrencyRatesQuery(
      collectionName,
      rates,
      fetchQueryMock,
      uniqWithMock
    );
    const result = await query(connection.db);
    expect(result.insertedCount).toBe(1);
    done();
  });

  it("should add new rates if latest rate is obsolete", async done => {
    const collectionName = "obsolete rates";
    const currentRateCopy = _.cloneDeep(currentRate);
    const oldRateCopy = _.cloneDeep(oldRate);
    const twoDaysRate: ICurrencyExchangeRateWithTime = {
      ..._.cloneDeep(oldRate),
      updateTime: new Date().getTime() - 2 * 24 * 60 * 60 * 1000
    };
    const fetchQueryMock = jest.fn().mockResolvedValue(twoDaysRate);
    const query = addCurrencyRatesQuery(
      collectionName,
      [oldRateCopy, currentRateCopy],
      fetchQueryMock,
      uniqWithMock
    );
    const result = await query(connection.db);
    expect(result.insertedCount).toBe(2);
    done();
  });

  it("should throw if the currency rate is present multiple times", async () => {
    const collectionName = "multiple times fail";
    const fetchQueryMock = jest.fn().mockResolvedValue(null);
    const rates = [_.cloneDeep(currentRate), _.cloneDeep(currentRate)];
    const query = addCurrencyRatesQuery(
      collectionName,
      rates,
      fetchQueryMock,
      _.uniqWith
    );
    try {
      await query(connection.db);
    } catch (e) {
      expect(e.message).toBe("duplicate rates entries");
      return;
    }
    throw new Error("expected query to throw but it did not");
  });

  it("should throw if the rates were updated that day", async () => {
    const collectionName = "recent fail";
    const oneHourRate: ICurrencyExchangeRateWithTime = {
      ..._.cloneDeep(currentRate),
      updateTime: new Date().getTime() - 60 * 60 * 1000
    };
    const fetchQueryMock = jest.fn().mockResolvedValue(oneHourRate);
    const query = addCurrencyRatesQuery(
      collectionName,
      [currentRate],
      fetchQueryMock,
      uniqWithMock
    );
    try {
      await query(connection.db);
    } catch (e) {
      expect(e.message).toBe("rates were updated recently");
      return;
    }
    throw new Error("expected query to throw but it did not");
  });
});

describe("fetch currency exchange rate query", () => {
  it("should return proper update time of the exchange rate doc", async done => {
    const collectionName = "fetch time";
    const collection = connection.db.collection(collectionName);
    const currentRateCopy = _.cloneDeep(currentRate);
    await collection.insertOne(currentRateCopy);

    const fetchQuery = fetchCurrencyRateQuery(collectionName, ObjectID, {
      baseCurrency: currentRateCopy.baseCurrency.name,
      convertedCurrency: currentRateCopy.convertedCurrency
    });
    const result = (await fetchQuery(
      connection.db
    )) as ICurrencyExchangeRateWithTime;

    const currentTime = new Date().getTime();
    const oneMinuteAgo = currentTime - 60 * 1000;

    expect(result.updateTime).toBeGreaterThan(oneMinuteAgo);
    expect(result.updateTime).toBeLessThan(currentTime);
    done();
  });

  it("should return null if there is no exchange rate in db", async done => {
    const collectionName = "empty fetch";
    const collection = connection.db.collection(collectionName);
    const currentRateCopy = _.cloneDeepWith(currentRate);
    await collection.insertOne(currentRateCopy);
    const fetchQuery = fetchCurrencyRateQuery(collectionName, ObjectID, {
      baseCurrency: "eur",
      convertedCurrency: "usd"
    });
    const result = await fetchQuery(connection.db);
    expect(result).toBe(null);
    done();
  });

  it("should return the most recent exchange rate if multiple are present", async done => {
    const collectionName = "multiple rates";
    const collection = connection.db.collection(collectionName);
    const currentRateCopy = _.cloneDeep(currentRate);
    const oldRateCopy = _.cloneDeep(oldRate);
    // promise.all is not used in order to insert in proper order
    await collection.insertOne(oldRateCopy);
    await collection.insertOne(currentRateCopy);

    const fetchQuery = fetchCurrencyRateQuery(collectionName, ObjectID, {
      baseCurrency: currentRate.baseCurrency.name,
      convertedCurrency: currentRate.convertedCurrency
    });

    const result = (await fetchQuery(
      connection.db
    )) as ICurrencyExchangeRateWithTime;

    expect(result.baseCurrency).toEqual(currentRateCopy.baseCurrency);
    done();
  });

  it("should return any latest exchange rate if currency is not specified", async done => {
    const collectionName = "any currency rate";
    const collection = connection.db.collection(collectionName);
    const oldRateCopy = _.cloneDeep(oldRate);
    const currentRateCopy = _.cloneDeep(currentRate);
    await collection.insertMany([oldRateCopy, currentRateCopy]);

    const fetchQuery = fetchCurrencyRateQuery(collectionName, ObjectID);
    const result = await fetchQuery(connection.db);

    expect(result).not.toEqual(null);
    done();
  });
});
