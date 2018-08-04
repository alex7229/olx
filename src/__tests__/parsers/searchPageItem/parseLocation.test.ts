import {
  ILocation,
  parseLocation
} from "../../../application/parsers/searchPageItem/parseLocation";

it("should return only city if district is not specified", () => {
  const location = "\t\t\t\t\t\t\t\t\t\tДнепр";
  const parsedLocation: ILocation = { city: "Днепр" };
  expect(parseLocation(location)).toEqual(parsedLocation);
});

it("should parse city and district correctly", () => {
  const location = "    \n    \t\t\t      Винница, Ленинский         ";
  const parsedLocation: ILocation = {
    city: "Винница",
    cityDistrict: "Ленинский"
  };
  expect(parseLocation(location)).toEqual(parsedLocation);
});
