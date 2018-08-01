import {
  handleRedirect,
  IResponse
} from "../../application/network/handleRedirect";

it("should return 301 if url was changed", () => {
  const response: IResponse = {
    data: "data",
    request: {
      res: {
        responseURL: "new url"
      }
    },
    status: 200
  };
  expect(handleRedirect("url", response)).toEqual({
    data: response.data,
    status: 301
  });
});

it("should not change status code if there is no redirect", () => {
  const url = "url";
  const responseWithRequest: IResponse = {
    data: "data",
    request: {
      res: {
        responseURL: url
      }
    },
    status: 200
  };
  const responseWithoutRequest: IResponse = {
    data: "data",
    status: 200
  };
  expect(handleRedirect(url, responseWithRequest)).toEqual(
    responseWithoutRequest
  );
  expect(handleRedirect(url, responseWithoutRequest)).toEqual(
    responseWithoutRequest
  );
});
