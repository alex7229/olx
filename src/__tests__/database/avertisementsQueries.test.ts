import * as dotenv from "dotenv";
import { Db, MongoClient } from "mongodb";
import { connect } from "../../application/database/databaseWrappers";
import { generateAdvertisementsQueryOptions } from "../../application/database/generateAdvertisementsQueryOptions";
import { getConnectionInfo } from "../../application/database/getConnectionInfo";
import {
  fetchAdvertisementsQuery,
  IAdvertisement
} from "../../application/database/queries/advertisements/fetchAdvertisementsQuery";
import { removeAdvertisementsQuery } from "../../application/database/queries/advertisements/removeAdvertisementsQuery";
import { saveAdvertisementsQuery } from "../../application/database/queries/advertisements/saveAdvertisementsQuery";

let client: MongoClient;
let db: Db;

const advertisements: IAdvertisement[] = [
  {
    id: 12,
    location: {
      city: "London"
    },
    olxDelivery: true,
    price: 100,
    promoted: false,
    time: 232323,
    title: "test adv name",
    type: "car",
    url: {
      fullUrl: "https://some.html",
      uniqueName: "bar"
    },
    user: {
      id: "sff",
      name: "alex"
    }
  },
  {
    id: 636,
    location: {
      city: "LA"
    },
    olxDelivery: true,
    price: 100,
    promoted: false,
    time: 663434,
    title: "test adv name 2",
    type: "real estate",
    url: {
      fullUrl: "https://some.html",
      uniqueName: "foo"
    },
    user: {
      id: "gs",
      name: "sasha"
    }
  },
  {
    id: 775,
    location: {
      city: "Moscow"
    },
    olxDelivery: true,
    price: 255,
    promoted: true,
    time: 50000,
    title: "test adv name 3",
    type: "bicycle",
    url: {
      fullUrl: "https://some.html",
      uniqueName: "foo"
    },
    user: {
      id: "gs",
      name: "sasha"
    }
  }
];

beforeAll(() => dotenv.load());

beforeEach(async done => {
  const connectionInfo = getConnectionInfo(process.env);
  const result = await connect(
    connectionInfo.uri,
    connectionInfo.dbName
  );
  client = result.clientInstance;
  db = result.db;
  done();
});

afterEach(async done => {
  await db.dropDatabase();
  await client.close();
  done();
});

describe("fetch advertisements query", () => {
  it("should fetch all advertisements properly", async done => {
    const collectionName = "fetchAll";
    const query = saveAdvertisementsQuery(collectionName, advertisements);
    await query(db);
    const fetchQuery = fetchAdvertisementsQuery(collectionName, {});
    const result = await fetchQuery(db);
    expect(result).toEqual(advertisements);
    done();
  });

  it("should fetch advertisements with options object", async done => {
    const collectionName = "fetchSome";
    await saveAdvertisementsQuery(collectionName, advertisements)(db);
    const options = generateAdvertisementsQueryOptions({
      fromTime: 500000,
      type: "real estate"
    });
    const fetchQuery = fetchAdvertisementsQuery(collectionName, options);
    const result = await fetchQuery(db);
    expect(result).toEqual([advertisements[1]]);
    done();
  });
});

describe("save advertisements query", () => {
  it("should save advertisements properly", async done => {
    const collectionName = "save";
    const query = saveAdvertisementsQuery(collectionName, advertisements);
    await query(db);
    const cursor = await db.collection(collectionName).find();
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
    await expect(removeQuery(db)).rejects.toEqual(
      new Error("at least one option should be specified")
    );
    done();
  });

  it("should remove advertisements properly", async done => {
    const collectionName = "remove";
    await saveAdvertisementsQuery(collectionName, advertisements)(db);
    const options = generateAdvertisementsQueryOptions({ toTime: 500000 });
    const deleteQuery = removeAdvertisementsQuery(collectionName, options);
    await deleteQuery(db);
    const cursor = await db.collection(collectionName).find();
    const docs = await cursor.toArray();
    expect(docs.length).toBe(1);
    expect(docs).toEqual([advertisements[1]]);
    done();
  });
});
