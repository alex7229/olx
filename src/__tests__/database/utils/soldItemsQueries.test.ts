import {
  addToSoldQuery,
  ISoldItem
} from "../../../application/database/queries/soldItems/addToSoldQuery";
import { fetchSoldItemsQuery } from "../../../application/database/queries/soldItems/fetchSoldItemsQuery";
import { removeFromSoldQuery } from "../../../application/database/queries/soldItems/removeFromSoldQuery";
import { IDbConnection } from "../../../application/database/utils/dbConnect";
import { connectToTestDbFactory } from "../../../factories/database/connectToTestDbFactory";

let connection: IDbConnection;

beforeAll(async done => {
  connection = await connectToTestDbFactory("sold_items_test_db");
  await connection.db.dropDatabase();
  done();
});

afterAll(async done => {
  await connection.db.dropDatabase();
  await connection.clientInstance.close();
  done();
});

const soldCar: ISoldItem = {
  advertisementId: 323,
  price: 10000,
  type: "mercedes"
};

const soldHouse: ISoldItem = {
  advertisementId: 5522,
  price: 25000,
  type: "apartment"
};

const soldMouse: ISoldItem = {
  advertisementId: 6633,
  price: 5,
  type: "computer mouse"
};

describe("add to sold query", () => {
  it("should throw if there is item with the same advertisement id", async () => {
    const collectionName = "same id";
    const badMouse = { ...soldMouse, advertisementId: soldCar.advertisementId };
    const query = addToSoldQuery(collectionName, [soldCar, badMouse]);
    try {
      await query(connection.db);
    } catch (e) {
      expect(e.errmsg).toMatch("duplicate key");
      return;
    }
    throw new Error("expected query to throw but it did not");
  });

  it("should support multiple items addition", async done => {
    const collectionName = "multiple addition";
    const query = addToSoldQuery(collectionName, [soldCar, soldHouse]);
    const result = await query(connection.db);
    expect(result.insertedCount).toBe(2);
    done();
  });
});

describe("fetch sold items query", () => {
  it("should fetch all items if type is not specified", async done => {
    const collectionName = "fetch all";
    const saveQuery = addToSoldQuery(collectionName, [
      soldCar,
      soldHouse,
      soldMouse
    ]);
    await saveQuery(connection.db);
    const fetchQuery = fetchSoldItemsQuery(collectionName);
    const result = await fetchQuery(connection.db);
    expect(result).toEqual([soldCar, soldHouse, soldMouse]);
    done();
  });

  it("should fetch items by type", async done => {
    const collectionName = "fetch by type";
    const saveQuery = addToSoldQuery(collectionName, [
      soldCar,
      soldHouse,
      soldMouse
    ]);
    await saveQuery(connection.db);
    const fetchQuery = fetchSoldItemsQuery(collectionName, soldCar.type);
    const result = await fetchQuery(connection.db);
    expect(result).toEqual([soldCar]);
    done();
  });
});

describe("remove from sold items query", () => {
  it("should remove one item by it`s id", async done => {
    const collectionName = "remove by id";
    const saveQuery = addToSoldQuery(collectionName, [
      soldCar,
      soldMouse,
      soldHouse
    ]);
    await saveQuery(connection.db);
    const id = soldHouse.advertisementId;
    const deleteQuery = removeFromSoldQuery(collectionName, id);
    const result = await deleteQuery(connection.db);
    expect(result.deletedCount).toBe(1);
    done();
  });
});
