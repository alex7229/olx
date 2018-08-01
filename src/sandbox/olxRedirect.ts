import { fetchFactory } from "../factories/network/fetchFactory";

export const run = () =>
  fetchFactory("https://www.olx.ua/list/q-1060-6gb/?page=70").then(response => {
    response.data = null;
    console.log(response);
    // https://www.olx.ua/list/?page=17
  });
