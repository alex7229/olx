export interface IResponse {
  data: any;
  status: number;
}

interface IAxios {
  get(url: string): Promise<IResponse>;
}

export class NetworkDelayer {
  public nextNetworkCallTimestamp: number = 0;
  public axios: IAxios;

  constructor(axios: IAxios) {
    this.axios = axios;
  }

  public async fetch(url: string): Promise<IResponse> {
    const currentTime = new Date().getTime();
    if (currentTime > this.nextNetworkCallTimestamp) {
      this.nextNetworkCallTimestamp = currentTime + 10000;
      return this.axios.get(url);
    }
    const result: Promise<IResponse> = new Promise(resolve => {
      setTimeout(
        () => resolve(this.axios.get(url)),
        this.nextNetworkCallTimestamp - currentTime
      );
      this.nextNetworkCallTimestamp += 10000;
    });
    // local variable is used to hint typescript promise result type
    return result;
  }
}
