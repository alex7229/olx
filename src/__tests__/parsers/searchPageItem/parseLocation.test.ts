import {
  ILocation,
  parseLocation
} from "../../../application/parsers/searchPageItem/parseLocation";

it("should return only city if district is not specified", () => {
  const location = "    Киев     ";
  const parsedLocation: ILocation = { city: "Киев" };
  expect(parseLocation(location)).toEqual(parsedLocation);
});

it("should parse city and district correctly", () => {
  const location = "    \n          Винница, Ленинский         ";
  const parsedLocation: ILocation = {
    city: "Винница",
    cityDistrict: "Ленинский"
  };
  expect(parseLocation(location)).toEqual(parsedLocation);
});
