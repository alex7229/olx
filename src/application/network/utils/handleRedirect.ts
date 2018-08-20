export interface IResponse {
  data: unknown;
  status: number;
  request?: any;
}

type HandleRedirect = (requestedUrl: string, response: IResponse) => IResponse;

export const handleRedirect: HandleRedirect = (requestedUrl, response) => {
  const newResponse = {
    data: response.data,
    status: response.status
  };
  if (
    response.request &&
    response.request.res &&
    response.request.res.responseURL &&
    response.request.res.responseURL !== requestedUrl
  ) {
    newResponse.status = 301;
  }
  return newResponse;
};
