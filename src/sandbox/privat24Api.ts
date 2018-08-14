import { fetchFactory } from "../factories/network/utils/fetchFactory";

fetchFactory(
  "https://api.privatbank.ua/p24api/pubinfo?json=true&exchange=&coursid=11",
  true
)
  // tslint:disable-next-line
  .then(response => console.log(typeof response.data));
// data is parsed json object, status 200
