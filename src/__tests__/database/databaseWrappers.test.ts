// this file is originally copypasted from https://github.com/tup1tsa/running_statistics/

import {
  connect,
  disconnect,
  runQuery
} from "../../application/database/databaseWrappers";

jest.mock("mongodb");
import { MongoClient } from "mongodb";

describe("database logic", () => {
  const db = {};
  let clientInstance: MongoClient;
  const Client = MongoClient;
  const uri = "db uri";
  const dbName = "db name";

  beforeEach(() => {
    clientInstance = new MongoClient(uri);
    clientInstance.db = jest.fn().mockReturnValue(db);
  });

  afterEach(() => {
    MongoClient.connect = Client.connect;
  });

  it("should connect and return db and client instances", async done => {
    const connectMock = jest.fn().mockResolvedValue(clientInstance);
    MongoClient.connect = connectMock;
    const result = await connect(
      uri,
      dbName
    );
    expect(connectMock.mock.calls.length).toBe(1);
    expect(connectMock.mock.calls[0][0]).toBe(uri);
    expect(result.clientInstance).toEqual(clientInstance);
    expect(result.db).toEqual(db);
    done();
  });

  it("should disconnect", async done => {
    const closeMock = jest.fn();
    clientInstance.close = closeMock;
    await disconnect(clientInstance);
    expect(closeMock.mock.calls.length).toBe(1);
    done();
  });

  it("should catch connection, close and query errors", async done => {
    const errors = {
      close: "close error",
      connection: "connection error",

      query: "query error"
    };
    let connectMock = jest.fn().mockRejectedValueOnce(errors.connection);
    MongoClient.connect = connectMock;
    await expect(runQuery(uri, dbName, jest.fn())).rejects.toBe(
      errors.connection
    );

    const badQuery = jest.fn().mockRejectedValueOnce(errors.query);
    connectMock = jest.fn().mockResolvedValue(clientInstance);
    MongoClient.connect = connectMock;
    await expect(runQuery(uri, dbName, badQuery)).rejects.toBe(errors.query);

    clientInstance.close = jest.fn().mockRejectedValueOnce(errors.close);
    await expect(runQuery(uri, dbName, jest.fn())).rejects.toBe(errors.close);
    done();
  });

  it("run query should return query result", async done => {
    const queryResult = { insertedCount: 1 };
    const connectMock = jest.fn().mockResolvedValueOnce(clientInstance);
    const query = jest.fn().mockResolvedValueOnce(queryResult);
    MongoClient.connect = connectMock;
    const result = await runQuery(uri, dbName, query);
    expect(result).toBe(queryResult);
    expect(query.mock.calls[0][0]).toEqual(db);
    done();
  });
});
