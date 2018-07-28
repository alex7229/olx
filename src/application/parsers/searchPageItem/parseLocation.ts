export interface ILocation {
  city: string;
  cityDistrict?: string;
}
export type ParseLocation = (location: string) => ILocation;

export const parseLocation: ParseLocation = location => {
  const withoutWhitespace = location.replace(/[ \n]/g, "");
  const [city, cityDistrict] = withoutWhitespace.split(",");
  if (!cityDistrict) {
    return { city };
  }
  return { city, cityDistrict };
};
