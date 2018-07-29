import { parseAdvertisementId } from "../../../application/parsers/advertisementPage/parseAdvertisementId";

it("should throw if adv id block has incorrect format", () => {
  expect(() => parseAdvertisementId("Номер оения: 3232")).toThrow();
});

it("should parse id properly", () => {
  expect(parseAdvertisementId("Номер объявления: 3232")).toBe(3232);
});
