import { MongoClient } from "mongodb";
import { dbDisconnect } from "../../../application/database/utils/dbDisconnect";

it("should disconnect", async done => {
  const clientInstance = new MongoClient("some_uri");
  const closeMock = jest.fn();
  clientInstance.close = closeMock;
  await dbDisconnect(clientInstance);
  expect(closeMock.mock.calls.length).toBe(1);
  done();
});
