import axios from "axios";
import {
  IResponse,
  NetworkDelayer
} from "../../application/network/NetworkDelayer";

export type FetchFactory = (url: string) => Promise<IResponse>;

const networkDelayer = new NetworkDelayer(axios);

export const fetchFactory: FetchFactory = networkDelayer.fetch;
