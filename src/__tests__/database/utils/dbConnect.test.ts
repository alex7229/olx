import { dbConnect } from "../../../application/database/utils/dbConnect";

it("should connect and return db and client instances", async done => {
  const db = {};
  const clientInstance = {
    db: jest.fn().mockReturnValue(db)
  };
  const connectMock = jest.fn().mockResolvedValue(clientInstance);

  const uri = "db uri";
  const dbName = "db name";

  let receivedUri: undefined | string;
  let receivedOptions: undefined | object;

  class MongoClientMock {
    public connect = connectMock;
    public isConnected = jest.fn();
    public close = jest.fn();
    public db = jest.fn();

    constructor(requestedUri: string, requestedOptions: object) {
      receivedUri = requestedUri;
      receivedOptions = requestedOptions;
    }
  }

  const result = await dbConnect(uri, dbName, MongoClientMock);
  expect(connectMock.mock.calls.length).toBe(1);
  expect(receivedUri).toBe(uri);
  expect(receivedOptions).toEqual({ useNewUrlParser: true });
  expect(result.clientInstance).toEqual(clientInstance);
  expect(clientInstance.db.mock.calls.length).toBe(1);
  expect(clientInstance.db.mock.calls[0][0]).toBe(dbName);
  expect(result.db).toEqual(db);
  done();
});
