import { sortAdvertisements } from "../application/sortAdvertisements";
import { getTestAdvertisements } from "../testData/getTestAdvertisements";

it("should sort by advertisement id creating sparse array", () => {
  const unsortedAdvertisements = getTestAdvertisements();
  unsortedAdvertisements.shift();
  unsortedAdvertisements[0].id = 12;
  unsortedAdvertisements[1].id = 7;
  unsortedAdvertisements[2].id = 1;
  const sortedAdvertisements = [];
  sortedAdvertisements[1] = unsortedAdvertisements[2];
  sortedAdvertisements[7] = unsortedAdvertisements[1];
  sortedAdvertisements[12] = unsortedAdvertisements[0];
  expect(sortAdvertisements(unsortedAdvertisements)).toEqual(
    sortedAdvertisements
  );
});

it("should remove empty space with flag", () => {
  const unsortedAdvertisements = getTestAdvertisements();
  unsortedAdvertisements.shift();
  unsortedAdvertisements.shift();
  unsortedAdvertisements[0].id = 5;
  unsortedAdvertisements[1].id = 2;
  expect(sortAdvertisements(unsortedAdvertisements, true)).toEqual([
    unsortedAdvertisements[1],
    unsortedAdvertisements[0]
  ]);
});
