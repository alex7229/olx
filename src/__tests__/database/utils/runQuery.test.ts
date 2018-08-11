import { MongoClient } from "mongodb";
import { IDbConnection } from "../../../application/database/utils/dbConnect";
import { runQuery } from "../../../application/database/utils/runQuery";

const uri = "some uri";
const dbName = "db name";

// any is used to simplify db tests. There is no need to connect to real db
const db: any = {};

it("should fail on connection error", async done => {
  const error = "connection error";
  const connectMock = jest.fn().mockRejectedValueOnce(error);
  const connection: IDbConnection = {
    clientInstance: new MongoClient(uri, { useNewUrlParser: true }),
    db
  };

  await expect(
    runQuery(uri, dbName, jest.fn(), connectMock, connection)
  ).rejects.toBe(error);
  done();
});

it("should fail on query error", async done => {
  const error = "query error";
  const badQuery = jest.fn().mockRejectedValueOnce(error);
  const clientInstance = new MongoClient(uri, { useNewUrlParser: true });
  clientInstance.isConnected = jest.fn().mockReturnValue(true);
  const connection: IDbConnection = {
    clientInstance,
    db
  };

  await expect(
    runQuery(uri, dbName, badQuery, jest.fn(), connection)
  ).rejects.toBe(error);
  done();
});

it("should reconnect to db if connection was lost", async done => {
  const clientInstance = new MongoClient(uri, { useNewUrlParser: true });
  clientInstance.isConnected = jest.fn().mockReturnValue(false);

  const connection = {
    clientInstance,
    db
  };
  const connectMock = jest.fn().mockResolvedValue(connection);

  const query = jest.fn().mockResolvedValue(true);
  await runQuery(uri, dbName, query, connectMock, connection);
  expect(connectMock.mock.calls.length).toBe(1);
  expect(connectMock.mock.calls[0][0]).toBe(uri);
  expect(connectMock.mock.calls[0][1]).toBe(dbName);
  done();
});

it("run query should return query result and current connection", async done => {
  const clientInstance = new MongoClient(uri, { useNewUrlParser: true });
  clientInstance.isConnected = jest.fn().mockReturnValue(true);
  const connection: IDbConnection = {
    clientInstance,
    db
  };
  const queryResult = { insertedCount: 1 };
  const query = jest.fn().mockResolvedValueOnce(queryResult);
  const result = await runQuery(uri, dbName, query, jest.fn(), connection);
  expect(result).toEqual({ queryResult, connection });
  expect(query.mock.calls[0][0]).toEqual(connection.db);
  done();
});
