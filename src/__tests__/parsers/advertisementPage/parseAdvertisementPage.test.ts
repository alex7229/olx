import * as path from "path";
import { parseAdvertisementPage } from "../../../application/parsers/advertisementPage/parseAdvertisementPage";
import { readFile } from "../searchPageItem/parseAdvertisement.test";

it("should parse the page properly", async done => {
  const file = await readFile(
    path.join(__dirname, "./examples/advPage.html"),
    "utf-8"
  );
  expect(parseAdvertisementPage(file)).toEqual({
    id: 518940926,
    phoneToken: "3787dee20bcb4eedb9da7d8c22f37d"
  });
  done();
});

it("should throw if page does not have proper id and token", () => {
  expect(() => parseAdvertisementPage("fdsff")).toThrow();
});
