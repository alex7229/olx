import { ParseAdvertisementId } from "./parseAdvertisementId";
import { IAdvertisementPageRaw } from "./parseAdvertisementPage";
import { ParseUserLink } from "./parseUserLink";

export interface IAdvertisementDetails {
  id: number;
  user: {
    id: string;
    name: string;
    phoneToken: string;
  };
}

export type ParseAdvertisementDetails = (
  adv: IAdvertisementPageRaw,
  parseAdvertisementId: ParseAdvertisementId,
  parseUserLink: ParseUserLink
) => IAdvertisementDetails;

export const parseAdvertisementDetails: ParseAdvertisementDetails = (
  advertisement,
  parseAdvertisementId,
  parseUserLink
) => {
  const name = advertisement.user.name.replace(/[\n ]/g, "");
  return {
    id: parseAdvertisementId(advertisement.advertisementIdText),
    user: {
      id: parseUserLink(advertisement.user.link),
      name,
      phoneToken: advertisement.user.phoneToken
    }
  };
};
