export type ParseAdvertisementId = (idBlock: string) => number;

export const parseAdvertisementId: ParseAdvertisementId = idBlock => {
  const regExp = /Номер объявления: ([\d]+)/;
  const match = idBlock.match(regExp);
  if (match === null) {
    throw new Error(`cannot parse adv id block "${idBlock}"`);
  }
  return parseInt(match[1], 10);
};
