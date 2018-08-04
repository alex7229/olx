interface IUrl {
  fullUrl: string;
  uniqueName: string;
}

export type ParseUrl = (url: string) => IUrl;

export const parseUrl: ParseUrl = url => {
  const regExp = /.+\/.*-([a-zA-Z0-9]+).html/;
  const match = url.match(regExp);
  if (match === null) {
    throw new Error("url should end with .html");
  }
  return { fullUrl: match[0], uniqueName: match[1] };
};
