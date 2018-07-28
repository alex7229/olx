export type ParseUrl = (url: string) => string;

export const parseUrl: ParseUrl = url => {
  const regExp = /^.*.html/;
  const match = url.match(regExp);
  if (match === null) {
    throw new Error("url should end with .html");
  }
  return match[0];
};
