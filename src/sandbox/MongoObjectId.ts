import { ObjectID } from "mongodb";

const currentTime = new Date().getTime();
const hex2011 = "5272e0f00000000000000000";

const currentHex = ObjectID.createFromTime(currentTime);
const date2011 = new ObjectID(hex2011).getTimestamp();

// tslint:disable-next-line no-console
console.log(
  `current time hex is ${currentHex}`, // something like '30a7e5200000000000000000'
  `2011 date is ${date2011}` // Fri Nov 01 2013 01:00:00 GMT+0200 (FLE Standard Time)
);
