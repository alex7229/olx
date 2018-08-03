import { fetchFactory } from "../../factories/network/utils/fetchFactory";
import { parseAdvertisementDetailsFactory } from "../../factories/parsers/advertisementPage/parseAdvertisementDetailsFactory";
import { parseSearchPageFactory } from "../../factories/parsers/searchPage/parseSearchPageFactory";
import { parseAdvertisementMainInfoFactory } from "../../factories/parsers/searchPageItem/parseAdvertisementMainInfoFactory";

it(
  "should download and parse search page and first adv. details",
  async done => {
    const response = await fetchFactory(
      "https://www.olx.ua/elektronika/kompyutery-i-komplektuyuschie/komplektuyuschie-i-aksesuary" +
        "/videokarty/q-1060/?search%5Bprivate_business%5D=private"
    );
    const searchPage = parseSearchPageFactory(response.data);
    const items = searchPage.items.map(itemHtml =>
      parseAdvertisementMainInfoFactory(itemHtml)
    );
    expect(items.length).toBeGreaterThan(0);
    const firstAdvertisementUrl = items[0].url.fullUrl;
    const advertisementResponse = await fetchFactory(firstAdvertisementUrl);
    expect(() =>
      parseAdvertisementDetailsFactory(advertisementResponse.data)
    ).not.toThrow();
    done();
  },
  15000
);
