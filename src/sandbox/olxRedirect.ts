import { fetchFactory } from "../factories/network/utils/fetchFactory";

export const run = () =>
  fetchFactory("https://www.olx.ua/list/q-1060-6gb/?page=70").then(response => {
    response.data = null;
    // tslint:disable-next-line
    console.log(response);
    // https://www.olx.ua/list/?page=17
  });
