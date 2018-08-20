import { fetchAdvertisementsQuery } from "../../application/database/queries/advertisements/fetchAdvertisementsQuery";
import { removeAdvertisementsQuery } from "../../application/database/queries/advertisements/removeAdvertisementsQuery";
import { saveAdvertisementsQuery } from "../../application/database/queries/advertisements/saveAdvertisementsQuery";
import { IDbConnection } from "../../application/database/utils/dbConnect";
import { connectToTestDbFactory } from "../../factories/database/connectToTestDbFactory";
import { getTestAdvertisements } from "../../testData/getTestAdvertisements";

let connection: IDbConnection;

const advertisements = getTestAdvertisements();

beforeAll(async done => {
  connection = await connectToTestDbFactory("advertisements_test_db");
  await connection.db.dropDatabase();
  done();
});

afterAll(async done => {
  await connection.db.dropDatabase();
  await connection.clientInstance.close();
  done();
});

describe("fetch advertisements query", () => {
  it("should fetch all advertisements properly", async done => {
    const collectionName = "fetchAll";
    const query = saveAdvertisementsQuery(collectionName, advertisements);
    await query(connection.db);
    const fetchQuery = fetchAdvertisementsQuery(collectionName, {});
    const result = await fetchQuery(connection.db);
    expect(result).toEqual(advertisements);
    done();
  });

  it("should fetch advertisements by type", async done => {
    const collectionName = "fetch by type";
    const query = saveAdvertisementsQuery(collectionName, advertisements);
    await query(connection.db);
    const fetchQuery = fetchAdvertisementsQuery(collectionName, {
      type: "car"
    });
    const result = await fetchQuery(connection.db);
    expect(result).toEqual([advertisements[0], advertisements[3]]);
    done();
  });

  it("should fetch advertisements by ids", async done => {
    const collectionName = "fetch by ids";
    const query = saveAdvertisementsQuery(collectionName, advertisements);
    await query(connection.db);
    const fetchQuery = fetchAdvertisementsQuery(collectionName, {
      ids: [advertisements[0].id, advertisements[2].id]
    });
    const result = await fetchQuery(connection.db);
    expect(result).toEqual([advertisements[0], advertisements[2]]);
    done();
  });

  it("should fetch advertisements by time limit", async done => {
    const collectionName = "fetch by time limit";
    const query = saveAdvertisementsQuery(collectionName, advertisements);
    await query(connection.db);
    const fetchQuery = fetchAdvertisementsQuery(collectionName, {
      timeLimit: {
        fromTime: 25,
        toTime: 55
      }
    });
    const result = await fetchQuery(connection.db);
    expect(result).toEqual([advertisements[0], advertisements[2]]);
    done();
  });

  it("should fetch advertisements using all options", async done => {
    const collectionName = "fetch using everything";
    const query = saveAdvertisementsQuery(collectionName, advertisements);
    await query(connection.db);
    const fetchQuery = fetchAdvertisementsQuery(collectionName, {
      ids: [advertisements[0].id, advertisements[2].id],
      timeLimit: {
        fromTime: 25,
        toTime: 55
      },
      type: advertisements[2].type
    });
    const result = await fetchQuery(connection.db);
    expect(result).toEqual([advertisements[2]]);
    done();
  });
});

describe("save advertisements query", () => {
  it("should save advertisements properly", async done => {
    const collectionName = "save";
    const query = saveAdvertisementsQuery(collectionName, advertisements);
    await query(connection.db);
    const cursor = await connection.db.collection(collectionName).find();
    const docs = await cursor.toArray();
    expect(docs.length).toBe(advertisements.length);
    expect(docs).toEqual(advertisements);
    done();
  });
});

describe("remove advertisements query", () => {
  it("remove advertisement should throw if query object is empty", async done => {
    const collectionName = "removeError";
    const removeQuery = removeAdvertisementsQuery(collectionName, {});
    await expect(removeQuery(connection.db)).rejects.toEqual(
      new Error("at least one option should be specified")
    );
    done();
  });

  it("should remove advertisements by time limit", async done => {
    const collectionName = "remove by time";
    await saveAdvertisementsQuery(collectionName, advertisements)(
      connection.db
    );
    const options = { timeLimit: { fromTime: 25, toTime: 55 } };
    const deleteQuery = removeAdvertisementsQuery(collectionName, options);
    await deleteQuery(connection.db);
    const cursor = await connection.db.collection(collectionName).find();
    const docs = await cursor.toArray();
    expect(docs.length).toBe(2);
    expect(docs).toEqual([advertisements[1], advertisements[3]]);
    done();
  });

  it("should remove advertisements by ids", async done => {
    const collectionName = "remove by ids";
    await saveAdvertisementsQuery(collectionName, advertisements)(
      connection.db
    );
    const options = { ids: [advertisements[0].id, advertisements[1].id] };
    const deleteQuery = removeAdvertisementsQuery(collectionName, options);
    await deleteQuery(connection.db);
    const cursor = await connection.db.collection(collectionName).find();
    const docs = await cursor.toArray();
    expect(docs.length).toBe(2);
    expect(docs).toEqual([advertisements[2], advertisements[3]]);
    done();
  });

  it("should remove advertisements using all options", async done => {
    const collectionName = "remove using every option";
    await saveAdvertisementsQuery(collectionName, advertisements)(
      connection.db
    );
    const options = {
      ids: [636],
      timeLimit: { fromTime: 15, toTime: 55 }
    };
    const deleteQuery = removeAdvertisementsQuery(collectionName, options);
    await deleteQuery(connection.db);
    const cursor = await connection.db.collection(collectionName).find();
    const docs = await cursor.toArray();
    expect(docs.length).toBe(3);
    expect(docs).toEqual([
      advertisements[0],
      advertisements[2],
      advertisements[3]
    ]);
    done();
  });
});
