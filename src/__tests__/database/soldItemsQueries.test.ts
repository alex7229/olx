import {
  addToSoldQuery,
  ISoldItem
} from "../../application/database/queries/soldItems/addToSoldQuery";
import { fetchSoldItemsQuery } from "../../application/database/queries/soldItems/fetchSoldItemsQuery";
import { removeFromSoldQuery } from "../../application/database/queries/soldItems/removeFromSoldQuery";
import { IDbConnection } from "../../application/database/utils/dbConnect";
import { connectToTestDbFactory } from "../../factories/database/connectToTestDbFactory";

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
  price: {
    currency: "USD",
    value: 10000
  },
  type: "mercedes"
};

const soldHouse: ISoldItem = {
  advertisementId: 5522,
  price: {
    currency: "USD",
    value: 25000
  },
  type: "apartment"
};

const soldMouse: ISoldItem = {
  advertisementId: 6633,
  price: {
    currency: "UAH",
    value: 50
  },
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
  it("should fetch all items if options are not specified", async done => {
    const collectionName = "fetch all";
    const collection = connection.db.collection(collectionName);
    await collection.insertMany([soldCar, soldHouse, soldMouse]);
    const fetchQuery = fetchSoldItemsQuery(collectionName);
    const result = await fetchQuery(connection.db);
    expect(result).toEqual([soldCar, soldHouse, soldMouse]);
    done();
  });

  it("should fetch items by type", async done => {
    const collectionName = "fetch by type";
    const collection = connection.db.collection(collectionName);
    await collection.insertMany([soldCar, soldHouse, soldMouse]);
    const fetchQuery = fetchSoldItemsQuery(collectionName, {
      type: soldCar.type
    });
    const result = await fetchQuery(connection.db);
    expect(result).toEqual([soldCar]);
    done();
  });

  it("should fetch items by ids", async done => {
    const collectionName = "fetch by ids";
    const collection = connection.db.collection(collectionName);
    await collection.insertMany([soldCar, soldHouse, soldMouse]);
    const options = {
      ids: [soldCar.advertisementId, soldMouse.advertisementId]
    };
    const result = await fetchSoldItemsQuery(collectionName, options)(
      connection.db
    );
    expect(result).toEqual([soldCar, soldMouse]);
    done();
  });

  it("should fetch using every option", async done => {
    const collectionName = "fetch by every option";
    const collection = connection.db.collection(collectionName);
    await collection.insertMany([soldCar, soldHouse, soldMouse]);
    const options = {
      ids: [soldHouse.advertisementId, soldMouse.advertisementId],
      type: soldMouse.type
    };
    const query = fetchSoldItemsQuery(collectionName, options);
    const result = await query(connection.db);
    expect(result).toEqual([soldMouse]);
    done();
  });
});

describe("remove from sold items query", () => {
  it("should remove one item by it`s id", async done => {
    const collectionName = "remove by id";
    const collection = connection.db.collection(collectionName);
    await collection.insertMany([soldCar, soldMouse, soldHouse]);
    const id = soldHouse.advertisementId;
    const deleteQuery = removeFromSoldQuery(collectionName, id);
    const result = await deleteQuery(connection.db);
    expect(result.deletedCount).toBe(1);
    done();
  });
});
