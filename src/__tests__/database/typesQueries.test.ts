import * as dotenv from "dotenv";
import { Db, MongoClient, MongoError } from "mongodb";
import { connect } from "../../application/database/databaseWrappers";
import { getConnectionInfo } from "../../application/database/getConnectionInfo";
import { fetchTypesQuery } from "../../application/database/queries/types/fetchTypesQuery";
import { removeTypeQuery } from "../../application/database/queries/types/removeTypeQuery";
import { replaceTypeQuery } from "../../application/database/queries/types/replaceTypeQuery";
import {
  IAdvertisementType,
  saveNewTypeQuery
} from "../../application/database/queries/types/saveNewTypeQuery";

let client: MongoClient;
let db: Db;

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

describe("save new type query", () => {
  it("should save new type", async done => {
    const collectionName = "new_type_simple";
    const type: IAdvertisementType = {
      regExp: ".*",
      type: "iphone",
      url: "some url"
    };
    const query = saveNewTypeQuery(collectionName, type);
    const result = await query(db);
    expect(result.insertedCount).toBe(1);
    expect(result.result.ok).toBe(1);
    done();
  });

  it("should fail on the same type insert", async done => {
    const collectionName = "fail_type";
    const firstType: IAdvertisementType = {
      regExp: ".*",
      type: "car",
      url: "any url"
    };
    const secondType: IAdvertisementType = {
      regExp: ".*",
      type: "car",
      url: "another url"
    };
    const firstQuery = saveNewTypeQuery(collectionName, firstType);
    const secondQuery = saveNewTypeQuery(collectionName, secondType);

    const firstQueryResult = await firstQuery(db);
    expect(firstQueryResult.insertedCount).toBe(1);
    expect(firstQueryResult.result.ok).toBe(1);
    await expect(secondQuery(db)).rejects.toEqual(expect.any(MongoError));
    done();
  });

  it("should fail on adding new type with the same url with the same regExp", async done => {
    const collectionName = "same_url_same_regExp";
    const firstType: IAdvertisementType = {
      regExp: "blue",
      type: "blue car shine",
      url: "same url"
    };
    const secondType: IAdvertisementType = {
      regExp: "blue",
      type: "blue car tiny",
      url: "same url"
    };
    const firstQuery = saveNewTypeQuery(collectionName, firstType);
    const secondQuery = saveNewTypeQuery(collectionName, secondType);

    const firstQueryResult = await firstQuery(db);
    expect(firstQueryResult.insertedCount).toBe(1);

    await expect(secondQuery(db)).rejects.toEqual(expect.any(MongoError));
    done();
  });

  it("should save new type with the same url but different regExp", async done => {
    const collectionName = "same_url_different_regExp";
    const blueCarType: IAdvertisementType = {
      regExp: "blue",
      type: "blue car",
      url: "same url"
    };
    const redCarType: IAdvertisementType = {
      regExp: "red",
      type: "red car",
      url: "same url"
    };
    const blueCarQuery = saveNewTypeQuery(collectionName, blueCarType);
    const redCarQuery = saveNewTypeQuery(collectionName, redCarType);

    const blueCarResult = await blueCarQuery(db);
    const redCarResult = await redCarQuery(db);

    expect(blueCarResult.insertedCount).toBe(1);
    expect(redCarResult.insertedCount).toBe(1);
    done();
  });
});

describe("fetch type query", () => {
  it("should fetch all types", async done => {
    const collectionName = "fetch_all";
    const firstType: IAdvertisementType = {
      regExp: "/.*/",
      type: "yellow car",
      url: "another url"
    };
    const secondType: IAdvertisementType = {
      regExp: "/.*/",
      type: "blue car",
      url: "some url"
    };
    await saveNewTypeQuery(collectionName, firstType)(db);
    await saveNewTypeQuery(collectionName, secondType)(db);
    const fetchQuery = fetchTypesQuery(collectionName);
    const result = await fetchQuery(db);
    expect(result).toEqual([firstType, secondType]);
    done();
  });

  it("should fetch only specified types", async done => {
    const collectionName = "fetch_some";
    const firstType: IAdvertisementType = {
      regExp: ".*",
      type: "car",
      url: "car url"
    };
    const secondType: IAdvertisementType = {
      regExp: ".*",
      type: "bike",
      url: "another url"
    };
    await saveNewTypeQuery(collectionName, firstType)(db);
    await saveNewTypeQuery(collectionName, secondType)(db);
    const fetchQuery = fetchTypesQuery(collectionName, "bike");
    const result = await fetchQuery(db);
    expect(result.length).toBe(1);
    expect(result[0]).toEqual(secondType);
    done();
  });
});

describe("remove type query", () => {
  it("should remove one row by type", async done => {
    const collectionName = "remove_one";
    const firstType: IAdvertisementType = {
      regExp: ".*",
      type: "car",
      url: "car url"
    };
    const secondType: IAdvertisementType = {
      regExp: ".*",
      type: "bike",
      url: "another url"
    };
    await saveNewTypeQuery(collectionName, firstType)(db);
    await saveNewTypeQuery(collectionName, secondType)(db);

    const deleteQuery = removeTypeQuery(collectionName, "bike");
    const successDeletion = await deleteQuery(db);
    expect(successDeletion.deletedCount).toBe(1);

    const sameDeletion = await deleteQuery(db);
    expect(sameDeletion.deletedCount).toBe(0);
    done();
  });
});

describe("replace type query", () => {
  it("should update properly", async done => {
    const collectionName = "replace_success";
    const carType: IAdvertisementType = {
      regExp: ".*",
      type: "car",
      url: "car url"
    };
    const bikeType = {
      _id: "172",
      regExp: ".*",
      type: "bike",
      url: "bike url"
    };
    const newBikeType: IAdvertisementType = {
      regExp: ".+",
      type: "bike new",
      url: "new bike url"
    };
    await saveNewTypeQuery(collectionName, carType)(db);
    await saveNewTypeQuery(collectionName, bikeType)(db);

    const replaceQuery = replaceTypeQuery(
      collectionName,
      bikeType._id,
      newBikeType
    );
    const result = await replaceQuery(db);
    expect(result.modifiedCount).toBe(1);

    const docsAfterReplacement = await fetchTypesQuery(collectionName)(db);
    expect(docsAfterReplacement).toEqual([
      carType,
      { _id: bikeType._id, ...newBikeType }
    ]);
    done();
  });

  it("should fail if insert is impossible", async done => {
    const collectionName = "replace_fail";
    const carType: IAdvertisementType = {
      regExp: ".*",
      type: "car",
      url: "car url"
    };
    const bikeType = {
      _id: "172",
      regExp: ".*",
      type: "bike",
      url: "bike url"
    };
    const bikeReplacementType: IAdvertisementType = {
      regExp: ".*",
      type: "car",
      url: "bike url"
    };
    await saveNewTypeQuery(collectionName, carType)(db);
    await saveNewTypeQuery(collectionName, bikeType)(db);

    const replaceQuery = replaceTypeQuery(
      collectionName,
      bikeType._id,
      bikeReplacementType
    );
    await expect(replaceQuery(db)).rejects.toEqual(expect.any(MongoError));
    done();
  });
});
