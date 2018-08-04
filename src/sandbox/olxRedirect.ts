import { fetchFactory } from "../factories/network/utils/fetchFactory";

fetchFactory("https://www.olx.ua/list/q-1060-6gb/?page=70").then(response => {
  response.data = null;
  // tslint:disable-next-line
  console.log(response);
  // data = null, status: 301 (Actually, the status is 200, but it is determined
  // programmatically)
});
