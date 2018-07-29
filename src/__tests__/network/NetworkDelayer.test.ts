import { NetworkDelayer } from "../../application/network/NetworkDelayer";

jest.useFakeTimers();

it("should throw if request is unsuccessful", async done => {
  const axios = {
    get: jest.fn().mockRejectedValue("sd")
  };
  const networkDelayer = new NetworkDelayer(axios);
  await expect(networkDelayer.fetch("fsdf")).rejects.toBe("sd");
  done();
});

it("should fetch urls not more often than once in 10 secs", async done => {
  const urls = ["first", "second", "third"];
  const axios = {
    get: jest.fn().mockResolvedValue({ data: "", status: 200 })
  };
  const networkDelayer = new NetworkDelayer(axios);
  networkDelayer.fetch(urls[0]);
  networkDelayer.fetch(urls[1]);
  const lastResponse = networkDelayer.fetch(urls[2]);
  expect(axios.get.mock.calls.length).toBe(1);
  jest.advanceTimersByTime(8000);
  expect(axios.get.mock.calls.length).toBe(1);
  jest.advanceTimersByTime(3000);
  expect(axios.get.mock.calls.length).toBe(2);
  jest.advanceTimersByTime(10000);
  expect(axios.get.mock.calls.length).toBe(3);

  expect(axios.get.mock.calls[2][0]).toBe(urls[2]);
  await expect(lastResponse).resolves.toEqual({ data: "", status: 200 });
  done();
});
