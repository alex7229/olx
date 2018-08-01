import axios from "axios";
import {
  handleRedirect,
  IResponse
} from "../../application/network/handleRedirect";
import {
  IAxios,
  NetworkDelayer
} from "../../application/network/NetworkDelayer";

export type FetchFactory = (url: string) => Promise<IResponse>;

const axiosWithoutRedirect: IAxios = {
  async get(url: string) {
    const response = await axios.get(url);
    return handleRedirect(url, response);
  }
};

const networkDelayer = new NetworkDelayer(axiosWithoutRedirect);

export const fetchFactory: FetchFactory = networkDelayer.fetch.bind(
  networkDelayer
);
