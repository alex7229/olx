import * as cheerio from "cheerio";
import {
  IAdvertisementPageRaw,
  parseAdvertisementPage
} from "../../../application/parsers/advertisementPage/parseAdvertisementPage";
import { readFile } from "../searchPageItem/parseAdvertisement.test";

describe("real page tests", () => {
  it("should parse page properly", async done => {
    const file = await readFile(
      "src/__tests__/parsers/advertisementPage/examples/advPage.html",
      "utf-8"
    );
    const pageData: IAdvertisementPageRaw = {
      active: true,
      advertisementIdText: "Номер объявления: 518940926",
      user: {
        link: "https://www.olx.ua/list/user/8rq1Q/",
        name:
          "\n" +
          "                                            Віталій                                    ",
        phoneToken: "3787dee20bcb4eedb9da7d8c22f37d"
      }
    };
    expect(parseAdvertisementPage(file, cheerio)).toEqual(pageData);
    done();
  });

  it("should parse inactive advertisement", async done => {
    const file = await readFile(
      "src/__tests__/parsers/advertisementPage/examples/inactiveAdvertisement.html",
      "utf-8"
    );
    const pageData: IAdvertisementPageRaw = {
      active: false,
      advertisementIdText: "Номер объявления: 549829870"
    };
    expect(parseAdvertisementPage(file, cheerio)).toEqual(pageData);
    done();
  });
});

describe("mock page tests", () => {
  const phoneBlock = `<script>phoneToken = 'fdsfdf'</script>`;
  const advBlock = `
  <div class="offer-titlebox__details">
    <small>Номер объявления: 3232</small>
  </div>`;
  const userBlock = `
  <div class="offer-user__details">
    <h4>
      <a href="link.html">Alex</a> 
    </h4>  
  </div>`;

  it("should parse mock page properly", () => {
    const page = phoneBlock + advBlock + userBlock;
    const pageData: IAdvertisementPageRaw = {
      active: true,
      advertisementIdText: "Номер объявления: 3232",
      user: {
        link: "link.html",
        name: "Alex",
        phoneToken: "fdsfdf"
      }
    };
    expect(parseAdvertisementPage(page, cheerio)).toEqual(pageData);
  });

  it("should throw if adv is active and user block is corrupted", () => {
    const page =
      phoneBlock + advBlock + '<div class="offer-user-details"></div>';
    expect(() => parseAdvertisementPage(page, cheerio)).toThrow();
  });

  it("should throw if adv is active and page does not have phone token", () => {
    const page = advBlock + userBlock;
    expect(() => parseAdvertisementPage(page, cheerio)).toThrow();
  });

  it("should throw if advertisement id block is corrupted", () => {
    const corruptedBlock = '<div class="offer-titlebox__details"></div>';
    const page = phoneBlock + corruptedBlock + userBlock;
    expect(() => parseAdvertisementPage(page, cheerio)).toThrow();
  });
});
