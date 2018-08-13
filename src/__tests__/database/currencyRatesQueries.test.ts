import * as _ from "lodash";
import { Db, ObjectID } from "mongodb";
import {
  addCurrencyRateQuery,
  ICurrencyExchangeRate
} from "../../application/database/queries/currencyRates/addCurrencyRateQuery";
import { fetchRecentCurrencyRateQuery } from "../../application/database/queries/currencyRates/fetchRecentCurrencyRateQuery";
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
  additionalCurrency: {
    name: "UAH",
    value: 25
  },
  mainCurrencyName: "USD"
};

const oldRate: ICurrencyExchangeRate = {
  additionalCurrency: {
    name: "UAH",
    value: 8
  },
  mainCurrencyName: "USD"
};

const objectIdMock = {
  createFromTime: jest.fn()
};

describe("add new currency exchange query", () => {
  it("should add one completely new exchange currency", async done => {
    const collectionName = "simple insert";
    const fetchQuery = async (db: Db) => null;
    const fetchQueryMock = jest.fn().mockReturnValue(fetchQuery);
    const rate = _.cloneDeep(currentRate);
    const query = addCurrencyRateQuery(
      collectionName,
      rate,
      fetchQueryMock,
      objectIdMock
    );
    const result = await query(connection.db);
    expect(result.insertedCount).toBe(1);
    expect(fetchQueryMock.mock.calls.length).toBe(1);
    expect(fetchQueryMock.mock.calls[0]).toEqual([
      collectionName,
      rate.mainCurrencyName,
      rate.additionalCurrency.name,
      objectIdMock
    ]);
    done();
  });

  it("should throw if latest exchange rate is more recent than one day", async () => {
    const collectionName = "recent fail";
    const fetchQuery = async (db: Db) => currentRate;
    const fetchQueryMock = jest.fn().mockReturnValue(fetchQuery);
    const query = addCurrencyRateQuery(
      collectionName,
      currentRate,
      fetchQueryMock,
      objectIdMock
    );
    try {
      await query(connection.db);
    } catch (e) {
      expect(e.message).toBe(
        "Cannot save new exchange rate. Non-obsolete rate is present"
      );
      return;
    }
    throw new Error("second query should throw but it did not");
  });
});

describe("fetch recent currency exchange rate query", () => {
  it("should fetch only one day old rates", async done => {
    const collectionName = "fetch recent currency";

    const ONE_HOUR_MS = 60 * 60 * 1000;
    const currentTime = new Date().getTime();
    const fiveHoursAgo = currentTime - 5 * ONE_HOUR_MS;
    const thirtyHoursAgo = currentTime - 30 * ONE_HOUR_MS;
    const fiveHoursRate = _.cloneDeep(currentRate);
    const thirtyHoursRate = _.cloneDeep(oldRate);

    fiveHoursRate._id = ObjectID.createFromTime(fiveHoursAgo);
    thirtyHoursRate._id = ObjectID.createFromTime(thirtyHoursAgo);

    const collection = connection.db.collection(collectionName);
    await collection.insertMany([thirtyHoursRate, fiveHoursRate]);

    const fetchQuery = fetchRecentCurrencyRateQuery(
      collectionName,
      fiveHoursRate.mainCurrencyName,
      fiveHoursRate.additionalCurrency.name,
      ObjectID
    );
    const result = await fetchQuery(connection.db);
    expect(result).toEqual(fiveHoursRate);
    done();
  });

  it("should return null if there is no recent rate in db", async done => {
    const collectionName = "empty fetch";
    const fetchQuery = fetchRecentCurrencyRateQuery(
      collectionName,
      currentRate.mainCurrencyName,
      currentRate.additionalCurrency.name,
      ObjectID
    );
    const result = await fetchQuery(connection.db);
    expect(result).toBe(null);
    done();
  });

  it("should throw if there is more than one recent rate", async () => {
    const collectionName = "multiple recent rates";
    const collection = connection.db.collection(collectionName);
    const currentRateCopy = _.cloneDeep(currentRate);
    const oldRateCopy = _.cloneDeep(oldRate);
    await collection.insertMany([currentRateCopy, oldRateCopy]);

    const fetchQuery = fetchRecentCurrencyRateQuery(
      collectionName,
      currentRate.mainCurrencyName,
      currentRate.additionalCurrency.name,
      ObjectID
    );

    try {
      await fetchQuery(connection.db);
    } catch (e) {
      expect(e.message).toMatch("Multiple recent rates are available");
      return;
    }
    throw new Error("expected query to throw but it did not");
  });
});
