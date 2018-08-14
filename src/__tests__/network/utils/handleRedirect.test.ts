import {
  handleRedirect,
  IResponse
} from "../../../application/network/utils/handleRedirect";

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
  const responseWithRequest = {
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
});

it("should not change status code if responseUrl is not present", () => {
  const url = "any url";
  const response = {
    data: "data",
    request: {
      res: {}
    },
    status: 200
  };
  const expectedResponse = {
    data: response.data,
    status: response.status
  };
  expect(handleRedirect(url, response)).toEqual(expectedResponse);
});
