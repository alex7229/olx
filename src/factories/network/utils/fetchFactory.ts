import axios from "axios";
import {
  handleRedirect,
  IResponse
} from "../../../application/network/utils/handleRedirect";
import {
  IAxios,
  NetworkDelayer
} from "../../../application/network/utils/NetworkDelayer";

export type FetchFactory = (
  url: string,
  immediate?: boolean
) => Promise<IResponse>;

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
