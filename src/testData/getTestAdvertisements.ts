import * as _ from "lodash";
import { IAdvertisement } from "../application/database/queries/advertisements/fetchAdvertisementsQuery";

const advertisements: IAdvertisement[] = [
  {
    active: true,
    id: 12,
    location: {
      city: "London"
    },
    olxDelivery: true,
    price: {
      currency: "UAH",
      value: 100
    },
    promoted: false,
    time: 232323,
    title: "test adv name",
    type: "car",
    url: {
      fullUrl: "https://some.html",
      uniqueName: "bar"
    },
    user: {
      id: "sff",
      name: "alex"
    }
  },
  {
    active: true,
    id: 636,
    location: {
      city: "LA"
    },
    olxDelivery: true,
    price: {
      currency: "USD",
      value: 500
    },
    promoted: false,
    time: 663434,
    title: "test adv name 2",
    type: "real estate",
    url: {
      fullUrl: "https://some.html",
      uniqueName: "foo"
    },
    user: {
      name: "sasha"
    }
  },
  {
    active: false,
    id: 775,
    location: {
      city: "Moscow"
    },
    olxDelivery: true,
    price: {
      currency: "USD",
      value: 255
    },
    promoted: true,
    time: 50000,
    title: "test adv name 3",
    type: "bicycle",
    url: {
      fullUrl: "https://some.html",
      uniqueName: "foo"
    },
    user: {
      name: "sasha"
    }
  },
  {
    active: false,
    id: 2553,
    location: {
      city: "la"
    },
    olxDelivery: false,
    price: {
      currency: "USD",
      value: 152
    },
    promoted: false,
    time: 232323,
    title: "cool car",
    type: "car",
    url: {
      fullUrl: "some long url",
      uniqueName: "sfsfd"
    }
  }
];

export const getTestAdvertisements = () => _.cloneDeep(advertisements);
