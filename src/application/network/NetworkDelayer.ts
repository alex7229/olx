import { IResponse } from "./handleRedirect";

export interface IAxios {
  get(url: string): Promise<IResponse>;
}

export class NetworkDelayer {
  public nextNetworkCallTimestamp: number = 0;
  public axios: IAxios;

  constructor(axios: IAxios) {
    this.axios = axios;
  }

  public async fetch(url: string): Promise<IResponse> {
    const request = this.axios.get.bind(this, url);
    const currentTime = new Date().getTime();
    if (currentTime > this.nextNetworkCallTimestamp) {
      this.nextNetworkCallTimestamp = currentTime + 10000;
      return request();
    }
    const result: Promise<IResponse> = new Promise(resolve => {
      setTimeout(
        () => resolve(request()),
        this.nextNetworkCallTimestamp - currentTime
      );
      this.nextNetworkCallTimestamp += 10000;
    });
    // local variable is used to hint typescript promise result type
    return result;
  }
}
