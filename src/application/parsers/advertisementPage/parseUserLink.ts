export type ParseUserLink = (link: string) => string;

export const parseUserLink: ParseUserLink = link => {
  const regExp = /list\/user\/([^\/]+)\//;
  const match = link.match(regExp);
  if (match === null) {
    throw new Error(`cannot parse user link "${link}"`);
  }
  return match[1];
};
