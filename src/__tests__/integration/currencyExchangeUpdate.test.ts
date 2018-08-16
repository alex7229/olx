import * as dotenv from "dotenv";
import { IDbConnection } from "../../application/database/utils/dbConnect";
import { connectToTestDbFactory } from "../../factories/database/connectToTestDbFactory";
import { currencyRateCollection } from "../../factories/database/queries/currencyRates/addCurrencyRateQueryFactory";
import { fetchCurrencyRateQueryFactory } from "../../factories/database/queries/currencyRates/fetchCurrencyRateQueryFactory";
import { updateCurrencyRateFactory } from "../../factories/updateCurrencyRateFactory";

let connection: IDbConnection;

beforeAll(async done => {
  dotenv.load();
  const dbName = process.env.MONGODB_NAME_LOCAL;
  if (!dbName) {
    throw new Error("db name should be set in the .env file");
  }
  connection = await connectToTestDbFactory(dbName);
  try {
    // drop collection would fail on non-existent collection, hence try/catch
    await connection.db.dropCollection(currencyRateCollection);
    // tslint:disable-next-line no-empty
  } catch (e) {}
  done();
});

afterAll(async done => {
  await connection.db.dropCollection(currencyRateCollection);
  await connection.clientInstance.close();
  done();
});

describe("exchange rate fetch from privat api and save into db", () => {
  it("should add new exchange rate to db properly", async done => {
    await updateCurrencyRateFactory();

    const currencies = {
      baseCurrency: "UAH",
      convertedCurrency: "USD"
    };
    const rates = await fetchCurrencyRateQueryFactory(currencies);
    expect(rates).not.toBe(null);
    // @ts-ignore
    expect(rates.baseCurrency.values.buy).toBeGreaterThan(20);
    done();
  });
});
